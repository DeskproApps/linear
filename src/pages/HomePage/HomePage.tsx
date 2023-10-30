import { LoadingSpinner } from "@deskpro/app-sdk";
import {
  useSetTitle,
  useLinkedIssues,
  useSetBadgeCount,
  useRegisterElements,
} from "../../hooks";
import { Home } from "../../components";
import type { FC } from "react";

const HomePage: FC = () => {
  const { isLoading, issues } = useLinkedIssues();

  useSetTitle("Linear");

  useSetBadgeCount(issues);

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("plus", {
      type: "plus_button",
      payload: { type: "changePage", path: "/issues/link" },
    });
    registerElement("menu", {
      type: "menu",
      items: [{
        title: "Log Out",
        payload: {
          type: "logout",
        },
      }],
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Home issues={issues} />
  );
};

export { HomePage };
