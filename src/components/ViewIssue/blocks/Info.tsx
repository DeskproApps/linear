import get from "lodash/get";
import size from "lodash/size";
import { useMemo } from "react";
import { Stack } from "@deskpro/deskpro-ui";
import { Title, Property } from "@deskpro/app-sdk";
import { format, parse } from "../../../utils/date";
import {
  Member,
  Markdown,
  IssueLabel,
  LinearLogo,
  DeskproTickets,
} from "../../common";
import type { FC } from "react";
import type { Maybe } from "../../../types";
import type { Issue } from "../../../services/linear/types";

export type Props = {
  issue: Maybe<Issue>,
};

const Info: FC<Props> = ({ issue }) => {
  const assigneeName = useMemo(() => {
    return get(issue, ["assignee", "name"])
      || get(issue, ["assignee", "displayName"])
      || get(issue, ["assignee", "email"]);
  }, [issue]);
  const labels = useMemo(() => get(issue, ["labels"], []) || [], [issue]);

  return (
    <>
      <Title
        title={get(issue, ["title"], "-")}
        marginBottom={10}
        icon={<LinearLogo/>}
        link={get(issue, ["url"])}
      />
      <Property label="issue ID" text={get(issue, ["identifier"])}/>
      <Property label="Status" text={get(issue, ["state", "name"])}/>
      <Property label="Priority" text={get(issue, ["priorityLabel"])}/>
      <Property label="Due Date" text={format(parse(get(issue, ["dueDate"])))}/>
      <Property
        label="Deskpro Tickets"
        text={<DeskproTickets<Issue["id"]> entityId={get(issue, ["id"])}/>}
      />
      <Property
        label="Description"
        text={(
          <Markdown text={get(issue, ["description"], "-") || "-"}/>
        )}
      />
      <Property
        label="Assignee"
        text={!assigneeName ? "-" : (
          <Member
            name={assigneeName}
            avatarUrl={get(issue, ["assignee", "avatarUrl"])}
          />
        )}
      />
      <Property
        label="Labels"
        text={(
          <Stack gap={6}>
            {!size(labels) ? "-" : labels.map((label) => (
              <IssueLabel
                key={label.id}
                name={label.name}
                color={label.color}
              />
            ))}
          </Stack>
        )}
      />
    </>
  )
};

export { Info };