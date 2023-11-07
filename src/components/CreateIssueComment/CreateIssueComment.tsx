import { Container } from "../common";
import { IssueCommentForm } from "../IssueCommentForm";
import type { FC } from "react";
import type { Props as FormProps } from "../IssueCommentForm";

const CreateIssueComment: FC<FormProps> = (props) => {
  return (
    <Container>
      <IssueCommentForm {...props} />
    </Container>
  );
};

export { CreateIssueComment };
