import { Fragment } from "react";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container, NoFoundIssues } from "../common";
import { IssueItem } from "../IssueItem";
import type { FC } from "react";
import type { Issue } from "../../services/linear/types";

type Props = {
  issues: Issue[],
  onNavigateToIssue: (issueId: Issue["id"]) => void,
};

const Home: FC<Props> = ({ issues, onNavigateToIssue }) => {
  return (
    <Container>
      <NoFoundIssues issues={issues}>
        {(issues) => issues.map((issue) => (
          <Fragment key={issue.id}>
            <IssueItem issue={issue} onClickTitle={() => onNavigateToIssue(issue.id)}/>
            <HorizontalDivider style={{ marginBottom: 6 }} />
          </Fragment>
        ))}
      </NoFoundIssues>
    </Container>
  );
};

export { Home };
