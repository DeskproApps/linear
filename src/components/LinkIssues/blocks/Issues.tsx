import { Fragment } from "react";
import { Checkbox } from "@deskpro/deskpro-ui";
import { LoadingSpinner, HorizontalDivider } from "@deskpro/app-sdk";
import { NoFoundIssues, Card } from "../../common";
import { IssueItem } from "../../IssueItem";
import type { FC } from "react";
import type { Issue } from "../../../services/linear/types";

export type Props = {
  isLoading: boolean,
  issues: Issue[],
  selectedIssues: Issue[],
  onChangeSelectedIssue: (issue: Issue) => void,
};

const Issues: FC<Props> = ({
  issues,
  isLoading,
  selectedIssues,
  onChangeSelectedIssue,
}) => {
  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <NoFoundIssues issues={issues}>
      {(issues) => issues.map((issue) => (
        <Fragment key={issue.id}>
          <Card>
            <Card.Media>
              <Checkbox
                size={12}
                containerStyle={{ marginTop: 4 }}
                onChange={() => onChangeSelectedIssue(issue)}
                checked={selectedIssues.some((selectedIssue) => {
                  return issue.id === selectedIssue.id;
                })}
              />
            </Card.Media>
            <Card.Body>
              <IssueItem
                issue={issue}
                onClickTitle={() => onChangeSelectedIssue(issue)}
              />
            </Card.Body>
          </Card>
          <HorizontalDivider style={{ marginBottom: 6 }} />
        </Fragment>
      ))}
    </NoFoundIssues>
  );
};

export { Issues };
