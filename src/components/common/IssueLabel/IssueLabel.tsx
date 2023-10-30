import { Tag } from "@deskpro/deskpro-ui";
import type { FC } from "react";
import type { TagProps } from "@deskpro/deskpro-ui";

type Props = {
  name: TagProps["label"],
  color: TagProps["color"]["borderColor"],
  textColor?: TagProps["color"]["textColor"]
}

const IssueLabel: FC<Props> = ({ name, color, textColor }) => (
  <Tag
    color={{
      borderColor: color,
      backgroundColor: `${color}33`,
      textColor: textColor || color,
    }}
    label={name}
    withClose={false}
  />
);

export { IssueLabel };
