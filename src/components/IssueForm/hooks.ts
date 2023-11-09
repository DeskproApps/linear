import { useMemo } from "react";
import get from "lodash/get";
import find from "lodash/find";
import sortBy from "lodash/sortBy";
import isEmpty from "lodash/isEmpty";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getTeamsService, getTeamMembersService } from "../../services/linear";
import { QueryKey } from "../../query";
import {
  getTeamOptions,
  getLabelOptions,
  getStatusOptions,
  getPriorityOptions,
  getAssigneeOptions,
} from "./utils";
import type { Team, Issue, IssuePriorityValue, IssueLabel, Member } from "../../services/linear/types";
import type { Option } from "../../types";

type UseFormDeps = (teamId?: Team["id"]) => {
  isLoading: boolean,
  teamOptions: Array<Option<Team["id"]>>,
  statusOptions: Array<Option<Issue["state"]["id"]>>,
  priorityOptions: Array<Option<IssuePriorityValue["priority"]>>,
  labelOptions: Array<Option<IssueLabel["id"]>>,
  assigneeOptions: Array<Option<Member["id"]>>,
};

const useFormDeps: UseFormDeps = (teamId) => {
  const teams = useQueryWithClient([QueryKey.TEAMS], getTeamsService);

  const assignees = useQueryWithClient(
    [QueryKey.TEAM_MEMBERS, teamId as Team["id"]],
    (client) => getTeamMembersService(client, teamId as Team["id"]),
    { enabled: Boolean(teamId) },
  );

  const { statuses, priorities, labels } = useMemo(() => {
    if (!teamId || isEmpty(teams.data)) {
      return { statuses: [], priorities: [], labels: [] };
    }

    const team = find(teams.data, { id: teamId });

    return {
      statuses: sortBy(get(team, ["states"], []) || [], ["position"]),
      priorities: get(team, ["issuePriorityValues"], []) || [],
      labels: get(team, ["labels"], []) || [],
    };
  }, [teamId, teams]);

  return {
    isLoading: [teams].some(({ isLoading }) => isLoading),
    teamOptions: useMemo(() => getTeamOptions(teams.data), [teams]),
    statusOptions: useMemo(() => getStatusOptions(statuses), [statuses]),
    priorityOptions: useMemo(() => getPriorityOptions(priorities), [priorities]),
    labelOptions: useMemo(() => getLabelOptions(labels), [labels]),
    assigneeOptions: useMemo(() => getAssigneeOptions(assignees.data), [assignees]),
  };
};

export { useFormDeps };
