import { Fragment } from "react";
import get from "lodash/get";
import size from "lodash/size";
import { Title, HorizontalDivider } from "@deskpro/app-sdk";
import { Comment } from "../../common";
import type { FC } from "react";
import type { IssueComment } from "../../../services/linear/types";

export type Props = {
  comments: IssueComment[],
};

const Comments: FC<Props> = ({ comments }) => {
  return (
    <>
      <Title title={`Comments (${size(comments)})`}/>

      {comments.map(({ id, user, createdAt, body }) => (
        <Fragment key={id}>
          <Comment
            name={get(user, ["name"]) || get(user, ["displayName"]) || get(user, ["email"])}
            avatarUrl={get(user, ["avatarUrl"]) as string}
            date={new Date(createdAt)}
            text={body}
          />
          <HorizontalDivider style={{ marginBottom: 10 }} />
        </Fragment>
      ))}
    </>
  );
};

export { Comments };
