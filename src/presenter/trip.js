import TripView from "../view/trip.js";
import SortView from "../view/sort.js";
import NoEventView from "../view/no-events.js";
import DaysContainerView from "../view/days-container.js";
import DayView from "../view/day-item.js";
import EventPresenter from "./event.js";

import {render, RenderPosition} from "../utils/render.js";


export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._tripComponent = new TripView();
    this._sortComponent = new SortView();
    this._daysContainer = new DaysContainerView();
    this._noEventComponent = new NoEventView();
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    render(this._tripContainer, this._tripComponent, RenderPosition.BEFOREEND);

    this._renderTrip();
  }

  _renderSort() {
    render(this._tripComponent, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(currentDay, event) {
    const eventPresenter = new EventPresenter(currentDay);
    eventPresenter.init(event, currentDay);
  }


  _renderDaysContainer() {
    render(this._tripComponent, this._daysContainer, RenderPosition.BEFOREEND);
  }

  _renderDays(items) {
    let prevEvent = null;
    let dayNumber = 1;

    for (const item of items) {
      if (prevEvent === null || item.startTime.getDate() > prevEvent.startTime.getDate()) {

        const date = item.startTime;
        const newDay = new DayView(date, dayNumber).getElement();
        render(this._daysContainer, newDay, RenderPosition.BEFOREEND);

        const currentDayEventsContainer = newDay.querySelector(`.trip-events__list:last-child`);

        const currentEvents = items.filter((element) => element.startTime.getDate() === date.getDate());

        currentEvents.forEach((element) => {
          this._renderEvent(currentDayEventsContainer, element);
        });

        dayNumber++;
      }

      prevEvent = item;

    }
  }

  _renderNoEvent() {
    render(this._tripComponent, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._tripEvents.length === 0) {
      this._renderNoEvent();
      return;
    }

    this._renderSort();

    this._renderDaysContainer();

    this._renderDays(this._tripEvents);
  }
}
