import size from "lodash/size";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getIssuesService } from "../../services/linear";
import { QueryKey } from "../../query";
import type { Issue } from "../../services/linear/types";

export type Result = {
  isLoading: boolean,
  issues: Issue[],
};

type UseSearchIssues = (q?: string) => Result;

const useSearchIssues: UseSearchIssues = (q) => {
  const issues = useQueryWithClient(
    [QueryKey.ISSUES, q as string],
    (client) => getIssuesService(client, { q }),
    { enabled: Boolean(q) && size(q) > 0 },
  );

  return {
    isLoading: issues.isLoading && Boolean(q),
    issues: issues.data || [],
  };
};

export { useSearchIssues };
