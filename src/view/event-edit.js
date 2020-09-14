import {DESTINATIONS, EVENT_TYPES} from "../const.js";
import {humanizeTime} from "../utils/event.js";
import SmartView from "./smart.js";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const BLANK_EVENT = {
  type: `Bus`,
  destination: `Helsinki`,
  description: null,
  startTime: `Today 00:00`,
  endTime: `Today 00:00`,
  price: null,
  offers: null

};

const createOffersList = (offers) => {

  if (offers.length > 0) {

    const offersListTemplate = offers.map((offer) =>
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" type="checkbox" name="event-offer-${offer.id}" ${offer.isChecked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${offer.id}-1">
          <span class="event__offer-title">${offer.text}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join(``);

    return `<section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>

              <div class="event__available-offers"> ${offersListTemplate} </div></section>`;
  }
  return ``;
};

const createPhotosList = (photos) => {

  if (photos.length > 0) {
    const photosListTemplate = photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join(``);

    return `<div class="event__photos-container">
              <div class="event__photos-tape">${photosListTemplate} </div>
            </div>`;
  }
  return ``;
};

const createDestinationsListTemplate = (destinations) => {
  const destinationsList = destinations.map((destination) => `<option value=${destination}></option>`).join(``);
  return `<datalist id="destination-list-1">${destinationsList}</datalist>`;
};

const createTypeItemsListTemplate = (types, event) => {
  const currentEvent = event.type.toLowerCase();
  const typeItemsList = types.map((type) =>
    `<div class="event__type-item">
        <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}" ${type.toLowerCase() === currentEvent ? `checked` : ``}>
        <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-taxi-1">${type}</label>
      </div>`
  ).join(``);
  return typeItemsList;
};

const getFormatedDate = (date) => {
  const day = date.toLocaleString(`en-US`, {day: `numeric`}).padStart(2, `0`);
  const month = date.toLocaleString(`en-US`, {month: `numeric`}).padStart(2, `0`);
  const year = date.toLocaleString(`en-US`, {year: `2-digit`});

  return `${day}/${month}/${year}`;

};

const createEventEditTemplate = (data) => {
  const {type, description, offers, price, startTime, endTime, isFavorite} = data;
  const preposition = [`Check-in`, `Sightseeing`, `Restaurant`].includes(type) ? `in` : `to`;

  return (
    `<li>
      <form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              ${createTypeItemsListTemplate(EVENT_TYPES.slice(0, 7), data)}

            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              ${createTypeItemsListTemplate(EVENT_TYPES.slice(7), data)}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type} ${preposition}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
            ${createDestinationsListTemplate(DESTINATIONS)}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFormatedDate(startTime)} ${humanizeTime(startTime)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFormatedDate(endTime)} ${humanizeTime(endTime)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``} />
        <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
            </svg>
        </label>
      </header>
      <section class="event__details">

        ${createOffersList(offers)}

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description.text}</p>

        ${createPhotosList(description.photos)}

      </section>
    </section>
    </form>
  </li>`
  );
};

export default class EventEdit extends SmartView {
  constructor(event = BLANK_EVENT) {
    super();
    this._data = event;
    this._datepicker = null;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);

    this._setFavoriteClickHandler();
  }

  reset(event) {
    this.updateData(event);
  }

  getTemplate() {
    return createEventEditTemplate(this._data);
  }


  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }


  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this.updateData({isFavorite: !this._data.isFavorite});
  }

  _setFavoriteClickHandler() {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }

  restoreHandlers() {
    this._setFavoriteClickHandler();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

}
