import { useState, useMemo, useCallback } from "react";
import get from "lodash/get";
import size from "lodash/size";
import cloneDeep from "lodash/cloneDeep";
import { useNavigate } from "react-router-dom";
import { useDebouncedCallback } from 'use-debounce';
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { setEntityService } from "../../services/deskpro";
import {
  useSetTitle,
  useAsyncError,
  useRegisterElements,
} from "../../hooks";
import { useSearchIssues } from "./hooks";
import { LinkIssues } from "../../components";
import type { FC } from "react";
import type { TicketContext } from "../../types";
import type { Issue } from "../../services/linear/types";

const LinkIssuesPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { asyncErrorHandler } = useAsyncError();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedIssues, setSelectedIssues] = useState<Issue[]>([]);
  const { issues, isLoading } = useSearchIssues(searchQuery);
  const ticketId = useMemo(() => get(context, ["data", "ticket", "id"]), [context]);

  const onChangeSearchQuery = useDebouncedCallback(setSearchQuery, 1500);

  const onChangeSelectedIssue = useCallback((issue: Issue) => {
    let newSelectedIssues = cloneDeep(selectedIssues);

    if (selectedIssues.some((selectedIssue) => issue.id === selectedIssue.id)) {
      newSelectedIssues = selectedIssues.filter((selectedCard) => {
        return selectedCard.id !== issue.id;
      });
    } else {
      newSelectedIssues.push(issue);
    }

    setSelectedIssues(newSelectedIssues);
  }, [selectedIssues]);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onLinkIssues = useCallback(() => {
    if (!client || !ticketId || !size(selectedIssues)) {
      return;
    }

    setIsSubmitting(true);

    return Promise.all([
      ...selectedIssues.map((issue) => setEntityService(client, ticketId, issue.id)),
    ])
      .then(() => navigate("/home"))
      .catch(asyncErrorHandler)
      .finally(() => setIsSubmitting(false));
  }, [client, asyncErrorHandler, selectedIssues, ticketId, navigate]);

  useSetTitle("Linear");

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <LinkIssues
      issues={issues}
      onCancel={onCancel}
      isLoading={isLoading}
      onLinkIssues={onLinkIssues}
      isSubmitting={isSubmitting}
      selectedIssues={selectedIssues}
      onChangeSearchQuery={onChangeSearchQuery}
      onChangeSelectedIssue={onChangeSelectedIssue}
    />
  );
};

export { LinkIssuesPage };