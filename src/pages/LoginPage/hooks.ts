import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
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
import { DEFAULT_ERROR, GLOBAL_CLIENT_ID } from '../../constants';
import type { Maybe, Settings, TicketData } from '../../types';

export type Result = {
  onLogIn: () => void,
  authUrl: string,
  error: Maybe<string>,
  isLoading: boolean,
};

const useLogin = (): Result => {
  const { context } = useDeskproLatestAppContext<TicketData, Settings>();
  const callbackURLRef = useRef('');
  const navigate = useNavigate();
  const [error, setError] = useState<Maybe<string>>(null);
  const [authUrl, setAuthUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useInitialisedDeskproAppClient(async client => {
    if (context?.settings.use_deskpro_saas === undefined) return;

    const clientID = context.settings.client_id;
    const ticketID = context.data?.ticket.id;
    const mode = context?.settings.use_deskpro_saas ? 'global' : 'local';

    if (mode === 'local' && typeof clientID !== 'string') return;

    const oauth2 = mode === 'global' ? await client.startOauth2Global(GLOBAL_CLIENT_ID) : await client.startOauth2Local(
      ({ callbackUrl, state }) => {
        callbackURLRef.current = callbackUrl;

        return `https://linear.app/oauth/authorize?${getQueryParams({
          client_id: clientID,
          state,
          prompt: 'consent',
          scope: ['read', 'write'].join(','),
          response_type: 'code',
          redirect_uri: callbackUrl
        })}`;
      },
      /code=(?<code>[0-9a-f]+)/,
      async code => {
        const { access_token } = await getAccessTokenService(client, code, callbackURLRef.current);

        return {
          data: { access_token }
        };
      }
    );

    setAuthUrl(oauth2.authorizationUrl);
    setError(null);

    try {
      const pollResult = await oauth2.poll();

      await setAccessTokenService(client, pollResult.data.access_token);

      const user = await getCurrentUserService(client);

      if (!user.data.viewer.id) {
        throw new Error('User ID Not Found');
      };

      const entityIDs = await getEntityListService(client, ticketID ?? '');

      navigate(entityIDs.length ? '/home' : '/issues/link');
    } catch (error) {
      setError(error instanceof Error ? error.message : DEFAULT_ERROR);
    } finally {
      setIsLoading(false);
    };
  }, [context, navigate]);

  const onLogIn = useCallback(() => {
    setIsLoading(true);
    window.open(authUrl, '_blank');
  }, [setIsLoading, authUrl]);

  return { authUrl, onLogIn, error, isLoading };
};

export { useLogin };