import SiteMenuView from "./view/site-menu.js";
import SiteFilterView from "./view/filter.js";
import SiteSortView from "./view/sort.js";
import EventsContainerView from "./view/events-container.js";
import EventView from "./view/event-item.js";
import EventEditView from "./view/event-edit.js";
import NoEventView from "./view/no-events.js";
import DaysContainerView from "./view/days-container.js";
import DayView from "./view/day-item.js";
import TripInfoContainerView from "./view/trip-info-container.js";
import TripSummaryView from "./view/trip-summary.js";
import TripTotalPriceView from "./view/total-price.js";
import {generateData} from "./mock/event.js";
import {render, RenderPosition} from "./util.js";

const EVENT_COUNT = 20;


const events = generateData(EVENT_COUNT);

const totalPrice = events.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);


const siteHeaderElement = document.querySelector(`.page-header`);
const siteControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const pageMain = document.querySelector(`.page-main`);

const eventsHeadingElement = siteHeaderElement.querySelector(`.trip-main`);

const tripInfoContainerComponent = new TripInfoContainerView();
render(eventsHeadingElement, tripInfoContainerComponent.getElement(), RenderPosition.AFTERBEGIN);
render(tripInfoContainerComponent.getElement(), new TripSummaryView(events).getElement(), RenderPosition.AFTERBEGIN);
render(tripInfoContainerComponent.getElement(), new TripTotalPriceView(totalPrice).getElement(), RenderPosition.BEFOREEND);

render(siteControlsElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteControlsElement, new SiteFilterView().getElement(), RenderPosition.BEFOREEND);

const eventsContainer = new EventsContainerView();

render(pageMain, eventsContainer.getElement(), RenderPosition.BEFOREEND);
const tripEvents = eventsContainer.getElement().querySelector(`.trip-events`);

if (events.length === 0) {
  render(tripEvents, new NoEventView().getElement(), RenderPosition.BEFOREEND);

} else {
  render(tripEvents, new SiteSortView().getElement(), RenderPosition.BEFOREEND);


  const daysContainer = new DaysContainerView();

  render(tripEvents, daysContainer.getElement(), RenderPosition.BEFOREEND);

  const renderEvent = (eventListElement, event) => {
    const eventComponent = new EventView(event);
    const eventEditComponent = new EventEditView(event);

    const replaceEventToEdit = () => {
      eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const replaceEditToEvent = () => {
      eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceEditToEvent();
      }
    };

    eventComponent.setEditClickHandler(() => {
      replaceEventToEdit();
    });

    eventEditComponent.setFormSubmitHandler(() => {
      replaceEditToEvent();
    });

    render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
  };

  const createDaysListTemplate = (items) => {
    let prevEvent = null;
    let dayNumber = 1;

    for (const item of items) {
      if (prevEvent === null || item.startTime.getDate() > prevEvent.startTime.getDate()) {

        const date = item.startTime;
        const newDay = new DayView(date, dayNumber).getElement();
        render(daysContainer.getElement(), newDay, RenderPosition.BEFOREEND);

        const currentDayEventsContainer = newDay.querySelector(`.trip-events__list:last-child`);

        const currentEvents = items.filter((element) => element.startTime.getDate() === date.getDate());

        currentEvents.forEach((element) => {
          renderEvent(currentDayEventsContainer, element);
        });

        dayNumber++;
      }

      prevEvent = item;

    }

  };

  createDaysListTemplate(events);

}
