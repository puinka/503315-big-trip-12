import {humanizeTime, humanizeDuration} from "../utils/event.js";
import AbstractView from "./abstract.js";

const createOffersList = (offers) => {
  let checkedOffers = [];

  for (const offer of offers) {
    if (offer.isChecked) {
      checkedOffers.push(offer);
    }
  }

  if (checkedOffers.length > 0) {
    checkedOffers = checkedOffers.slice(0, 3);
    const offersListTemplate = checkedOffers.map((offer) => `
    <li class="event__offer">
         <span class="event__offer-title">${offer.text}</span>
         &plus;
         &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </li>`).join(``);

    return `<ul class="event__selected-offers"> ${offersListTemplate} </ul>`;
  }

  return ``;

};


const createEventItemTemplate = (event) => {
  const {type, destination, price, startTime, endTime, offers} = event;
  const preposition = [`Check-in`, `Sightseeing`, `Restaurant`].includes(type) ? `in` : `to`;
  const startTimeString = humanizeTime(startTime);
  const endTimeString = humanizeTime(endTime);
  const duration = humanizeDuration(startTime, endTime);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${preposition} ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time">${startTimeString}</time>
            &mdash;
            <time class="event__end-time">${endTimeString}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>

          ${createOffersList(offers)}

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
  `
  );
};

export default class Event extends AbstractView {
  constructor(event) {
    super();
    this._event = event;

    this._editClickHandler = this._editClickHandler.bind(this);

  }

  getTemplate() {
    return createEventItemTemplate(this._event);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }

}
