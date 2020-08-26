import {getRandomInteger} from "./util.js";

export const EVENT_TYPES = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`
];

export const DESTINATIONS = [
  `Tampere`,
  `Pietarsaari`,
  `Kokkola`,
  `Parainen`,
  `Helsinki`,
  `Oulu`
];

export const OFFERS = [
  {text: `Add luggage`, price: `30`, id: `luggage`, isChecked: Boolean(getRandomInteger())},
  {text: `Switch to comfort class`, price: `100`, id: `comfort`, isChecked: Boolean(getRandomInteger())},
  {text: `Add meal`, price: `15`, id: `meal`, isChecked: Boolean(getRandomInteger())},
  {text: `Choose seats`, price: `15`, id: `seats`, isChecked: Boolean(getRandomInteger())},
  {text: `Travel by train`, price: `40`, id: `train`, isChecked: Boolean(getRandomInteger())},
  {text: `Order Uber`, price: `20`, id: `uber`, isChecked: Boolean(getRandomInteger())}
];
