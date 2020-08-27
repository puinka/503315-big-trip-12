import AbstractView from "./abstract.js";

const createEventsContainerTemplate = () => {
  return (
    `<div class="page-body__container">
        <section class="trip-events"><h2 class="visually-hidden">Trip events</h2></section>
    </div>`
  );
};

export default class Trip extends AbstractView {

  getTemplate() {
    return createEventsContainerTemplate();
  }

}
