import get from "lodash/get";
import { baseRequest } from "./baseRequest";
import { userFragment, teamFragment } from "./fragments";
import { gql, normalize } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Team, Member } from "./types";

const getTeamMembersService = (
  client: IDeskproClient,
  teamId: Team["id"],
) => {
  const query = gql({ teamId })`
    query Teams($teamId: String!) {
      team(id: $teamId) {
        ...teamInfo
        members {
          nodes { ...userInfo }
        }
      }
    }
    ${userFragment}
    ${teamFragment}
  `;

  return baseRequest<Member[]>(client, { data: query })
    .then(normalize)
    .then((res) => get(res, ["data", "team", "members"]) || []);
};

export { getTeamMembersService };
