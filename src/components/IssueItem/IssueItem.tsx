import { useMemo, useCallback, useEffect } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { P5, Stack } from '@deskpro/deskpro-ui';
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
  InternalIconLink
} from "../common";
import type { FC, MouseEventHandler } from "react";
import type { Issue, Relation } from '../../services/linear/types';

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
  const relations = issue.relations as unknown as Relation[];

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
      {relations.length > 0 && (
        <Property
          label='Relationships'
          text={
            <div style={{display: 'flex', flexDirection: 'column'}}>
              {relations.map(relation => {
                let relationship = '';

                switch (relation.type) {
                  case 'related':
                    relationship = 'Related to';

                    break;

                  case 'blocks':
                    relationship = 'Blocks';
                    
                    break;
                };

                return (
                  <>
                    <P5>
                      {`${relationship} `}
                      <strong>{relation.relatedIssue.title}</strong>
                    </P5>
                    <P5 style={{display: 'flex'}}>
                      {`ID: ${relation.relatedIssue.identifier} `}
                      <InternalIconLink link={`/issues/view/${relation.relatedIssue.id}`} />
                    </P5>
                  </>
                );
              })}
            </div>
          }
        />
      )}
    </>
  );
};

export { IssueItem };