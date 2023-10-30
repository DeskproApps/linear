import set from "lodash/set";
import get from "lodash/get";
import { baseRequest } from "./baseRequest";
import { gql, normalize } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { GQL, Issue } from "./types";

type Params = {
  q?: string,
  ids: Array<Issue["id"]>,
};

const getIssuesService = (client: IDeskproClient, params?: Params) => {
  let variables = {};

  if (params?.q) {
    variables = set(variables, ["filter", "title", "containsIgnoreCase"], params?.q);
  }

  if (params?.ids) {
    variables = set(variables, ["filter", "id", "in"], params?.ids);
  }

  const query = gql(variables)`
    query Issues($filter: IssueFilter) {
      issues(filter: $filter) {
        nodes {
          id identifier title description priority priorityLabel url dueDate
          state { id name }
          labels { nodes { color id name } }
          assignee { id displayName avatarUrl name email }
        }
      }
    }
  `;

  return baseRequest<GQL<Issue[]>>(client, { data: query })
    .then(normalize)
    .then((res) => get(res, ["data", "issues"]) || [])
};

export { getIssuesService };
