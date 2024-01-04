import find from "lodash/find";
import toLower from "lodash/toLower";
import { DESKPRO_LABEL } from "../constants";
import type { Maybe } from "../types";
import type { IssueLabel } from "../services/linear/types";

const findDeskproLabel = (labels: IssueLabel[]): Maybe<IssueLabel> => {
  if (!Array.isArray(labels)) {
    return;
  }

  return find(labels, ({ name }) => toLower(name) === toLower(DESKPRO_LABEL.name));
};

export { findDeskproLabel };
