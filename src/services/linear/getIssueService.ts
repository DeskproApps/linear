import get from "lodash/get";
import { baseRequest } from "./baseRequest";
import {
  userFragment,
  teamFragment,
  stateFragment,
  labelFragment,
  commentFragment,
  issueFullInfoFragment,
} from "./fragments";
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
        ...issueFullInfo
        state { ...stateInfo }
        labels { nodes { ...labelInfo } }
        assignee { ...userInfo }
        team { ...teamInfo }
        children {
          nodes { ...issueInfo state { ...stateInfo } }
        }
        comments {
          nodes {
            ...commentInfo
            user { ...userInfo }
          }
        }
        relations {
          nodes {
            type
            relatedIssue {
              ...issueInfo
              state {
                ...stateInfo
              }
              team {
                ...teamInfo
              }
              labels {
                nodes {
                  ...labelInfo
                }
              }
              assignee {
                ...userInfo
              }
            }
          }
        }
      }
    }
    ${issueFullInfoFragment}
    ${stateFragment}
    ${teamFragment}
    ${labelFragment}
    ${userFragment}
    ${commentFragment}
  `;

  return baseRequest<Issue>(client, { data: query })
    .then(normalize)
    .then((res) => get(res, ["data", "issue"]))
};

export { getIssueService };