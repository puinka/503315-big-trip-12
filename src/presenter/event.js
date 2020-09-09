import EventView from "../view/event-item.js";
import EventEditView from "../view/event-edit.js";
import {render, RenderPosition, replace} from "../utils/render.js";


export default class Event {

  constructor(eventListContainer) {
    this._taskListContainer = eventListContainer;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event, currentDay) {
    this._event = event;
    this._currentDay = currentDay;

    this._eventComponent = new EventView(event);
    this._eventEditComponent = new EventEditView(event);

    render(this._currentDay, this._eventComponent, RenderPosition.BEFOREEND);
  }

  _replaceEventToEdit() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replaceEditToEvent() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceEditToEvent();
    }
  }

  _handleEditClick() {
    this._replaceEventToEdit();
  }

  _handleFormSubmit() {
    this._replaceEditToEvent();
  }

}
