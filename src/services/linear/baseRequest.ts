import isEmpty from "lodash/isEmpty";
import { proxyFetch } from "@deskpro/app-sdk";
import { AUTH_URL } from "../../constants";
import { getQueryParams } from "../../utils";
import { LinearError } from "./LinearError";
import type { Request } from "../../types";

const baseRequest: Request = async (client, {
  url,
  rawUrl,
  data = {},
  method = "GET",
  queryParams = {},
  headers: customHeaders,
}) => {
  const dpFetch = await proxyFetch(client);

  const baseUrl = rawUrl ? rawUrl : `${AUTH_URL}${url}`;
  const params = getQueryParams(queryParams);

  const requestUrl = `${baseUrl}${isEmpty(params) ? "": `?${params}`}`;
  const options: RequestInit = {
    method,
    headers: {
      ...customHeaders,
    },
  };

  if (data instanceof FormData) {
    options.body = data;
  } else if (!isEmpty(data)) {
    options.body = JSON.stringify(data);
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

  try {
    return await res.json();
  } catch (e) {
    return {};
  }
};

export { baseRequest };
