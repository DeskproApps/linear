import get from "lodash/get";
import { baseRequest } from "./baseRequest";
import {
  userFragment,
  teamFragment,
  stateFragment,
  issueFragment,
  labelFragment,
} from "./fragments";
import { gql, normalize } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Issue, IssueEditInput } from "./types";

const updateIssueService = (
  client: IDeskproClient,
  issueUpdateId: Issue["id"],
  input: IssueEditInput,
) => {
  const query = gql({ issueUpdateId, input })`
    mutation IssueUpdate($issueUpdateId: String!, $input: IssueUpdateInput!) {
      issueUpdate(id: $issueUpdateId, input: $input) {
        issue {
          ...issueInfo
          state { ...stateInfo }
          team { ...teamInfo }
          labels { nodes { ...labelInfo } }
          assignee { ...userInfo }
        }
      }
    }
    ${issueFragment}
    ${stateFragment}
    ${teamFragment}
    ${labelFragment}
    ${userFragment}
  `;

  return baseRequest(client, { data: query })
    .then(normalize)
    .then((res) => get(res, ["data", "issueUpdate", "issue"]));
};

export { updateIssueService };
