import {createEventItemTemplate} from "./event-item.js";


const createEventsList = (events) => {
  const eventsListTemplate = events.map((event) => createEventItemTemplate(event)).join(``);

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


export const createDaysListTemplate = (events) => {
  events.shift();
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
