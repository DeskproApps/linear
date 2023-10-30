import size from "lodash/size";
import { Stack } from "@deskpro/deskpro-ui";
import { Button } from "../../common";
import type { FC } from "react";
import type { Issue } from "../../../services/linear/types";

export type Props = {
  isSubmitting: boolean,
  onCancel: () => void,
  selectedIssues: Issue[],
  onLinkIssues: () => void,
};

const Buttons: FC<Props> = ({ isSubmitting, selectedIssues, onLinkIssues, onCancel }) => (
  <Stack justify="space-between">
    <Button
      type="button"
      text="Link Issues"
      disabled={!size(selectedIssues) || isSubmitting}
      loading={isSubmitting}
      onClick={onLinkIssues}
    />
    <Button
      type="button"
      text="Cancel"
      intent="secondary"
      onClick={onCancel}
    />
  </Stack>
);

export { Buttons };
