import AbstractView from "./abstract.js";

const createTripTotalPriceTemplate = (price) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>`
  );
};

export default class TripTotalPrice extends AbstractView {
  constructor(price) {
    super();
    this._price = price;
  }

  getTemplate() {
    return createTripTotalPriceTemplate(this._price);
  }

}
