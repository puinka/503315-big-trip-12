import {createElement} from "../util.js";

const createDayItemTemplate = (date, dayNumber) => {
  const dateString = date.toLocaleString(`en-US`, {day: `numeric`, month: `short`});

  return (`<li class="trip-days__item  day" id="day-${dayNumber}">
  <div class="day__info">
    <span class="day__counter">${dayNumber}</span>
    <time class="day__date" datetime="2019-03-18">${dateString}</time>
  </div>
  <ul class="trip-events__list">
  </ul>
</li>`);
};

export default class DayItem {
  constructor(date, dayNumber) {
    this._date = date;
    this._dayNumber = dayNumber;
    this._element = null;
  }

  getTemplate() {
    return createDayItemTemplate(this._date, this._dayNumber);
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
