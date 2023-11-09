import { useCallback } from "react";
import get from "lodash/get";
import { useParams, useNavigate } from "react-router-dom";
import {
  LoadingSpinner,
  useDeskproAppClient,
} from "@deskpro/app-sdk";
import { queryClient } from "../../query";
import { updateIssueService } from "../../services/linear";
import { useIssue, useAsyncError } from "../../hooks";
import { useSetTitle, useRegisterElements } from "../../hooks";
import { useIssueDeps } from "./hooks";
import { ViewIssue } from "../../components";
import type { FC } from "react";
import type { Issue, WorkflowState } from "../../services/linear/types";

const ViewIssuePage: FC = () => {
  const navigate = useNavigate();
  const { issueId } = useParams();
  const { client } = useDeskproAppClient();
  const { asyncErrorHandler } = useAsyncError();
  const { isLoading: isLoadingIssue, issue } = useIssue(issueId);
  const { isLoading: isLoadingStates, states } = useIssueDeps(get(issue, ["team", "id"]));
  const isLoading = [isLoadingIssue, isLoadingStates].some(Boolean)

  const onNavigateToAddComment = useCallback(() => {
    navigate(`/issues/${issueId}/comments/create`);
  }, [navigate, issueId]);

  const onChangeState = useCallback((
    subIssueId: Issue["id"],
    status: WorkflowState["id"],
  ): Promise<void|Issue> => {
    if (!client) {
      return Promise.resolve();
    }

    return updateIssueService(client, subIssueId, { stateId: status })
      .then(() => queryClient.invalidateQueries())
      .catch(asyncErrorHandler);
  }, [client, asyncErrorHandler]);

  useSetTitle(get(issue, ["identifier"], "Linear"));

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
    registerElement("menu", {
      type: "menu",
      items: [{
        title: "Unlink issue",
        payload: { type: "unlink", issue },
      }],
    });
    registerElement("edit", {
      type: "edit_button",
      payload: {
        type: "changePage",
        path: `/issues/edit/${issue?.id}`,
      },
    });
  }, [issue]);

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <ViewIssue
      issue={issue}
      states={states}
      onChangeState={onChangeState}
      onNavigateToAddComment={onNavigateToAddComment}
    />
  );
};

export { ViewIssuePage };
