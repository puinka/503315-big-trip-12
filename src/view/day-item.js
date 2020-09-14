import AbstractView from "./abstract.js";
import {humanizeDay} from "../utils/event.js";

const createDayItemTemplate = (date, dayNumber) => {
  const dateString = humanizeDay(date);

  return (`<li class="trip-days__item  day" id="day-${dayNumber}">
  <div class="day__info">
    <span class="day__counter">${dayNumber}</span>
    <time class="day__date" datetime="2019-03-18">${dateString}</time>
  </div>
  <ul class="trip-events__list">
  </ul>
</li>`);
};

export default class DayItem extends AbstractView {
  constructor(date, dayNumber) {
    super();
    this._date = date;
    this._dayNumber = dayNumber;

  }

  getTemplate() {
    return createDayItemTemplate(this._date, this._dayNumber);
  }

}
