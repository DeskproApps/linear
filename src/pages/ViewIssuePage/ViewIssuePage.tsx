import { useCallback } from "react";
import get from "lodash/get";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useIssue } from "../../hooks";
import { useSetTitle, useRegisterElements } from "../../hooks";
import { ViewIssue } from "../../components";
import type { FC } from "react";

const ViewIssuePage: FC = () => {
  const navigate = useNavigate();
  const { issueId } = useParams();
  const { isLoading, issue } = useIssue(issueId);

  const onNavigateToAddComment = useCallback(() => {
    navigate(`/issues/${issueId}/comments/create`);
  }, [navigate, issueId]);

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
      onNavigateToAddComment={onNavigateToAddComment}
    />
  );
};

export { ViewIssuePage };
