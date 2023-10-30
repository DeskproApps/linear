import { useSetTitle, useRegisterElements } from "../../hooks";
import type { FC } from "react";

const HomePage: FC = () => {
  useSetTitle("Linear");

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

  return (
    <>
      HomePage
    </>
  );
};

export { HomePage };
