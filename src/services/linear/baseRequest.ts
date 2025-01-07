import has from "lodash/has";
import isEmpty from "lodash/isEmpty";
import isString from "lodash";
import { proxyFetch } from "@deskpro/app-sdk";
import { GRAPHQL_URL, placeholders } from "../../constants";
import { getQueryParams } from "../../utils";
import { LinearError } from "./LinearError";
import type { Request } from "../../types";

const baseRequest: Request = async (client, {
  url,
  rawUrl,
  data,
  method = "POST",
  queryParams = {},
  headers: customHeaders,
}) => {
  const dpFetch = await proxyFetch(client);

  const baseUrl = rawUrl ? rawUrl : `${GRAPHQL_URL}${url || ""}`;
  const params = getQueryParams(queryParams);

  const requestUrl = `${baseUrl}${isEmpty(params) ? "": `?${params}`}`;
  const options: RequestInit = {
    method,
    headers: {
      "Authorization": `Bearer ${placeholders.ACCESS_TOKEN}`,
      ...customHeaders,
    },
  };

  if (!isEmpty(data)) {
    options.body = isString(data) ? data as string : JSON.stringify(data);
    options.headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };
  }

  const res = await dpFetch(requestUrl, options);

  if (res.status < 200 || res.status > 399) {
    let errorData;

    try {
      errorData = await res.json();
    } catch (e) {
      errorData = {};
    }

    throw new LinearError({
      status: res.status,
      data: errorData,
    });
  }

  let result;

  try {
    result = await res.json();
  } catch (e) {
    return {};
  }

  if (has(result, ["errors"])) {
    throw new LinearError({
      data: result,
      status: res.status,
    });
  } else {
    return result;
  }
};

export { baseRequest };
