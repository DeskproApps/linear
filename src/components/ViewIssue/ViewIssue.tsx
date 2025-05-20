import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import { Info, SubIssues, Comments } from "./blocks";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { Issue, WorkflowState } from "../../services/linear/types";
import { Relationships } from './blocks/Relationships';

type Props = {
  issue: Maybe<Issue>,
  states: WorkflowState[],
  onNavigateToAddComment: () => void,
  onChangeState: (
    issueId: Issue["id"],
    statusId: WorkflowState["id"],
  ) => Promise<void|Issue>,
};

const ViewIssue: FC<Props> = ({
  issue,
  states,
  onChangeState,
  onNavigateToAddComment,
}) => {
  return (
    <>
      <Container>
        <Info issue={issue}/>
      </Container>

      <HorizontalDivider/>

      <Container>
        <SubIssues
          states={states}
          subIssues={issue?.children || []}
          onChangeState={onChangeState}
        />
      </Container>

      <HorizontalDivider/>

      <Container>
        <Relationships relationships={issue?.relations || []} />
      </Container>

      <HorizontalDivider />

      <Container>
        <Comments
          comments={issue?.comments || []}
          onNavigateToAddComment={onNavigateToAddComment}
        />
      </Container>
    </>
  );
};

export { ViewIssue };
