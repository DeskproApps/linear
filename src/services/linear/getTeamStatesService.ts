import get from "lodash/get";
import { baseRequest } from "./baseRequest";
import { teamFragment, stateFragment } from "./fragments";
import { gql, normalize } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Team, WorkflowState } from "./types";

const getTeamStatesService = (
  client: IDeskproClient,
  teamId: Team["id"],
) => {
  const query = gql({ teamId })`
    query Teams($teamId: String!) {
      team(id: $teamId) {
        ...teamInfo
        states {
          nodes { ...stateInfo }
        }
      }
    }
    ${stateFragment}
    ${teamFragment}
  `;

  return baseRequest<WorkflowState[]>(client, { data: query })
    .then(normalize)
    .then((res) => get(res, ["data", "team", "states"]) || []);
};

export { getTeamStatesService };
