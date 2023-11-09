import get from "lodash/get";
import { baseRequest } from "./baseRequest";
import {
  teamFragment,
  stateFragment,
  labelFragment,
} from "./fragments";
import { gql, normalize } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Team } from "./types";

const getTeamsService = (client: IDeskproClient) => {
  const query = gql`
    query Teams {
      teams {
        nodes {
          ...teamInfo
          states { nodes { ...stateInfo } }
          defaultIssueState { id name }
          labels { nodes { ...labelInfo } }
        }
      }
      issuePriorityValues { priority label }
    }
    ${teamFragment}
    ${stateFragment}
    ${labelFragment}
  `;

  return baseRequest<Team[]>(client, { data: query })
    .then(normalize)
    .then((res) => (get(res, ["data", "teams"]) || [])
      .map((team: Team) => ({
        ...team,
        issuePriorityValues: get(res, ["data", "issuePriorityValues"])
      })))
};

export { getTeamsService };
