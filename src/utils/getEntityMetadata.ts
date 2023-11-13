import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import type { EntityMetadata } from "../types";
import type { Issue } from "../services/linear/types";

const getEntityMetadata = (
  issue?: Issue,
): undefined|EntityMetadata => {
  if (isEmpty(issue)) {
    return;
  }

  const assignee = get(issue, ["assignee", "name"])
    || get(issue, ["assignee", "displayName"])
    || get(issue, ["assignee", "email"]);

  return {
    id: get(issue, ["id"], ""),
    identifier: get(issue, ["identifier"], ""),
    title: get(issue, ["title"], ""),
    status: get(issue, ["state", "name"]),
    priority: get(issue, ["priorityLabel"], ""),
    team: get(issue, ["team", "name"]),
    ...(!assignee ? {} : {
      assignee: {
        name: get(issue, ["assignee", "name"]) || "",
        displayName: get(issue, ["assignee", "displayName"]) || "",
        email: get(issue, ["assignee", "email"]) || "",
      }
    }),
  };
};

export { getEntityMetadata };
