import {
  Search,
  HorizontalDivider,
} from "@deskpro/app-sdk";
import { Container, Navigation } from "../common";
import { Buttons, Issues } from "./blocks";
import type { FC } from "react";
import type { Issue } from "../../services/linear/types";

export type Props = {
  isLoading: boolean,
  isSubmitting: boolean,
  issues: Issue[],
  onCancel: () => void,
  onLinkIssues: () => void,
  selectedIssues: Issue[],
  onNavigateToCreate: () => void,
  onChangeSelectedIssue: (issue: Issue) => void,
  onChangeSearchQuery?: (search: string) => void,
};

const LinkIssues: FC<Props> = ({
  issues,
  isLoading,
  isSubmitting,
  onCancel,
  onLinkIssues,
  selectedIssues,
  onNavigateToCreate,
  onChangeSearchQuery,
  onChangeSelectedIssue,
}) => {
  return (
    <>
      <Container>
        <Navigation selected="link" onNavigateToCreate={onNavigateToCreate} />
        <Search
          isFetching={isLoading}
          onChange={onChangeSearchQuery}
          inputProps={{ variant: "normal" }}
        />
        <Buttons
          isSubmitting={isSubmitting}
          onCancel={onCancel}
          selectedIssues={selectedIssues}
          onLinkIssues={onLinkIssues}
        />
      </Container>

      <HorizontalDivider/>

      <Container>
        <Issues
          isLoading={isLoading}
          issues={issues}
          selectedIssues={selectedIssues}
          onChangeSelectedIssue={onChangeSelectedIssue}
        />
      </Container>
    </>
  );
};

export { LinkIssues };
