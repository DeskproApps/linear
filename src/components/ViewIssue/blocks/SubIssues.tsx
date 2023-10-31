import size from "lodash/size";
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
        ? "No sub-issues found"
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
