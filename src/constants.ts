import { lightTheme } from "@deskpro/deskpro-ui";

/** Typo */
export const nbsp = "\u00A0";

/** Date */
export const DATE_FORMAT = "dd MMM, yyyy";

export const TIME_FORMAT = "H:mm";

export const DATE_ON = "yyyy-MM-dd";

/** Deskpro */
export const APP_PREFIX = "linear";

export const ENTITY = "linkedLinearIssue";

export const DEFAULT_ERROR = "There was an error!";

export const ACCESS_TOKEN_PATH = "oauth2/access_token";

export const placeholders = {
  ACCESS_TOKEN: `[user[${ACCESS_TOKEN_PATH}]]`,
  CLIENT_ID: "__client_id__",
  CLIENT_SECRET: "__client_secret__",
};

export const DESKPRO_LABEL = {
  name: "Deskpro",
  color: lightTheme.colors.brandSecondary,
};

export const GLOBAL_CLIENT_ID = '84426e34c22e0b0b63eb05f3987fc2d4';

/** Linear */
export const GRAPHQL_URL = "https://api.linear.app/graphql";
export const AUTH_URL = "https://api.linear.app/oauth";
