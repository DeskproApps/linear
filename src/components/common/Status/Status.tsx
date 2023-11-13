import { match } from "ts-pattern";
import { P5, Icon, Stack } from "@deskpro/deskpro-ui";
import {
  Backlog,
  Started,
  Canceled,
  Unstarted,
  Completed,
} from "./icons";
import type { FC } from "react";
import type { WorkflowState } from "../../../services/linear/types";

type Props = {
  state?: Partial<WorkflowState>,
};

const Status: FC<Props> = ({ state }) => {
  if (!state) {
    return (
      <P5>-</P5>
    );
  }

  const { name, type, color } = state;

  const icon = match(type)
    .with("backlog", () => <Backlog color={color} />)
    .with("started", () => <Started color={color}/>)
    .with("canceled", () => <Canceled color={color}/>)
    .with("unstarted", () => <Unstarted color={color}/>)
    .with("completed", () => <Completed color={color}/>)
    .otherwise(() => <Backlog color={color}/>);

  return (
    <Stack align="center" gap={6}>
      {icon && <Icon icon={icon}/>}
      {name && <P5>{name}</P5>}
    </Stack>
  );
};

export { Status };
