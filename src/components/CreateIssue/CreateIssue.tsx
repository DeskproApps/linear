import { Container, Navigation } from "../common";
import { IssueForm } from "../IssueForm";
import type { FC } from "react";
import type { Props as FormProps } from "../IssueForm";

export type Props = FormProps & {
  onNavigateToLink: () => void,
};

const CreateIssue: FC<Props> = ({ onNavigateToLink, ...props }) => {
  return (
    <Container>
      <Navigation selected="create" onNavigateToLink={onNavigateToLink}/>
      <IssueForm {...props} />
    </Container>
  );
};

export { CreateIssue };
