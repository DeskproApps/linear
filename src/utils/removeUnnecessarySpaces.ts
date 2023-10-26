import isString from "lodash/isString";

const removeUnnecessarySpaces = (value?: string): string => {
  return !isString(value) ? "" : value.replace(/\s+/g, ' ').trim()
};

export { removeUnnecessarySpaces };
