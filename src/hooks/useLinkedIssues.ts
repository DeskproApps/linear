import { useMemo } from "react";
import get from "lodash/get";
import size from "lodash/size";
import {
  useQueryWithClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { getEntityListService } from "../services/deskpro";
import { getIssuesService } from "../services/linear";
import { QueryKey } from "../query";
import type { Issue } from "../services/linear/types";
import type { TicketContext } from "../types";

type UseLinkedIssues = () => {
  isLoading: boolean;
  issues: Issue[];
};

const useLinkedIssues: UseLinkedIssues = () => {
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const ticketId = useMemo(() => get(context, ["data", "ticket", "id"]), [context]);

  const linkedIds = useQueryWithClient(
    [QueryKey.LINKED_ISSUES, ticketId],
    (client) => getEntityListService(client, ticketId),
    { enabled: Boolean(ticketId) },
  );

  const issues = useQueryWithClient(
    [QueryKey.ISSUES, ...(linkedIds.data || [] as Array<Issue["id"]>)],
    (client) => getIssuesService(client, { ids: linkedIds.data as Array<Issue["id"]> }),
    { enabled: Boolean(size(linkedIds.data)) }
  );

  return {
    isLoading: [issues].some(({ isFetching }) => isFetching),
    issues: issues.data || [] as Issue[],
  };
};

export { useLinkedIssues };
