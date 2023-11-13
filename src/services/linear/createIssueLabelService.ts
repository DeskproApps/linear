import get from "lodash/get";
import { baseRequest } from "./baseRequest";
import { labelFragment, teamFragment } from "./fragments";
import { gql, normalize } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { IssueLabel, IssueLabelInput } from "./types";

const createIssueLabelService = (
  client: IDeskproClient,
  input: IssueLabelInput,
) => {
  const query = gql({ input })`
    mutation IssueLabelCreate($input: IssueLabelCreateInput!) {
      issueLabelCreate(input: $input) {
        issueLabel {
          ...labelInfo
          team { ...teamInfo }
        }
      }
    }
    ${labelFragment}
    ${teamFragment}
  `;

  return baseRequest<IssueLabel>(client, { data: query })
    .then(normalize)
    .then((res) => get(res, ["data", "issueLabelCreate", "issueLabel"]));
};

export { createIssueLabelService };
