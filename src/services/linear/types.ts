import type {
  Comment,
  WorkflowState as WorkflowStateGQL,
  Team as TeamGQL,
  User as UserSQL,
  Issue as IssueGQL,
  CommentCreateInput,
  IssueLabel as IssueLabelGQL,
  IssueCreateInput as IssueCreateInputGQL,
  IssueUpdateInput as IssueUpdateInputGQL,
  IssuePriorityValue as IssuePriorityValueGQL,
  IssueLabelCreateInput as IssueLabelCreateInputGQL,
} from "./GraphQLSchemas";

export type Response<T> = Promise<T>;

export type GQL<T> = { data: T };

export enum LinearErrorType {
  FeatureNotAccessible = "FeatureNotAccessible",
  InvalidInput = "InvalidInput",
  Ratelimited = "Ratelimited",
  NetworkError = "NetworkError",
  AuthenticationError = "AuthenticationError",
  Forbidden = "Forbidden",
  BootstrapError = "BootstrapError",
  Unknown = "Unknown",
  InternalError = "InternalError",
  Other = "Other",
  UserError = "UserError",
  GraphqlError = "GraphqlError",
  LockTimeout = "LockTimeout",
}

export type LinearRESTError = {
  error: string,
  error_description: string,
};

export type LinerGraphQLError = {
  errors: Array<{
    message: string,
    extensions: {
      type: LinearErrorType,
      meta: object,
      userError: boolean,
    },
    locations: Array<{ line: number, column: number }>,
  }>,
};

export type LinearAPIError = LinearRESTError|LinerGraphQLError;

export type AccessToken = {
  token_type: "Bearer",
  access_token: string,
  expires_in: number,
  scope: string[],
};

export type User = {
  viewer: {
    id: string,
    name: string,
    email: string,
  },
};

export type IssueComment = Comment;

export type IssueCommentCreateInput = Pick<CommentCreateInput, "body"|"issueId">;

export type IssuePriorityValue = IssuePriorityValueGQL;

export type IssueLabel = IssueLabelGQL;

export type Member = UserSQL;

export type Issue = Omit<IssueGQL, "labels"|"children"|"comments"> & {
  labels: IssueLabel[],
  children: Issue[],
  comments: IssueComment[],
};

export type WorkflowState = WorkflowStateGQL;

export type Team = Omit<TeamGQL, "states"|"labels"|"members"> & {
  states: WorkflowState[],
  labels: IssueLabel[],
  members: Member[],
  issuePriorityValues: IssuePriorityValue[],
};

export type IssueEditInput = Pick<
  IssueCreateInputGQL|IssueUpdateInputGQL,
  |"teamId"
  |"title"
  |"stateId"
  |"description"
  |"dueDate"
  |"priority"
  |"labelIds"
  |"assigneeId"
>;

export type IssueLabelInput = Pick<IssueLabelCreateInputGQL, "teamId"|"name"|"color">
