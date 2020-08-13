import {EVENT_TYPES, DESTINATIONS, OFFERS} from "../const.js";
import {getRandomInteger, generateRandomValue} from "../util.js";


const generateDescription = () => {
  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
    `Cras aliquet varius magna, non porta ligula feugiat eget. `,
    `Fusce tristique felis at fermentum pharetra. Aliquam erat volutpat. `,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `,
    `Aliquam id orci ut lectus varius viverra. `,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. `,
    `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus. `,
    `Sed sed nisi sed augue convallis suscipit in sed felis. `
  ];

  const sentencesAmount = getRandomInteger(1, 5);

  const sentences = descriptions.slice();
  let description = ``;

  for (let i = 0; i < sentencesAmount; i++) {
    description += sentences[i];
    sentences.splice(sentences[i], 1);
  }

  return description;
};

const generateRandomTime = () => {
  let hoursStart = getRandomInteger(0, 23);
  let minutesStart = getRandomInteger(0, 11) * 5;
  let startInMin = hoursStart * 60 + minutesStart;
  let hoursEnd = getRandomInteger(0, 23);
  let minutesEnd = getRandomInteger(0, 11) * 5;
  let endInMin = hoursEnd * 60 + minutesEnd;
  let day = ``;
  let durationHours = Math.floor((endInMin - startInMin) / 60);
  let durationMinutes = (endInMin - startInMin) % 60;

  if (startInMin > endInMin) {
    day = `1D `;
    durationHours = 12 + (hoursEnd - hoursStart);
    durationMinutes = 60 + durationMinutes;
  }

  hoursStart = hoursStart < 10 ? `0` + hoursStart.toString() : hoursStart.toString();
  minutesStart = minutesStart < 10 ? `0` + minutesStart.toString() : minutesStart.toString();
  hoursEnd = hoursEnd < 10 ? `0` + hoursEnd.toString() : hoursEnd.toString();
  minutesEnd = minutesEnd < 10 ? `0` + minutesEnd.toString() : minutesEnd.toString();

  let startTime = hoursStart + `:` + minutesStart;
  let endTime = hoursEnd.toString() + `:` + minutesEnd.toString();
  let duration = day + durationHours.toString() + `H ` + durationMinutes.toString() + `M`;

  return {
    startTime,
    endTime,
    duration
  };
};

export const generateEvent = () => {
  const randomTime = generateRandomTime();

  const isOfferAvailable = Boolean(getRandomInteger(0, 1));
  const offer = isOfferAvailable ? generateRandomValue(OFFERS) : ``;


  return {
    type: generateRandomValue(EVENT_TYPES),
    destination: generateRandomValue(DESTINATIONS),
    description: {
      text: generateDescription(),
      photo: `http://picsum.photos/248/152?r=${Math.random()}`
    },
    timeInfo: {
      start: randomTime.startTime,
      end: randomTime.endTime,
      duration: randomTime.duration
    },
    price: getRandomInteger(1, 250),
    isOfferAvailable,
    offer: {
      text: offer.text,
      price: offer.price
    }
  };
};
