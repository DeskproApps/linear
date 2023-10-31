import styled from "styled-components";
import { Label1 } from "@deskpro/deskpro-ui";

const FieldHint = styled(Label1)`
  color: ${({ theme }) => theme.colors.grey80};
`;

export { FieldHint };
