import moment from "moment";

export const humanizeDay = (date) => {

  const day = moment(date).format(`MMM DD`);

  return `${day}`;
};

export const humanizeTime = (date) => {

  const time = moment(date).format(`HH:mm`);

  return `${time}`;
};

export const humanizeDuration = (start, end) => {

  const duration = end.getTime() - start.getTime();

  const days = moment(end).diff(start, `days`);
  const hours = moment(end).diff(start, `hours`);

  const daysString = days ? `${days}D` : ``;
  const hoursString = hours ? `${hours}H` : ``;
  const minutesString = `${moment(duration).format(`mm`)}M`;

  return `${daysString} ${hoursString} ${minutesString}`;
};

export const getFormatedDate = (date) => {

  return moment(date).format(`DD/MM/YY HH:mm`);

};

// remove this
export const sortByDefault = (eventA, eventB) => {
  return eventA.startTime - eventB.startTime;
};

export const sortByTime = (eventA, eventB) => {
  // sort by duration
  return eventB.startTime - eventA.startTime;
};

export const sortByPrice = (eventA, eventB) => {
  return eventB.price - eventA.price;
};

export const isEqual = (itemA, itemB) => {
  return (itemA === itemB) ? true : false;
};

