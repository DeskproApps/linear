import { H3 } from "@deskpro/deskpro-ui";
import { Title } from "@deskpro/app-sdk";
import { nbsp } from "../../constants";
import { Container, AnchorButton, Invalid } from "../common";
import type { FC } from "react";
import type { Maybe } from "../../types";

export type Props = {
  authUrl: string|null,
  onLogin: () => void,
  isLoading: boolean,
  error?: Maybe<string>,
};

const Login: FC<Props> = ({ authUrl, onLogin, isLoading, error }) => (
  <Container>
    <Title as={H3} title="Log into your Linear Account" />
    <AnchorButton
      intent="secondary"
      text="Log In"
      target="_blank"
      href={authUrl || "#"}
      onClick={onLogin}
      loading={isLoading}
      disabled={!authUrl || isLoading}
    />
    {nbsp}
    {error && <Invalid>{error}</Invalid>}
  </Container>
);

export { Login };
