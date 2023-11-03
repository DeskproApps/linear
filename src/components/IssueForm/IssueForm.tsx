import has from "lodash/has";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Stack } from "@deskpro/deskpro-ui";
import { LoadingSpinner, Select, DateInput } from "@deskpro/app-sdk";
import { useFormDeps } from "./hooks";
import {
  Label,
  Button,
  TextArea,
  FieldHint,
  ErrorBlock,
} from "../common";
import { getInitValues, validationSchema } from "./utils";
import type { FC } from "react";
import type { FormValidationSchema, Props } from "./types";
import type {
  Team,
  Issue,
  Member,
  IssueLabel,
  IssuePriorityValue,
} from "../../services/linear/types";

const IssueForm: FC<Props> = ({
  issue,
  error,
  onSubmit,
  onCancel,
  isEditMode,
}) => {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValidationSchema>({
    defaultValues: getInitValues(issue),
    resolver: zodResolver(validationSchema),
  });
  const {
    isLoading,
    teamOptions,
    labelOptions,
    statusOptions,
    priorityOptions,
    assigneeOptions,
  } = useFormDeps(watch("team"));

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <ErrorBlock text={error}/>}

      <Label htmlFor="team" label="Team" required>
        <Select
          id="team"
          disabled={isEditMode}
          initValue={watch("team")}
          options={teamOptions}
          error={has(errors, ["team", "message"])}
          onChange={(value) => setValue("team", value as Team["id"])}
        />
      </Label>

      <Label htmlFor="title" label="Title" required>
        <Input
          id="title"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["title", "message"])}
          value={watch("title")}
          {...register("title")}
        />
      </Label>

      <Label htmlFor="description" label="Description">
        <TextArea
          variant="inline"
          id="description"
          minHeight="auto"
          placeholder="Enter value"
          value={watch("description")}
          error={has(errors, ["description", "message"])}
          {...register("description")}
        />
        <FieldHint>Markdown formatting is supported</FieldHint>
      </Label>

      <Label htmlFor="status" label="Status">
        <Select
          id="status"
          initValue={watch("status")}
          options={statusOptions}
          error={has(errors, ["status", "message"])}
          onChange={(value) => setValue("status", value as Issue["state"]["id"])}
        />
      </Label>

      <Label htmlFor="priority" label="Priority">
        <Select<IssuePriorityValue["priority"]>
          id="priority"
          initValue={watch("priority")}
          options={priorityOptions}
          error={has(errors, ["priority", "message"])}
          onChange={(value) => setValue("priority", value as IssuePriorityValue["priority"])}
        />
      </Label>

      <Label htmlFor="dueDate" label="Due Date">
        <DateInput
          id="dueDate"
          placeholder="DD/MM/YYYY"
          value={watch("dueDate") as Date}
          error={has(errors, ["dueDate", "message"])}
          onChange={(date: [Date]) => setValue("dueDate", date[0])}
        />
      </Label>

      <Label htmlFor="assignee" label="Assignee">
        <Select
          id="assignee"
          initValue={watch("assignee")}
          options={assigneeOptions}
          error={has(errors, ["assignee", "message"])}
          onChange={(value) => setValue("assignee", value as Member["id"])}
        />
      </Label>

      <Label htmlFor="labels" label="Labels">
        <Select<IssueLabel["id"]>
          id="labels"
          initValue={watch("labels")}
          closeOnSelect={false}
          showInternalSearch
          options={labelOptions}
          error={has(errors, ["labels", "message"])}
          onChange={(value) => setValue("labels", value as Array<IssueLabel["id"]>)}
        />
      </Label>

      <Stack justify="space-between">
        <Button
          type="submit"
          text={isEditMode ? "Save" : "Create"}
          disabled={isSubmitting}
          loading={isSubmitting}
        />
        {onCancel && (
          <Button type="button" text="Cancel" intent="tertiary" onClick={onCancel}/>
        )}
      </Stack>
    </form>
  );
};

export { IssueForm };
