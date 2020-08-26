import {createElement} from "../util.js";

const getRouteCities = (events) => {
  const startCity = events[0].destination;
  const endCity = events[events.length - 1].destination;
  const midIndex = Math.floor(events.length / 2);
  const midCity = events[midIndex].destination;

  return `${startCity} &mdash; ${midCity} &mdash; ${endCity}`;
};

const getRouteDates = (events) => {
  const startDate = events[0].startTime.toLocaleString(`en-US`, {day: `numeric`, month: `short`});
  let endDate = events[events.length - 1].startTime.getDate();

  if (events[0].startTime.getMonth() !== events[events.length - 1].startTime.getMonth()) {
    endDate = events[events.length - 1].startTime.toLocaleString(`en-US`, {day: `numeric`, month: `short`});
  }

  return `${startDate} &mdash; ${endDate}`;
};

const createTripSummaryTemplate = (events) => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${getRouteCities(events)}</h1>

      <p class="trip-info__dates">${getRouteDates(events)}</p>
    </div>`
  );
};

export default class TripSummary {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createTripSummaryTemplate(this._events);
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
