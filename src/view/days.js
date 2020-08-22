import EventView from "./event-item.js";
import EventEditView from "./event-edit.js";
import {createElement, RenderPosition, render} from "../util.js";

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceEventToEdit = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceEditToEvent = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEventToEdit();
  });

  eventEditComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToEvent();
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};


const createEventsList = (events) => {
  const eventsListTemplate = events.map((event) => new EventView(event).getTemplate()).join(``);

  return eventsListTemplate;
};

const createDay = (dayNumber, date, events) => {

  const relevantEvents = events.filter((item) => item.startTime.getDate() === date.getDate());
  const dateString = relevantEvents[0].startTime.toLocaleString(`en-US`, {day: `numeric`, month: `short`});

  return `<li class="trip-days__item  day" id="day-${dayNumber}">
            <div class="day__info">
              <span class="day__counter">${dayNumber}</span>
              <time class="day__date" datetime="2019-03-18">${dateString}</time>
            </div>
            <ul class="trip-events__list"> ${createEventsList(relevantEvents)} </ul>
          </li>`;
};


const createDaysListTemplate = (events) => {
  let prevEvent = null;
  let dayNumber = 1;
  const daysList = [];

  for (const event of events) {
    if (prevEvent === null || event.startTime.getDate() > prevEvent.startTime.getDate()) {

      const date = event.startTime;
      daysList.push(createDay(dayNumber, date, events));
      dayNumber++;
    }
    prevEvent = event;

  }

  const daysListTemplate = daysList.join(``);
  return daysListTemplate;
};

export default class Days {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createDaysListTemplate(this._events);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
