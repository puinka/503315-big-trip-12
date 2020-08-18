const calculateDuration = (start, end) => {

  const duration = end.getTime() - start.getTime();

  const minutes = Math.floor((duration / (1000 * 60)) % 60).toString().padStart(2, `0`);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  const durationString = hours + `H ` + minutes + `M`;
  return durationString;
};

const createOffersList = (offers) => {
  let offersListTemplate = ``;
  for (const offer of offers) {
    offersListTemplate += `<li class="event__offer">
         <span class="event__offer-title">${offer.text}</span>
         &plus;
         &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </li>`;
  }
  return `<ul class="event__selected-offers"> ${offersListTemplate} </ul>`;
};


export const createEventItemTemplate = (event) => {
  const {type, destination, price, timeInfo, offers} = event;
  const preposition = (type === `Check-in` || type === `Sightseeing` || type === `Restaurant`) ? `in` : `to`;
  const startTime = timeInfo.start.getHours() + `:` + timeInfo.start.getMinutes().toString().padStart(2, `0`);
  const endTime = timeInfo.end.getHours() + `:` + timeInfo.end.getMinutes().toString().padStart(2, `0`);
  const duration = calculateDuration(timeInfo.start, timeInfo.end);

  return (
    `<li class="trip-events__item">
      <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${preposition} ${destination}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time">${startTime}</time>
          &mdash;
          <time class="event__end-time">${endTime}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>

  ${createOffersList(offers)}

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};
