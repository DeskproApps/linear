import size from "lodash/size";
import { P5 } from "@deskpro/deskpro-ui";
import { Title } from "@deskpro/app-sdk";
import { SubIssue } from "../../common";
import type { FC } from "react";
import type { Issue, WorkflowState } from "../../../services/linear/types";

export type Props = {
  subIssues: Issue[],
  states: WorkflowState[],
  onChangeState: (
    issueId: Issue["id"],
    statusId: WorkflowState["id"],
  ) => Promise<void|Issue>,
};

const SubIssues: FC<Props> = ({ subIssues, states, onChangeState }) => {
  return (
    <>
      <Title title={`Sub-Issues (${size(subIssues)})`} />
      {(!Array.isArray(subIssues) || !size(subIssues))
        ? <P5>No sub-issues found</P5>
        : subIssues.map((issue) => (
          <SubIssue
            key={issue.id}
            issue={issue}
            states={states}
            onChangeState={onChangeState}
          />
        ))
      }
    </>
  );
};

export { SubIssues };
