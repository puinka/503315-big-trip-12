import {humanizeTime, createElement} from "../util.js";

const calculateDuration = (start, end) => {

  const duration = end.getTime() - start.getTime();

  const minutes = Math.floor((duration / (1000 * 60)) % 60).toString().padStart(2, `0`);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  const durationString = hours + `H ` + minutes + `M`;
  return durationString;
};

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
  const duration = calculateDuration(startTime, endTime);

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

export default class Event {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createEventItemTemplate(this._event);
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
