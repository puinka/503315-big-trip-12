import SiteMenuView from "./view/site-menu.js";

import TripInfoContainerView from "./view/trip-info-container.js";
import TripSummaryView from "./view/trip-summary.js";
import TripTotalPriceView from "./view/total-price.js";
import FilterPresenter from "./presenter/filter-presenter.js";
import TripPresenter from "./presenter/trip.js";

import EventsModel from "./model/events-model.js";
import FilterModel from "./model/filter-model.js";

import {generateData} from "./mock/event.js";
import {render, RenderPosition} from "./utils/render.js";

const EVENT_COUNT = 20;


const events = generateData(EVENT_COUNT);


const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const totalPrice = events.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);


const siteHeaderElement = document.querySelector(`.page-header`);
const siteControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const pageMain = document.querySelector(`.page-main`);

const eventsHeadingElement = siteHeaderElement.querySelector(`.trip-main`);

const tripInfoContainerComponent = new TripInfoContainerView();
render(eventsHeadingElement, tripInfoContainerComponent.getElement(), RenderPosition.AFTERBEGIN);
render(tripInfoContainerComponent.getElement(), new TripSummaryView(events).getElement(), RenderPosition.AFTERBEGIN);
render(tripInfoContainerComponent.getElement(), new TripTotalPriceView(totalPrice).getElement(), RenderPosition.BEFOREEND);

render(siteControlsElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(pageMain, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(siteControlsElement, filterModel, eventsModel);

filterPresenter.init();
tripPresenter.init();

