import has from "lodash/has";
import get from "lodash/get";
import map from "lodash/map";
import mapValues from "lodash/mapValues";
import isPlainObject from "lodash/isPlainObject";
import type { Dict } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalize = (res?: any): Dict<any> => {
  if (Array.isArray(res)) {
    return map(res, normalize);
  } else if (isPlainObject(res)) {
    return (has(res, ["nodes"]))
      ? normalize(get(res, ["nodes"], "") || [])
      : mapValues(res, normalize);
  }

  return res;
};

export { normalize };
