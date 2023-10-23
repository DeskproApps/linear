import { IDeskproClient } from "@deskpro/app-sdk";
import { ACCESS_TOKEN_PATH } from "../../constants";

const setAccessTokenService = (client: IDeskproClient, token: string) => {
  return client.setUserState(ACCESS_TOKEN_PATH, token, { backend: true });
};

export { setAccessTokenService };
