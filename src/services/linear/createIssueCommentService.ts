import get from "lodash/get";
import { baseRequest } from "./baseRequest";
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
          id body createdAt
          user { id displayName avatarUrl name email }
        }
      }
    }
  `;

  return baseRequest<IssueComment>(client, { data: query })
    .then(normalize)
    .then((res) => get(res, ["data", "commentCreate", "comment"]));
};

export { createIssueCommentService };
