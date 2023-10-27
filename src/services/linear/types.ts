export type Response<T> = Promise<T>;

export type GQL<T> = { data: T };

export type LinearAPIError = {
  error: string,
  error_description: string,
};

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
