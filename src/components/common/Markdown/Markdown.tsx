import showdown from "showdown";
import { DPNormalize } from "../Typography";
import type { FC } from "react";

type Props = {
  text: string,
};

const converter = new showdown.Converter({
  tables: true,
  tasklists: true,
  strikethrough: true,
  simplifiedAutoLink: true,
  openLinksInNewWindow: true,
  disableForced4SpacesIndentedSublists: true,
});

const Markdown: FC<Props> = ({ text }) => (
  <DPNormalize text={converter.makeHtml(text)} />
);

export { Markdown };
