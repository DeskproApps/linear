import { z } from "zod";
import get from "lodash/get";
import type { IssueCommentCreateInput } from "../../services/linear/types";
import type { FormValidationSchema } from "./types";

const validationSchema = z.object({
  comment: z.string().min(1),
});

const getInitValues = () => ({
  comment: "",
});

const getValues = (data: FormValidationSchema): IssueCommentCreateInput => ({
  body: get(data, ["comment"]) || "",
});

export {
  getValues,
  getInitValues,
  validationSchema,
};
