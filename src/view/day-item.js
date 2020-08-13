export const createDayItemTemplate = (day) => {
  const {num, date} = day;
  return (
    `<li class="trip-days__item  day" id="day-${num}">
      <div class="day__info">
        <span class="day__counter">${num}</span>
        <time class="day__date" datetime="2019-03-18">${date}</time>
      </div>
    </li>`
  );
};
