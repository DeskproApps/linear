import React from "react";
import styled from "styled-components";
import ReactTimeAgo from "react-time-ago";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Avatar, P11, Stack } from "@deskpro/deskpro-ui";
import { Markdown } from "../Markdown";
import type { FC } from "react";
import type { AnyIcon, AvatarProps, ImageAvatarProps } from "@deskpro/deskpro-ui";
import type { Maybe } from "../../../types";
import { DeskproAppTheme } from "@deskpro/app-sdk";

const TimeAgo = styled(ReactTimeAgo) <DeskproAppTheme>`
  color: ${({ theme }) => theme.colors.grey80};
`;

const Author = styled(Stack)`
  width: 35px;
`;

const Body = styled.div`
  width: calc(100% - 35px);
`;

type Props = {
  name: AvatarProps["name"],
  text: string,
  date?: Maybe<Date>,
  avatarUrl?: ImageAvatarProps["imageUrl"],
};

const Comment: FC<Props> = ({ name, avatarUrl, text, date }) => {
  return (
    <Stack wrap="nowrap" gap={6} style={{ marginBottom: 10 }}>
      <Author vertical>
        <Avatar
          size={18}
          name={name}
          backupIcon={faUser as AnyIcon}
          imageUrl={avatarUrl}
        />
        {date && (
          <P11>
            <TimeAgo date={date} timeStyle="mini" />
          </P11>
        )}
      </Author>
      <Body>
        <Markdown text={text} />
      </Body>
    </Stack>
  );
};

export { Comment };
