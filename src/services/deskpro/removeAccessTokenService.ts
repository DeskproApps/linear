import { IDeskproClient } from "@deskpro/app-sdk";
import { ACCESS_TOKEN_PATH } from "../../constants";

const removeAccessTokenService = (client: IDeskproClient) => {
  return client.deleteUserState(ACCESS_TOKEN_PATH);
};

export { removeAccessTokenService };
