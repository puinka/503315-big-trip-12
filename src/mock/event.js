const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateEventType = () => {
  const eventTypes = [
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

  const randomIndex = getRandomInteger(0, eventTypes.length - 1);

  return eventTypes[randomIndex];
};

const generateDestination = () => {
  const destinations = [
    `Tampere`,
    `Pietarsaari`,
    `Kokkola`,
    `Parainen`,
    `Helsinki`,
    `Oulu`
  ];

  const randomIndex = getRandomInteger(0, destinations.length - 1);

  return destinations[randomIndex];
};

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

  return {
    type: generateEventType(),
    destination: generateDestination(),
    description: generateDescription(),
    timeInfo: {
      start: randomTime.startTime,
      end: randomTime.endTime,
      duration: randomTime.duration
    },
    price: getRandomInteger(1, 250)
  };
};
