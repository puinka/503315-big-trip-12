import {DESTINATIONS, EVENT_TYPES} from "../const.js";
import {humanizeTime, getRandomInteger, createElement} from "../util.js";

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

const createEventEditTemplate = (event) => {
  const {type, description, offers, price, startTime, endTime} = event;
  const preposition = [`Check-in`, `Sightseeing`, `Restaurant`].includes(type) ? `in` : `to`;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
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

            ${createTypeItemsListTemplate(EVENT_TYPES.slice(0, 7), event)}

          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>

            ${createTypeItemsListTemplate(EVENT_TYPES.slice(7), event)}

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
    </header>
    <section class="event__details">

      ${createOffersList(offers)}

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description.text}</p>

      ${createPhotosList(description.photos)}

    </section>
  </section>
  </form>`
  );
};

export default class EventEdit {
  constructor(event = BLANK_EVENT) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createEventEditTemplate(this._event);
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
