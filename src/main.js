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
import {renderTemplate, renderElement, RenderPosition} from "./util.js";

const EVENT_COUNT = 20;


const events = generateData(EVENT_COUNT);


const siteHeaderElement = document.querySelector(`.page-header`);
const siteControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const pageMain = document.querySelector(`.page-main`);

const eventsHeadingElement = siteHeaderElement.querySelector(`.trip-main`);


const tripInfoContainerComponent = new TripInfoContainerView();
renderElement(eventsHeadingElement, tripInfoContainerComponent.getElement(), RenderPosition.AFTERBEGIN);
renderElement(tripInfoContainerComponent.getElement(), new TripSummaryView().getElement(), RenderPosition.AFTERBEGIN);
renderElement(tripInfoContainerComponent.getElement(), new TripTotalPriceView().getElement(), RenderPosition.BEFOREEND);

renderElement(siteControlsElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteControlsElement, new SiteFilterView().getElement(), RenderPosition.BEFOREEND);

const eventsContainer = new EventsContainerView();
renderElement(pageMain, eventsContainer.getElement(), RenderPosition.BEFOREEND);
renderElement(eventsContainer.getElement(), new SiteSortView().getElement(), RenderPosition.BEFOREEND);

const daysContainer = new DaysContainerView();
renderElement(eventsContainer.getElement(), daysContainer.getElement(), RenderPosition.BEFOREEND);

renderElement(daysContainer.getElement(), new EventEditView(events[0]).getElement(), RenderPosition.BEFOREEND);
renderElement(daysContainer.getElement(), new DaysView(events).getElement(), RenderPosition.BEFOREEND);


