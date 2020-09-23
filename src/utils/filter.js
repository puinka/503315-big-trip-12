import {FilterType} from "../const.js";

const currentTime = new Date();

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.PAST]: (events) => events.filter((event) => event.startTime < currentTime),
  [FilterType.FUTURE]: (events) => events.filter((event) => event.startTime > currentTime)
};
