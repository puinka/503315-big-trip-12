export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElement = (arr) => {

  const randomIndex = getRandomInteger(0, arr.length - 1);

  return arr[randomIndex];
};

export const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const humanizeTime = (date) => {
  const hours = date.getHours().toString().padStart(2, `0`);
  const minutes = date.getMinutes().toString().padStart(2, `0`);

  return `${hours}:${minutes}`;
};
