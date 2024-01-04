import size from "lodash/size";
import sortBy from "lodash/sortBy";
import filter from "lodash/filter";
import type { WorkflowState } from "../services/linear/types";

const sortStates = (
  states?: WorkflowState[],
): WorkflowState[] => {
  if (!Array.isArray(states) || !size(states)) {
    return [];
  }

  const backlog = filter(states, { type: "backlog" });
  const started = filter(states, { type: "started" });
  const canceled = filter(states, { type: "canceled" });
  const unstarted = filter(states, { type: "unstarted" });
  const completed = filter(states, { type: "completed" });

  return [
    ...sortBy(backlog, ["position"]),
    ...sortBy(unstarted, ["position"]),
    ...sortBy(started, ["position"]),
    ...sortBy(completed, ["position"]),
    ...sortBy(canceled, ["position"]),
  ];
};

export { sortStates };
