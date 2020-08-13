
export const generateDay = (index) => {
  const num = index + 1;
  let date = new Date();
  date.setDate(date.getDate() + index);
  date = date.toLocaleString(`en-GB`, {month: `long`, day: `numeric`});

  return {num, date};

};
