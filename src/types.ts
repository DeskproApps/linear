import type { To, ParamKeyValuePair } from "react-router-dom";
import type { DropdownValueType } from "@deskpro/deskpro-ui";
import type { Context, IDeskproClient } from "@deskpro/app-sdk";
import type { Response, Issue, Team, Member } from "./services/linear/types";

/** Common types */
export type Maybe<T> = T | undefined | null;

export type Dict<T> = Record<string, T>;

export type Option<Value = unknown> = Omit<DropdownValueType<Value>, "subItems">;

/** An ISO-8601 encoded UTC date time string. Example value: `""2019-09-07T15:50:00Z"` */
export type DateTime = string;

/** Request types */
export type ApiRequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export type RequestParams = {
  url?: string,
  rawUrl?: string,
  method?: ApiRequestMethod,
  data?: Dict<string>|RequestInit["body"],
  headers?: Dict<string>,
  queryParams?: string|Dict<string>|ParamKeyValuePair[],
};

export type Request = <T>(
  client: IDeskproClient,
  params: RequestParams,
) => Response<T>;

/** Deskpro types */
export type Settings = {
  use_deskpro_saas: string,
  client_id: string,
  client_secret?: string,
  add_comment_when_linking?: boolean,
  default_comment_on_ticket_reply?: boolean,
  default_comment_on_ticket_note?: boolean,
  add_deskpro_label?: boolean,
};

export type TicketData = {
  ticket: {
    id: string,
    subject: string,
    permalinkUrl: string,
  },
};

export type TicketContext = Context<TicketData, Maybe<Settings>>;

export type NavigateToChangePage = { type: "changePage", path: To };

export type LogoutPayload = { type: "logout" };

export type UnlinkPayload = { type: "unlink", issue: Issue };

export type EventPayload =
  | NavigateToChangePage
  | LogoutPayload
  | UnlinkPayload
;

export type EntityMetadata = {
  id: Issue["id"],
  identifier: Issue["identifier"],
  title: Issue["title"],
  status: Issue["state"]["name"],
  priority: Issue["priorityLabel"],
  team: Team["name"],
  assignee?: Pick<Member, "name"|"displayName"|"email">,
};
