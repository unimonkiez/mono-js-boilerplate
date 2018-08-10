const validateRegex = (regex: RegExp) => {
  if (regex.flags.indexOf('g') !== -1) {
    // This is the only way to reset global regex
    // eslint-disable-next-line no-param-reassign
    regex.lastIndex = 0; // Reset index
  }
};

export const runRegex = (regex: RegExp, value: string) => {
  validateRegex(regex);
  const execValue = regex.exec(value);

  if (execValue) {
    return execValue.filter((_, i) => i !== 0);
  }

  return [];
};

export const testRegex = (regex: RegExp, value: string) => {
  validateRegex(regex);
  return regex.test(value);
};
