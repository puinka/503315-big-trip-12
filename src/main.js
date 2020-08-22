import SiteMenuView from "./view/site-menu.js";
import SiteFilterView from "./view/filter.js";
import SiteSortView from "./view/sort.js";
import EventsContainerView from "./view/events-container.js";
import EventEditView from "./view/event-edit.js";
import DaysContainerView from "./view/days-container.js";
import DaysView from "./view/days.js";
import TripInfoContainerView from "./view/trip-info-container.js";
import TripSummaryView from "./view/trip-summary.js";
import TripTotalPriceView from "./view/total-price.js";
import {generateData} from "./mock/event.js";
import {render, RenderPosition} from "./util.js";

const EVENT_COUNT = 20;


const events = generateData(EVENT_COUNT);


const siteHeaderElement = document.querySelector(`.page-header`);
const siteControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const pageMain = document.querySelector(`.page-main`);

const eventsHeadingElement = siteHeaderElement.querySelector(`.trip-main`);


const tripInfoContainerComponent = new TripInfoContainerView();
render(eventsHeadingElement, tripInfoContainerComponent.getElement(), RenderPosition.AFTERBEGIN);
render(tripInfoContainerComponent.getElement(), new TripSummaryView().getElement(), RenderPosition.AFTERBEGIN);
render(tripInfoContainerComponent.getElement(), new TripTotalPriceView().getElement(), RenderPosition.BEFOREEND);

render(siteControlsElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteControlsElement, new SiteFilterView().getElement(), RenderPosition.BEFOREEND);

const eventsContainer = new EventsContainerView();
render(pageMain, eventsContainer.getElement(), RenderPosition.BEFOREEND);
render(eventsContainer.getElement(), new SiteSortView().getElement(), RenderPosition.BEFOREEND);

const daysContainer = new DaysContainerView();
render(eventsContainer.getElement(), daysContainer.getElement(), RenderPosition.BEFOREEND);

render(daysContainer.getElement(), new EventEditView(events[0]).getElement(), RenderPosition.BEFOREEND);
render(daysContainer.getElement(), new DaysView(events).getElement(), RenderPosition.BEFOREEND);


