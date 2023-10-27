import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { GQL, User } from "./types";

const getCurrentUserService = (client: IDeskproClient) => {
  const query = "query Me { viewer { id name email  }}";

  return baseRequest<GQL<User>>(client, {
    data: JSON.stringify({ query }),
  });
};

export { getCurrentUserService };
