import {createElement} from "../util.js";

const createTripDaysContainerTemplate = () => {
  return (
    `<ul class="trip-days">

    </ul>`
  );
};

export default class DaysContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripDaysContainerTemplate();
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
