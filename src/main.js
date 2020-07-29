"use strict";

const createSiteMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
    );
  };

const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
  };

const siteHeaderElement = document.querySelector(`.page-header`);
const siteControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const menuHeadingElement = siteControlsElement.querySelector(`h2:first-child`);

render(menuHeadingElement, createSiteMenuTemplate(), `afterend`);
