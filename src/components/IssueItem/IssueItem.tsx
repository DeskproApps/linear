import { useMemo, useCallback } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { Stack } from "@deskpro/deskpro-ui";
import { Title, Link, Property, TwoProperties } from "@deskpro/app-sdk";
import { parse, format } from "../../utils/date";
import { LinearLogo, DeskproTickets, IssueLabel, Member } from "../common";
import type { FC, MouseEventHandler } from "react";
import type { Issue } from "../../services/linear/types";

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
        leftLabel="issue ID"
        leftText={get(issue, ["identifier"])}
        rightLabel="Status"
        rightText={get(issue, ["state", "name"])}
      />
      <TwoProperties
        leftLabel="Priority"
        leftText={get(issue, ["priorityLabel"])}
        rightLabel="Due Date"
        rightText={format(parse(get(issue, ["dueDate"])))}
      />
      <Property
        label="Deskpro Tickets"
        text={<DeskproTickets<Issue["id"]> entityId={get(issue, ["id"])}/>}
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
            <Stack gap={6}>
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
    </>
  );
};

export { IssueItem };
