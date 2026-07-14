import styled from "styled-components";
import get from "lodash/get";
import toLower from "lodash/toLower";
import { P5, Icon, Stack } from "@deskpro/deskpro-ui";
import { icons } from "./icons";
import type { FC } from "react";
import type { AnyIcon } from "@deskpro/deskpro-ui";
import type { Issue } from "../../../services/linear/types";

type Props = {
  team?: Issue["team"],
};

const TeamIcon = styled(Icon)<{ color: string }>`
  color: ${({ color }) => color};
`;

const OverflowText = styled(P5)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Team: FC<Props> = ({ team }) => {
  const { name, icon, color } = team || {};

  if (!name || !icon || !color) {
    return (
      <P5>-</P5>
    );
  }

  const teamIcon = get(icons, toLower(icon));

  return (
    <Stack align="center" gap={6} >
      {teamIcon && <TeamIcon icon={teamIcon as AnyIcon} size={12} color={color} />}
      <OverflowText>{name}</OverflowText>
    </Stack>
  );
};

export { Team };
