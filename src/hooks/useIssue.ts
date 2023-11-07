import { useQueryWithClient } from "@deskpro/app-sdk";
import { QueryKey } from "../query";
import { getIssueService } from "../services/linear";
import type { Maybe } from "../types";
import type { Issue } from "../services/linear/types";

type UseIssue = (issueId?: Maybe<Issue["id"]>) => {
  isLoading: boolean,
  issue: Maybe<Issue>,
};

const useIssue: UseIssue = (issueId) => {
  const issue = useQueryWithClient(
    [QueryKey.ISSUE, issueId as Issue["id"]],
    (client) => getIssueService(client, issueId as Issue["id"]),
    { enabled: Boolean(issueId) },
  );

  return {
    isLoading: issue.isLoading,
    issue: issue.data,
  };
};

export { useIssue };
