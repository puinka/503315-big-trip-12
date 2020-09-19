import TripView from "../view/trip.js";
import SortView from "../view/sort.js";
import NoEventView from "../view/no-events.js";
import DaysContainerView from "../view/days-container.js";
import DayView from "../view/day-item.js";
import EventPresenter from "./event.js";
import {sortByDefault, sortByTime, sortByPrice} from "../utils/event.js";
import {SortType, UpdateType, UserAction} from "../const.js";

import {render, RenderPosition} from "../utils/render.js";


export default class Trip {
  constructor(tripContainer, eventsModel) {
    this._tripContainer = tripContainer;
    this._eventsModel = eventsModel;
    this._eventPresenter = {};

    this._currentSortType = SortType.EVENT;
    this._sortComponent = null;

    this._tripComponent = new TripView();
    this._daysContainer = new DaysContainerView();
    this._noEventComponent = new NoEventView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);


    this._eventsModel.addObserver(this._handleModelEvent);

  }

  init() {

    render(this._tripContainer, this._tripComponent, RenderPosition.BEFOREEND);

    this._renderTrip();
  }

  _getEvents() {
    switch (this._currentSortType) {
      case SortType.DURATION:
        return this._eventsModel.getEvents().slice().sort(sortByTime);
      case SortType.PRICE:
        return this._eventsModel.getEvents().slice().sort(sortByPrice);
    }
    return this._eventsModel.getEvents().slice().sort(sortByDefault);
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {

    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip(resetSortType: true);
        this._renderTrip();
        break;
    }
  }

  _renderSort() {

    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripComponent, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _clearTrip({resetSortType = false} = {}) {
    const taskCount = this._getTasks().length;

    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};

    remove(this._sortComponent);
    remove(this._noEventComponent);

    if (resetSortType) {
      this._currentSortType = SortType.EVENT;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    // очистить лист ивентов и отрисовать заново
    this._clearTrip();
    this._renderTrip();
  }

  _renderEvent(currentDay, event) {
    const eventPresenter = new EventPresenter(currentDay, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event, currentDay);
    this._eventPresenter[event.id] = eventPresenter;
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

    const eventCount = this._getEvents().length;


    if (eventCount === 0) {
      this._renderNoEvent();
      return;
    }

    this._renderSort();

    this._renderDaysContainer();
    this._renderEvents();

  }

  _renderEvents() {

    const events = this._getEvents();

    if (this._currentSortType === SortType.EVENT) {
      this._renderDays(events);
    }

    // здесь отрендерить простой список ивентов, отсортированных по длительности или цене
    events.forEach((event) => this._renderEvent(event));
  }

}
