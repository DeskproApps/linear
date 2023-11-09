import { removeUnnecessarySpaces } from "./removeUnnecessarySpaces";
import type { Dict } from "../types";
import reduce from "lodash/reduce";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GqlParams = Dict<any>;

interface GQL {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (params: GqlParams): (strings: TemplateStringsArray, ...placeholders: any[]) => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (params: TemplateStringsArray, ...placeholders: any[]): string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const gql: GQL = (params: GqlParams|TemplateStringsArray, ...placeholders: any[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const constructGqlString = (strings: TemplateStringsArray, placeholders: any[]) => {
    return reduce(strings, (result, string, i) => {
      const placeholder = i < placeholders.length ? placeholders[i] : "";
      return result + string + placeholder;
    }, "");
  };

  if (Array.isArray(params)) {
    const query = constructGqlString(params as never, placeholders);
    return JSON.stringify({
      query: removeUnnecessarySpaces(query),
    });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (strings: TemplateStringsArray, ...placeholders: any[]) => {
      const query = constructGqlString(strings, placeholders);
      return JSON.stringify({
        query: removeUnnecessarySpaces(query),
        variables: params,
      });
    };
  }
};


export { gql };
