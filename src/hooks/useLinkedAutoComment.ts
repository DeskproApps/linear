import { useCallback, useState, useMemo } from "react";
import get from "lodash/get";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { createIssueCommentService } from "../services/linear";
import type { Issue, IssueComment } from "../services/linear/types";
import type { TicketContext } from "../types";

export type Result = {
  isLoading: boolean,
  addLinkComment: (issueId?: Issue["id"]) => Promise<void|IssueComment>,
  addUnlinkComment: (issueId?: Issue["id"]) => Promise<void|IssueComment>,
};

const getLinkedMessage = (ticketId: string, link?: string): string => {
  return `Linked to Deskpro ticket ${ticketId}${link ? `, ${link}` : ""}`
};

const getUnlinkedMessage = (ticketId: string, link?: string): string => {
  return `Unlinked from Deskpro ticket ${ticketId}${link ? `, ${link}` : ""}`
};

const useLinkedAutoComment = (): Result => {
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isEnable = useMemo(() => get(context, ["settings", "add_comment_when_linking"], false), [context]);
  const ticketId = useMemo(() => get(context, ["data", "ticket", "id"]), [context]);
  const permalink = useMemo(() => get(context, ["data", "ticket", "permalinkUrl"]), [context]);

  const addLinkComment = useCallback((issueId?: Issue["id"]) => {
    if (!client || !isEnable || !issueId) {
      return Promise.resolve();
    }

    setIsLoading(true);

    return createIssueCommentService(client, {
      issueId,
      body: getLinkedMessage(ticketId, permalink),
    })
      .finally(() => setIsLoading(false));
  }, [client, isEnable, ticketId, permalink]);

  const addUnlinkComment = useCallback((issueId?: Issue["id"]) => {
    if (!client || !isEnable || !issueId) {
      return Promise.resolve();
    }

    setIsLoading(true);

    return createIssueCommentService(client, {
      issueId,
      body: getUnlinkedMessage(ticketId, permalink),
    })
      .finally(() => setIsLoading(false));
  }, [client, isEnable, ticketId, permalink]);

  return { isLoading, addLinkComment, addUnlinkComment };
};

export {
  getLinkedMessage,
  getUnlinkedMessage,
  useLinkedAutoComment,
};
