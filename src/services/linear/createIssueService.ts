import get from "lodash/get";
import { baseRequest } from "./baseRequest";
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
          id identifier title description priority priorityLabel url dueDate
          state { id name type color position }
          labels { nodes { color id name } }
          assignee { id displayName avatarUrl name email }
        }
      }
    }
  `;

  return baseRequest<Issue>(client, { data: query })
    .then(normalize)
    .then((res) => get(res, ["data", "issueCreate", "issue"]));
};

export { createIssueService };
