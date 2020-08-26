import AbstractView from "./abstract.js";

const createTripDaysContainerTemplate = () => {
  return (
    `<ul class="trip-days">

    </ul>`
  );
};

export default class DaysContainer extends AbstractView {

  getTemplate() {
    return createTripDaysContainerTemplate();
  }
}
