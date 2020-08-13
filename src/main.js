import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSiteFiltersTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createEventEditTemplate} from "./view/event-edit.js";
import {createTripDaysContainerTemplate} from "./view/days-container.js";
import {createDayItemTemplate} from "./view/day-item.js";
import {createEventListTemplate} from "./view/event-list.js";
import {createEventItemTemplate} from "./view/event-item.js";
import {createTripInfoContainerTemplate} from "./view/trip-info-container.js";
import {createTripSummaryTemplate} from "./view/trip-summary.js";
import {createTripTotalPriceTemplate} from "./view/total-price.js";
import {generateEvent} from "./mock/event.js";

const EVENT_COUNT = 15;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const siteHeaderElement = document.querySelector(`.page-header`);
const siteControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main`);
const eventsContainerElement = siteMainElement.querySelector(`.trip-events`);
const eventsHeadingElement = siteHeaderElement.querySelector(`.trip-main`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(eventsHeadingElement, createTripInfoContainerTemplate(), `afterbegin`);

const tripInfoContainer = eventsHeadingElement.querySelector(`.trip-info`);
render(tripInfoContainer, createTripSummaryTemplate(), `afterbegin`);
render(tripInfoContainer, createTripTotalPriceTemplate());

render(siteControlsElement, createSiteMenuTemplate());
render(siteControlsElement, createSiteFiltersTemplate());


render(eventsContainerElement, createSortTemplate(), `afterbegin`);

const sortingForm = eventsContainerElement.querySelector(`.trip-sort`);
render(sortingForm, createEventEditTemplate(events[0]), `afterend`);

const currentType = events[0].type.toLowerCase();
document.querySelector(`#event-type-${currentType}-1`).checked = true;

render(eventsContainerElement, createTripDaysContainerTemplate());

const tripDaysList = eventsContainerElement.querySelector(`.trip-days`);
render(tripDaysList, createDayItemTemplate());

const dayInfoElement = eventsContainerElement.querySelector(`.day__info`);
render(dayInfoElement, createEventListTemplate(), `afterend`);

const eventsListElement = eventsContainerElement.querySelector(`.trip-events__list`);

for (let i = 1; i < EVENT_COUNT; i++) {
  render(eventsListElement, createEventItemTemplate(events[i]));
}
