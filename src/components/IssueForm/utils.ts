import { createElement } from "react";
import get from "lodash/get";
import size from "lodash/size";
import { z } from "zod";
import { getOption } from "../../utils";
import { IssueLabel, Member } from "../common";
import type {
  Member as MemberType,
  IssueLabel as IssueLabelType,
  IssueCreateInput,
  IssuePriorityValue,
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

const getInitValues = (): FormValidationSchema => {
  return {
    team: "",
    title: "",
    status: "",
    priority: 0,
    dueDate: undefined,
    description: "",
    assignee: "",
    labels: [],
  };
};

const getIssueValues = (values: FormValidationSchema): IssueCreateInput => {
  return {
    teamId: get(values, ["team"]),
    title: get(values, ["title"]),
    priority: get(values, ["priority"], 0) || 0,
    description: get(values, ["description"], "") || "",
    labelIds: get(values, ["labels"], []) || [],
    ...(!values?.status ? {} : { stateId: values.status }),
    ...(!values?.dueDate ? {} : { dueDate: values.dueDate }),
    ...(!values?.assignee ? {} : { assigneeId: values.assignee }),
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
