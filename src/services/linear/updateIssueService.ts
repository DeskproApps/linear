import get from "lodash/get";
import { baseRequest } from "./baseRequest";
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
          id identifier title description priority priorityLabel url dueDate
          state { type name id color position }
          labels { nodes { color id name } }
          assignee { id displayName avatarUrl name email }
        }
      }
    }
  `;

  return baseRequest(client, { data: query })
    .then(normalize)
    .then((res) => get(res, ["data", "issueUpdate", "issue"]));
};

export { updateIssueService };
