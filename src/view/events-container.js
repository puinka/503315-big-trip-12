import {createElement} from "../util.js";

const createEventsContainerTemplate = () => {
  return (
    `<div class="page-body__container">
        <section class="trip-events"><h2 class="visually-hidden">Trip events</h2></section>
    </div>`
  );
};

export default class EventsContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventsContainerTemplate();
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
