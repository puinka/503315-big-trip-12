import {createElement} from "../util.js";

const createTripTotalPriceTemplate = (price) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>`
  );
};

export default class TripTotalPrice {
  constructor(price) {
    this._price = price;
    this._element = null;
  }

  getTemplate() {
    return createTripTotalPriceTemplate(this._price);
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
