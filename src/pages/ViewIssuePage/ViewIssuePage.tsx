import get from "lodash/get";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useIssue } from "./hooks";
import { useSetTitle, useRegisterElements } from "../../hooks";
import { ViewIssue } from "../../components";
import type { FC } from "react";

const ViewIssuePage: FC = () => {
  const { issueId } = useParams();
  const { isLoading, issue } = useIssue(issueId);

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
  }, [issue]);

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <ViewIssue issue={issue}/>
  );
};

export { ViewIssuePage };
