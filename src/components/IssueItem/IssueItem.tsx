import { useMemo, useCallback } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { Stack } from "@deskpro/deskpro-ui";
import { Title, Link, Property, TwoProperties } from "@deskpro/app-sdk";
import { parse, format } from "../../utils/date";
import {
  Team,
  Member,
  Status,
  Priority,
  IssueLabel,
  LinearLogo,
  DeskproTickets,
  ErrorBlock
} from "../common";
import type { FC, MouseEventHandler } from "react";
import type { Issue } from "../../services/linear/types";
import { RelationshipItem } from '../RelationshipItem/RelationshipItem';
import { useIssueRelationships } from '../../hooks/useIssueRelationships';

export type Props = {
  issue: Issue,
  onClickTitle?: () => void,
};

const IssueItem: FC<Props> = ({ issue, onClickTitle }) => {
  const assigneeName = useMemo(() => {
    return get(issue, ["assignee", "name"])
      || get(issue, ["assignee", "displayName"])
      || get(issue, ["assignee", "email"]);
  }, [issue]);
  const labels = useMemo(() => get(issue, ["labels"], []) || [], [issue]);
  const { relationships, error } = useIssueRelationships(issue.relations, issue.id);

  const onClick: MouseEventHandler<HTMLAnchorElement> = useCallback((e) => {
    e.preventDefault();
    onClickTitle && onClickTitle();
  }, [onClickTitle]);

  return (
    <>
      <Title
        title={!onClickTitle
          ? get(issue, ["title"])
          : (<Link href="#" onClick={onClick}>{get(issue, ["title"])}</Link>)
        }
        marginBottom={10}
        icon={<LinearLogo/>}
        link={get(issue, ["url"])}
      />
      <TwoProperties
        leftLabel="Team"
        leftText={<Team team={get(issue, ["team"])}/>}
        rightLabel="Issue ID"
        rightText={get(issue, ["identifier"])}
      />
      <TwoProperties
        leftLabel="Status"
        leftText={<Status state={get(issue, ["state"])}/>}
        rightLabel="Priority"
        rightText={(
          <Priority
            priority={get(issue, ["priority"])}
            priorityLabel={get(issue, ["priorityLabel"])}
          />
        )}
      />
      <TwoProperties
        leftLabel="Due Date"
        leftText={format(parse(get(issue, ["dueDate"])))}
        rightLabel="Deskpro Tickets"
        rightText={<DeskproTickets<Issue["id"]> entityId={get(issue, ["id"])}/>}
      />
      {assigneeName && (
        <Property
          label="Assignee"
          text={(
            <Member
              name={assigneeName}
              avatarUrl={get(issue, ["assignee", "avatarUrl"])}
            />
          )}
        />
      )}
      {!isEmpty(labels) && (
        <Property
          label="Labels"
          text={(
            <Stack gap={6} wrap="wrap">
              {(labels).map((label) => (
                <IssueLabel
                  key={label.id}
                  name={label.name}
                  color={label.color}
                />
              ))}
            </Stack>
          )}
        />
      )}
      {error && <ErrorBlock text={error} />}
      {relationships?.length > 0 && (
        <Property
          label='Relationships'
          text={
            <div style={{display: 'flex', flexDirection: 'column'}}>
              {relationships.map(relationship => <RelationshipItem key={relationship.id} relation={relationship} />)}
            </div>
          }
        />
      )}
    </>
  );
};

export { IssueItem };