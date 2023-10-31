import get from "lodash/get";
import { baseRequest } from "./baseRequest";
import { gql, normalize } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Team } from "./types";

const getTeamsService = (client: IDeskproClient) => {
  const query = gql`
    query Teams {
      teams {
        nodes {
          id name color icon
          states { nodes { type name id color position } }
          defaultIssueState { id name }
          labels { nodes { id name color } }
        }
      }
      issuePriorityValues { priority label }
    }
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
