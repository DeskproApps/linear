import { Container } from "../common";
import { IssueForm } from "../IssueForm";
import type { FC } from "react";
import type { Props as FormProps } from "../IssueForm";

const EditIssue: FC<FormProps> = (props) => {
  return (
    <Container>
      <IssueForm isEditMode {...props} />
    </Container>
  );
};

export { EditIssue };
