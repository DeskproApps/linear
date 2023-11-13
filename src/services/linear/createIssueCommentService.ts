import get from "lodash/get";
import { baseRequest } from "./baseRequest";
import { userFragment, commentFragment } from "./fragments";
import { gql, normalize } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { IssueCommentCreateInput, IssueComment } from "./types";

const createIssueCommentService = (
  client: IDeskproClient,
  input: IssueCommentCreateInput,
) => {
  const query = gql({ input })`
    mutation CommentCreate($input: CommentCreateInput!) {
      commentCreate(input: $input) {
        comment {
          ...commentInfo
          user { ...userInfo }
        }
      }
    }
    ${userFragment}
    ${commentFragment}
  `;

  return baseRequest<IssueComment>(client, { data: query })
    .then(normalize)
    .then((res) => get(res, ["data", "commentCreate", "comment"]));
};

export { createIssueCommentService };
