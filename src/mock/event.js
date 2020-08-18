import {EVENT_TYPES, DESTINATIONS, OFFERS} from "../const.js";
import {getRandomInteger, generateRandomValue, shuffleArray} from "../util.js";


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

const generateOffers = (arr) => {

  const inPutArr = shuffleArray(arr);
  const outPutArr = [];
  for (let i = 0; i < 5; i++) {
    if ((getRandomInteger(0, 1))) {
      outPutArr.push(inPutArr[i]);
    }
  }

  return outPutArr;

};

const generatePhotos = () => {
  const photos = [];
  const amount = getRandomInteger(1, 5);
  for (let i = 0; i <= amount; i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return photos;
};

export const generateEvent = (startDate) => {

  const startTime = new Date(startDate);
  const endTime = new Date(startDate);
  endTime.setHours(endTime.getHours() + getRandomInteger(1, 2));
  endTime.setMinutes(endTime.getMinutes() + getRandomInteger(1, 59));


  return {
    type: generateRandomValue(EVENT_TYPES),
    destination: generateRandomValue(DESTINATIONS),
    description: {
      text: generateDescription(),
      photos: generatePhotos()
    },
    timeInfo: {
      start: startTime,
      end: endTime,
    },
    price: getRandomInteger(1, 250),
    offers: generateOffers(OFFERS)
  };
};

export const generateData = (count) => {
  const startDate = new Date();
  const data = [];
  for (let i = 0; i < count; i++) {
    startDate.setHours(startDate.getHours() + getRandomInteger(1, 5));
    startDate.setMinutes(startDate.getMinutes() + getRandomInteger(1, 59));
    data.push(generateEvent(startDate));
  }
  return data;
};
