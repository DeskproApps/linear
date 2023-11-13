import get from "lodash/get";
import { baseRequest } from "./baseRequest";
import {
  issueFragment,
  stateFragment,
  teamFragment,
  labelFragment,
  userFragment,
} from "./fragments";
import { gql, normalize } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Issue, IssueEditInput } from "./types";

const createIssueService = (
  client: IDeskproClient,
  input: IssueEditInput,
) => {
  const query = gql({ input })`
    mutation IssueCreate($input: IssueCreateInput!) {
      issueCreate(input: $input) {
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

  return baseRequest<Issue>(client, { data: query })
    .then(normalize)
    .then((res) => get(res, ["data", "issueCreate", "issue"]));
};

export { createIssueService };
