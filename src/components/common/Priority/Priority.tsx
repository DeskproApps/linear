import isNil from "lodash/isNil";
import { match } from "ts-pattern";
import { P5, Icon, Stack } from "@deskpro/deskpro-ui";
import { NoPriority, Low, Medium, High, Urgent } from "./icons";
import type { FC } from "react";
import type { Issue } from "../../../services/linear/types";

type Props = {
  /** The priority of the issue. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low. */
  priority?: Issue["priority"],
  /** Label for the priority. */
  priorityLabel?: Issue["priorityLabel"],
};

const Priority: FC<Props> = ({ priority, priorityLabel }) => {
  if (isNil(priority) || isNil(priorityLabel)) {
    return (
      <P5>-</P5>
    );
  }


  const icon = match(priority)
    .with(0, () => <NoPriority />)
    .with(1, () => <Urgent />)
    .with(2, () => <High />)
    .with(3, () => <Medium />)
    .with(4, () => <Low />)
    .otherwise(() => <NoPriority />);

  return (
    <Stack align="center" gap={6}>
      <Icon icon={icon}/>
      <P5>{priorityLabel}</P5>
    </Stack>
  );
};

export { Priority };
