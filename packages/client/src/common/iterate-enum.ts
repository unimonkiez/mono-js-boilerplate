export const getArrayByEnum = (someEnum): Array<number> => Object.keys(someEnum)
  .filter(item => (!isNaN(Number(item))))
  .map(item => Number(item));
