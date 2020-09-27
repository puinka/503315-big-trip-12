import TripView from "../view/trip.js";
import SortView from "../view/sort.js";
import NoEventView from "../view/no-events.js";
import DaysContainerView from "../view/days-container.js";
import DayView from "../view/day-item.js";
import EventPresenter from "./event.js";
import {sortByDefault, sortByTime, sortByPrice} from "../utils/event.js";
import {SortType, UpdateType, UserAction} from "../const.js";
import {filter} from "../utils/filter.js";

import {render, RenderPosition, remove} from "../utils/render.js";


export default class Trip {
  constructor(tripContainer, eventsModel, filterModel) {
    this._tripContainer = tripContainer;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._eventPresenter = {};

    this._currentSortType = SortType.EVENT;
    this._sortComponent = null;

    this._tripComponent = new TripView();
    this._daysContainer = new DaysContainerView();
    this._noEventComponent = new NoEventView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);


    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

  }

  init() {

    render(this._tripContainer, this._tripComponent, RenderPosition.BEFOREEND);

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderTrip();
  }


  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filteredEvents = filter[filterType](events);

    switch (this._currentSortType) {
      case SortType.DURATION:
        return filteredEvents.sort(sortByTime);
      case SortType.PRICE:
        return filteredEvents.sort(sortByPrice);
    }
    return filteredEvents;
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
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
    }
  }

  _handleSortTypeChange(sortType) {

    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();

  }

  _renderSort() {

    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType, SortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tripComponent, this._sortComponent, RenderPosition.BEFOREEND);


  }

  _clearTrip({resetSortType = false} = {}) {

    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());

    this._eventPresenter = {};

    remove(this._sortComponent);
    remove(this._noEventComponent);
    remove(this._daysContainer);

    if (resetSortType) {
      this._currentSortType = SortType.EVENT;
    }
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

    const events = this._getEvents();

    if (events.length === 0) {
      this._renderNoEvent();
      return;
    }

    this._renderSort();
    this._renderEventsList();
  }

  _renderSortedEventsList() {

    const day = new DayView().getElement();
    render(this._daysContainer, day, RenderPosition.BEFOREEND);

    const sortedEvents = this._getEvents();
    const container = day.querySelector(`.trip-events__list`);
    sortedEvents.forEach((element) => {
      this._renderEvent(container, element);
    });
  }

  _renderEventsList() {

    const events = this._getEvents();
    this._renderDaysContainer();

    if (this._currentSortType === SortType.EVENT) {
      this._renderDays(events);
    } else {


      this._renderSortedEventsList(events);

    }


  }

}
