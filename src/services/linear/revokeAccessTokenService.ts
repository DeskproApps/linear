import { baseRequest } from "./baseRequest";
import { AUTH_URL } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";

const revokeAccessTokenService = (client: IDeskproClient) => {
  return baseRequest(client, {
    rawUrl: `${AUTH_URL}/revoke`,
  });
};

export { revokeAccessTokenService };
