import AbstractView from "./abstract.js";
import {humanizeDay} from "../utils/event.js";
import moment from "moment";

const createDayItemTemplate = (date = null, dayNumber = null) => {
  const dateString = humanizeDay(date);
  const dateTime = moment(date).format(`YYYY-MM-DD`);
  const dayInfoTemplate = dayNumber ? `<div class="day__info">
                            <span class="day__counter">${dayNumber}</span>
                            <time class="day__date" datetime="${dateTime}">${dateString}</time>
                          </div>` : ``;

  const dayId = dayNumber ? `id="day-${dayNumber}"` : ``;

  return (`<li class="trip-days__item  day" ${dayId}>
  ${dayInfoTemplate}
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
