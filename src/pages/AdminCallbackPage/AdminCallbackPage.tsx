import { FC, useState } from 'react';
import styled from "styled-components";
import { P1 } from "@deskpro/deskpro-ui";
import {
  LoadingSpinner,
  CopyToClipboardInput,
  useInitialisedDeskproAppClient,
  useDeskproLatestAppContext
} from "@deskpro/app-sdk";
import { getQueryParams } from '../../utils';
import type { Maybe, Settings } from '../../types';

export type Props = { callbackUrl?: Maybe<string> };

const Description = styled(P1)`
  margin-top: 8px;
  /* margin-bottom: 16px; */
  color: ${({ theme }) => theme.colors.grey80};
`;

export const AdminCallback: FC<Props> = ({ callbackUrl }) => {
  if (!callbackUrl) {
    return (<LoadingSpinner/>);
  }

  return (
    <>
      <CopyToClipboardInput value={callbackUrl} />
      <Description>The callback URL will be required during Linear app setup</Description>
    </>
  );
};

const AdminCallbackPage: FC = () => {
  const { context } = useDeskproLatestAppContext<unknown, Settings>();
  const [callbackUrl, setCallbackUrl] = useState<string|null>(null);

  useInitialisedDeskproAppClient(client => {
    const clientID = context?.settings.client_id;

    client.startOauth2Local(
      ({ callbackUrl, state }) => {
        setCallbackUrl(callbackUrl);

        return `https://linear.app/oauth/authorize?${getQueryParams({
          client_id: clientID ?? '',
          state,
          prompt: 'consent',
          scope: ['read', 'write'].join(','),
          response_type: 'code',
          redirect_uri: callbackUrl
        })}`
      },
      /code=(?<code>[0-9a-f]+)/,
      async () => ({data: {access_token: ''}}),
      {
        pollInterval: 10000,
        timeout: 600
      }
    );
  }, []);

  return (
    <AdminCallback callbackUrl={callbackUrl} />
  );
};

export { AdminCallbackPage };