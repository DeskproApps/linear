import { useSetTitle, useRegisterElements } from "../../hooks";
import type { FC } from "react";

const LinkIssuesPage: FC = () => {
  useSetTitle("Linear");

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <>
      LinkIssuesPage
    </>
  );
};

export { LinkIssuesPage };
