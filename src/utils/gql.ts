import { removeUnnecessarySpaces } from "./removeUnnecessarySpaces";
import type { Dict } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GqlParams = Dict<any>;

interface GQL {
  (params: GqlParams): (strings: TemplateStringsArray) => string;
  (params: TemplateStringsArray): string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const gql: GQL = (params: GqlParams|TemplateStringsArray) => {
  if (Array.isArray(params)) {
    return JSON.stringify({
      query: removeUnnecessarySpaces(params[0]),
    });
  }

  return ([template]:TemplateStringsArray ) => {
    return JSON.stringify({
      query: removeUnnecessarySpaces(template),
      variables: params,
    });
  };
};

export { gql };
