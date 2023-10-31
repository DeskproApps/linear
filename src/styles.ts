import { css } from "styled-components";

export const dpNormalize = css`
  p {
    margin-top: 0;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p:first-child,
  ol:first-child,
  ul:first-child {
    margin-top: 0;
  }

  img {
    width: 100%;
    height: auto;
  }

  a, a:hover {
    color: ${({ theme }) => theme.colors.cyan100};
  }
`;
