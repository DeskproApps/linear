import set from "lodash/set";
import get from "lodash/get";
import { baseRequest } from "./baseRequest";
import {
  teamFragment,
  userFragment,
  issueFragment,
  stateFragment,
  labelFragment,
} from "./fragments";
import { gql, normalize } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { GQL, Issue } from "./types";

type Params = {
  q?: string,
  ids?: Array<Issue["id"]>,
};

// The scalar fields of `issueInfo`, inlined for use on `IssueSearchResult`
// nodes (which are not of type `Issue`, so the fragment cannot be spread).
const issueScalarFields = `
  id
  identifier
  title
  priority
  priorityLabel
  url
  dueDate
`;

// Shared sub-selection for an issue node beyond its own scalar fields. The
// nested relatedIssue is always of type `Issue`, so spreading `issueInfo`
// there is valid for both queries.
const issueNodeFields = `
  state { ...stateInfo }
  team { ...teamInfo }
  labels { nodes { ...labelInfo } }
  assignee { ...userInfo }
  relations {
    nodes {
      type
      relatedIssue {
        ...issueInfo
        state { ...stateInfo }
        team { ...teamInfo }
        labels { nodes { ...labelInfo } }
        assignee { ...userInfo }
      }
    }
  }
  inverseRelations {
    nodes {
      type
      issue {
        ...issueInfo
        state { ...stateInfo }
        team { ...teamInfo }
        labels { nodes { ...labelInfo } }
        assignee { ...userInfo }
      }
    }
  }
  releases {
    nodes {
      id
      name
      version
      url
      stage {
        id
        name
        type
        color
      }
    }
  }
`;

const getIssuesService = (client: IDeskproClient, params?: Params) => {
  // A free-text query is run through Linear's full-text search so that it
  // matches the human identifier (e.g. "ENG-123") as well as the title — the
  // `issues` filter has no identifier comparator.
  if (params?.q) {
    const query = gql({ term: params.q })`
      query SearchIssues($term: String!) {
        searchIssues(term: $term) {
          nodes {
            ${issueScalarFields}
            ${issueNodeFields}
          }
        }
      }
      ${issueFragment}
      ${stateFragment}
      ${teamFragment}
      ${labelFragment}
      ${userFragment}
    `;

    return baseRequest<GQL<Issue[]>>(client, { data: query })
      .then(normalize)
      .then((res) => get(res, ["data", "searchIssues"]) || []);
  }

  let variables = {};

  if (params?.ids) {
    variables = set(variables, ["filter", "id", "in"], params.ids);
  }

  const query = gql(variables)`
    query Issues($filter: IssueFilter) {
      issues(filter: $filter) {
        nodes {
          ...issueInfo
          ${issueNodeFields}
        }
      }
    }
    ${issueFragment}
    ${stateFragment}
    ${teamFragment}
    ${labelFragment}
    ${userFragment}
  `;

  return baseRequest<GQL<Issue[]>>(client, { data: query })
    .then(normalize)
    .then((res) => get(res, ["data", "issues"]) || [])
};

export { getIssuesService };
