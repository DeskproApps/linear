import type { Issue as IssueGQL, IssueLabel } from "./GraphQLSchemas";

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

export type Issue = Omit<IssueGQL, "labels"> & {
  labels: IssueLabel[],
};
