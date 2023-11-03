import get from "lodash/get";
import { baseRequest } from "./baseRequest";
import { gql, normalize } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Issue } from "./types";

const getIssueService = (
  client: IDeskproClient,
  issueId: Issue["id"],
) => {
  const query = gql({ issueId })`
    query Issue($issueId: String!) {
      issue(id: $issueId) {
        id identifier title description priority priorityLabel url dueDate
        state { id name }
        labels { nodes { color id name } }
        assignee { id displayName avatarUrl name email }
        team { id name }
        children {
          nodes { id identifier title state { id name type } }
        }
        comments {
          nodes {
            id body createdAt
            user { id displayName avatarUrl name email }
          }
        }
      }
    }
  `;

  return baseRequest<Issue>(client, { data: query })
    .then(normalize)
    .then((res) => get(res, ["data", "issue"]))
};

export { getIssueService };
