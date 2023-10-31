import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import { Info, SubIssues, Comments } from "./blocks";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { Issue } from "../../services/linear/types";

type Props = {
  issue: Maybe<Issue>;
};

const ViewIssue: FC<Props> = ({ issue }) => {
  return (
    <>
      <Container>
        <Info issue={issue}/>
      </Container>

      <HorizontalDivider/>

      <Container>
        <SubIssues subIssues={issue?.children || []}/>
      </Container>

      <HorizontalDivider/>

      <Container>
        <Comments comments={issue?.comments || []}/>
      </Container>
    </>
  );
};

export { ViewIssue };
