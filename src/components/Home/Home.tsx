import { Fragment } from "react";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container, NoFoundIssues } from "../common";
import { IssueItem } from "../IssueItem";
import type { FC } from "react";
import type { Issue } from "../../services/linear/types";

type Props = {
  issues: Issue[],
};

const Home: FC<Props> = ({ issues }) => {
  return (
    <Container>
      <NoFoundIssues issues={issues}>
        {(issues) => issues.map((issue) => (
          <Fragment key={issue.id}>
            <IssueItem issue={issue} />
            <HorizontalDivider style={{ marginBottom: 6 }} />
          </Fragment>
        ))}
      </NoFoundIssues>
    </Container>
  );
};

export { Home };
