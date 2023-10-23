import { baseRequest } from "./baseRequest";
import { AUTH_URL/*, placeholders*/ } from "../../constants";
// import { getQueryParams } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { AccessToken } from "./types";

const getAccessTokenService = (
  client: IDeskproClient,
  code: string,
  redirectUri: string,
) => {
  const form = new FormData();
  form.append("grant_type", "authorization_code");
  form.append("code", code);
  form.append("client_id", "901532d1b01ccbf5a0520012e20b9898");
  form.append("client_secret", "ffd3a215bff03f1c966641d3b7a19a9e");
  form.append("redirect_uri", redirectUri);

  return baseRequest<AccessToken>(client, {
    rawUrl: `${AUTH_URL}/token`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: form,
    // data: getQueryParams({
    //   grant_type: "authorization_code",
    //   code,
    //   client_id: "901532d1b01ccbf5a0520012e20b9898",
    //   client_secret: "ffd3a215bff03f1c966641d3b7a19a9e",
    //   redirect_uri: redirectUri,
    // }),
    // data: [
    //   "grant_type=authorization_code",
    //   `code=${code}`,
    //   "client_id=901532d1b01ccbf5a0520012e20b9898",
    //   "client_secret=ffd3a215bff03f1c966641d3b7a19a9e",
    //   `redirect_uri=${redirectUri}`,
    // ].join("&"),
  });
};

export { getAccessTokenService };
