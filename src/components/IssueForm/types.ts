import { z } from "zod";
import { validationSchema } from "./utils";
import type { Maybe } from "../../types";
import type { Issue } from "../../services/linear/types";

export type FormValidationSchema = z.infer<typeof validationSchema>;

export type Props = {
  onSubmit: (values: FormValidationSchema) => Promise<void|Issue>,
  onCancel?: () => void,
  isEditMode?: boolean,
  error?: Maybe<string|string[]>,
  issue?: Maybe<Issue>,
};
