import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSiteFiltersTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createEventEditTemplate} from "./view/event-edit.js";
import {createTripDaysContainerTemplate} from "./view/days-container.js";
import {createDaysListTemplate} from "./view/days.js";
import {createTripInfoContainerTemplate} from "./view/trip-info-container.js";
import {createTripSummaryTemplate} from "./view/trip-summary.js";
import {createTripTotalPriceTemplate} from "./view/total-price.js";
import {generateData} from "./mock/event.js";

const EVENT_COUNT = 20;


const events = generateData(EVENT_COUNT);


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
const tripDaysContainer = eventsContainerElement.querySelector(`.trip-days`);

render(tripDaysContainer, createDaysListTemplate(events));
