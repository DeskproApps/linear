import get from "lodash/get";
import { baseRequest } from "./baseRequest";
import { gql, normalize } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Team, IssueLabel } from "./types";

const getTeamLabelsService = (
  client: IDeskproClient,
  teamId: Team["id"],
) => {
  const query = gql({ teamId })`
    query Team($teamId: String!) {
      team(id: $teamId) {
        labels {
          nodes { id name icon color }
        }
      }
    }
  `;

  return baseRequest<IssueLabel[]>(client, { data: query })
    .then(normalize)
    .then((res) => get(res, ["data", "team", "labels"]));
};

export { getTeamLabelsService };
