import { useQueryWithClient } from "@deskpro/app-sdk";
import { getTeamStatesService } from "../../services/linear";
import { sortStates } from "../../utils";
import { QueryKey } from "../../query";
import type { Team, WorkflowState } from "../../services/linear/types";

type UseIssueDeps = (teamId?: Team["id"]) => {
  isLoading: boolean,
  states: WorkflowState[],
};

const useIssueDeps: UseIssueDeps = (teamId) => {
  const states = useQueryWithClient(
    [QueryKey.TEAM_STATES, teamId as Team["id"]],
    (client) => getTeamStatesService(client, teamId as Team["id"]),
    { enabled: Boolean(teamId) },
  );

  return {
    isLoading: [states].some(({ isLoading }) => isLoading),
    states: sortStates(states.data),
  };
};

export { useIssueDeps };
