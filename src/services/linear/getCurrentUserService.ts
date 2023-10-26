import { baseRequest } from "./baseRequest";
import { gql } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { GQL, User } from "./types";

const getCurrentUserService = (client: IDeskproClient) => {
  const query = gql`
    query Me {
      viewer { id name email }
    }
  `;

  return baseRequest<GQL<User>>(client, {
    data: query,
  });
};

export { getCurrentUserService };
