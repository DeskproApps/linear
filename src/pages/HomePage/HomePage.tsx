import { useSetTitle, useRegisterElements } from "../../hooks";
import type { FC } from "react";

const HomePage: FC = () => {
  useSetTitle("Linear");

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
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
