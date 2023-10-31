import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import get from "lodash/get";
import size from "lodash/size";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import {
  getEntityListService,
  setAccessTokenService,
} from "../../services/deskpro";
import {
  getAccessTokenService,
  getCurrentUserService,
} from "../../services/linear";
import { getQueryParams } from "../../utils";
import { DEFAULT_ERROR } from "../../constants";
import type { OAuth2StaticCallbackUrl } from "@deskpro/app-sdk";
import type { Maybe, TicketContext } from "../../types";

export type Result = {
  poll: () => void,
  authUrl: string|null,
  error: Maybe<string>,
  isLoading: boolean,
};

const useLogin = (): Result => {
  const key = useMemo(() => uuidv4(), []);
  const navigate = useNavigate();
  const [error, setError] = useState<Maybe<string>>(null);
  const [callback, setCallback] = useState<OAuth2StaticCallbackUrl|undefined>();
  const [authUrl, setAuthUrl] = useState<string|null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { client } = useDeskproAppClient();
  const clientId = useMemo(() => get(context, ["settings", "client_id"]), [context]);
  const ticketId = useMemo(() => get(context, ["data", "ticket", "id"]), [context]);

  useInitialisedDeskproAppClient(
    (client) => {
      client.oauth2()
        .getGenericCallbackUrl(key, /code=(?<token>[^&]+)/, /state=(?<key>[^&]+)/)
        .then(setCallback);
    },
    [setCallback]
  );

  useEffect(() => {
    if (callback?.callbackUrl) {
      setAuthUrl(`https://linear.app/oauth/authorize?${getQueryParams({
        response_type: "code",
        client_id: clientId,
        redirect_uri: callback.callbackUrl,
        scope: [
          "read",
          "issues:create",
          "comments:create"
        ].join(","),
        prompt: "consent",
        state: key,
      })}`);
    }
  }, [callback, clientId, key]);

  const poll = useCallback(() => {
    if (!client || !callback?.poll) {
      return;
    }

    setError(null);
    setTimeout(() => setIsLoading(true), 1000);

    callback.poll()
      .then(({ token }) => getAccessTokenService(client, token, callback.callbackUrl))
      .then(({ access_token }) => setAccessTokenService(client, access_token))
      .then(() => getCurrentUserService(client))
      .then(({ data }) => !get(data, ["viewer", "id"])
        ? Promise.reject()
        : getEntityListService(client, ticketId)
      )
      .then((entityIds) => navigate(size(entityIds) ? "/home" : "/issues/link"))
      .catch((err) => {
        setIsLoading(false);
        setError(get(err, ["data", "error_description"]) || DEFAULT_ERROR);
      });
  }, [client, callback, navigate, ticketId]);

  return { authUrl, poll, error, isLoading };
};

export { useLogin };
