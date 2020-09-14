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
  // 18/03/19 12:25
  // const day = date.toLocaleString(`en-US`, {day: `numeric`}).padStart(2, `0`);
  // const month = date.toLocaleString(`en-US`, {month: `numeric`}).padStart(2, `0`);
  // const year = date.toLocaleString(`en-US`, {year: `2-digit`});

  return moment(date).format(`DD/MM/YY HH:mm`);

};
