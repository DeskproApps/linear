import { createElement } from "react";
import get from "lodash/get";
import map from "lodash/map";
import size from "lodash/size";
import { z } from "zod";
import { DATE_ON } from "../../constants";
import { getOption } from "../../utils";
import { parse, format } from "../../utils/date";
import { IssueLabel, Member } from "../common";
import type { Maybe } from "../../types";
import type {
  Issue,
  IssueEditInput,
  IssuePriorityValue,
  Member as MemberType,
  IssueLabel as IssueLabelType,
} from "../../services/linear/types";
import type { FormValidationSchema } from "./types";

const validationSchema = z.object({
  team: z.string().min(1),
  title: z.string().min(1),
  status: z.string(),
  priority: z.number(),
  dueDate: z.date().optional(),
  description: z.string().optional(),
  assignee: z.string().optional(),
  labels: z.array(z.string()),
});

const getInitValues = (issue?: Maybe<Issue>): FormValidationSchema => {
  const labels = get(issue, ["labels"], []) || [];

  return {
    team: get(issue, ["team", "id"]) || "",
    title: get(issue, ["title"]) || "",
    status: get(issue, ["state", "id"]) || "",
    priority: get(issue, ["priority"]) || 0,
    dueDate: parse(get(issue, ["dueDate"])) || undefined,
    description: get(issue, ["description"]) || "",
    assignee: get(issue, ["assignee", "id"]) || "",
    labels: map(labels, "id"),
  };
};

const getIssueValues = (values: FormValidationSchema): IssueEditInput => {
  const dueDate = get(values, ["dueDate"]) || null;
  return {
    teamId: get(values, ["team"]),
    title: get(values, ["title"]),
    priority: get(values, ["priority"]) || 0,
    description: get(values, ["description"]) || "",
    labelIds: get(values, ["labels"], []) || [],
    stateId: get(values, ["status"]) || null,
    assigneeId: get(values, ["assignee"]) || null,
    dueDate: !dueDate ? null : format(dueDate, DATE_ON),
  };
};

const getPriorityOptions = (priorities?: IssuePriorityValue[]) => {
  if (!Array.isArray(priorities) || !size(priorities)) {
    return [];
  }

  return priorities.map((priority) => {
    return getOption(priority.priority, priority.label);
  });
};

const getLabelOptions = (labels?: IssueLabelType[]) => {
  if (!Array.isArray(labels) || !size(labels)) {
    return [];
  }

  return labels.map((label) => getOption(
    label.id,
    createElement(IssueLabel, {
      key: label.id,
      name: label.name,
      color: label.color,
    }),
    label.name,
  ));
};

const getAssigneeOptions = (members?: MemberType[]) => {
  if (!Array.isArray(members) || !size(members)) {
    return [];
  }

  return members.map((member) => {
    const fullName = get(member, ["name"])
      || get(member, ["displayName"])
      || get(member, ["email"]);
    const label = createElement(Member, {
      key: member.id,
      name: fullName,
      avatarUrl: get(member, ["avatarUrl"]),
    });
    return getOption(member.id, label, fullName);
  });
};

export {
  getInitValues,
  getIssueValues,
  getLabelOptions,
  validationSchema,
  getPriorityOptions,
  getAssigneeOptions,
};