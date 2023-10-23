import { Stack } from "@deskpro/deskpro-ui";
import { DEFAULT_ERROR } from "../../constants";
import { LinearError } from "../../services/linear";
import { Container, ErrorBlock } from "../common";
import type { FC } from "react";
import type { FallbackProps } from "react-error-boundary";

type Props = Omit<FallbackProps, "error"> & {
  error: Error,
};

const ErrorFallback: FC<Props> = ({ error }) => {
  const message = DEFAULT_ERROR;

  // eslint-disable-next-line no-console
  console.error(error);

  if (error instanceof LinearError) {
    //..
  }

  return (
    <Container>
      <ErrorBlock
        text={(
          <Stack gap={6} vertical style={{padding: "8px"}}>
            {message}
          </Stack>
        )}
      />
    </Container>
  );
};

export { ErrorFallback };
