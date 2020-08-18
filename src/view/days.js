import {createEventItemTemplate} from "./event-item.js";


const createEventsList = (events) => {
  let eventsListTemplate = ``;
  for (const event of events) {
    eventsListTemplate += createEventItemTemplate(event);
  }
  return eventsListTemplate;
};

const createDay = (dayNumber, date, events) => {

  const relevantEvents = events.filter((item) => item.timeInfo.start.getDate() === date.getDate());
  const dateString = relevantEvents[0].timeInfo.start.toLocaleString(`en-US`, {day: `numeric`, month: `short`});

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
  let daysListTemplate = ``;

  for (const event of events) {
    if (prevEvent === null || event.timeInfo.start.getDate() > prevEvent.timeInfo.start.getDate()) {

      const date = event.timeInfo.start;

      daysListTemplate += createDay(dayNumber, date, events);
      dayNumber++;
    }
    prevEvent = event;

  }
  return daysListTemplate;
};
