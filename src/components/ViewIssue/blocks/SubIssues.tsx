import size from "lodash/size";
import { P5 } from "@deskpro/deskpro-ui";
import { Title } from "@deskpro/app-sdk";
import { ChecklistItem } from "../../common";
import type { FC } from "react";
import type { Issue } from "../../../services/linear/types";

export type Props = {
  subIssues: Issue[],
};

const SubIssues: FC<Props> = ({ subIssues }) => {
  return (
    <>
      <Title title={`Sub-Issues (${size(subIssues)})`} />
      {(!Array.isArray(subIssues) || !size(subIssues))
        ? <P5>No sub-issues found</P5>
        : subIssues.map((issue) => (
          <ChecklistItem
            disabled
            key={issue.id}
            name={issue.title}
            checked={issue.state.type === "completed"}
          />
        ))
      }
    </>
  );
};

export { SubIssues };
