import formatDistance from 'date-fns/formatDistance';

export const dateFormatter = (date) => {
  const miliseconds = Date.parse(date);
  const newDateObject = new Date(miliseconds);
  return newDateObject.toDateString();
};

export const getTimeAGo = (date) => {
  const miliseconds = Date.parse(date);
  const newDateObject = new Date(miliseconds);
  return formatDistance(newDateObject, new Date(), {
    addSuffix: true,
  });
};
