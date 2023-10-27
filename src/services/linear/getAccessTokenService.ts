import { baseRequest } from "./baseRequest";
import { AUTH_URL, placeholders } from "../../constants";
import { getQueryParams } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { AccessToken } from "./types";

const getAccessTokenService = (
  client: IDeskproClient,
  code: string,
  redirectUri: string,
) => {
  const data = new FormData();
  data.append("grant_type", "authorization_code");
  data.append("code", code);
  data.append("client_id", placeholders.CLIENT_ID);
  data.append("client_secret", placeholders.CLIENT_SECRET);
  data.append("redirect_uri", redirectUri);

  return baseRequest<AccessToken>(client, {
    rawUrl: `${AUTH_URL}/token`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: getQueryParams(data),
  });
};

export { getAccessTokenService };
