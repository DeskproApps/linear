import { useCallback, useMemo } from "react";
import get from "lodash/get";
import map from "lodash/map";
import noop from "lodash/noop";
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import {
  updateIssueService,
  getTeamLabelsService,
  createIssueLabelService,
} from "../services/linear";
import { findDeskproLabel } from "../utils";
import { DESKPRO_LABEL } from "../constants";
import type { TicketContext } from "../types";
import type { Issue } from "../services/linear/types";

type UseDeskproLabel = () => {
  addDeskproLabel: (issue: Issue) => Promise<void|{ data: void }>,
  removeDeskproLabel: (issue: Issue) => Promise<void|{ data: void }>,
};

const useDeskproLabel: UseDeskproLabel = () => {
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };

  const isAddDeskproLabel = useMemo(() => {
    return get(context, ["settings", "add_deskpro_label"]) === true
  }, [context]);

  const addDeskproLabel = useCallback((issue: Issue) => {
    if (!client || !isAddDeskproLabel || isEmpty(issue)) {
      return Promise.resolve();
    }

    return getTeamLabelsService(client, get(issue, ["team", "id"]))
      .then((labels) => {
        const deskproLabel = findDeskproLabel(labels);
        return deskproLabel
          ? Promise.resolve(deskproLabel)
          : createIssueLabelService(client, { teamId: issue.team.id, ...DESKPRO_LABEL });
      })
      .then((deskproLabel) => {
        const labelIds = [...map(issue.labels, "id"), deskproLabel.id];
        return updateIssueService(client, issue.id, { labelIds })
      })
      .catch(noop);
  }, [client, isAddDeskproLabel]);

  const removeDeskproLabel = useCallback((issue: Issue) => {
    if (!client || !isAddDeskproLabel) {
      return Promise.resolve();
    }

    const deskproLabel = findDeskproLabel(issue.labels);
    const labelIds = !deskproLabel
      ? map(issue.labels, "id")
      : map(filter(issue.labels, ({ id }) => id !== deskproLabel?.id), "id");

    return (!deskproLabel
        ? Promise.resolve()
        : updateIssueService(client, issue.id, { labelIds })
    )
      .catch(noop)
  }, [client, isAddDeskproLabel]);

  return { addDeskproLabel, removeDeskproLabel };
};

export { useDeskproLabel };
