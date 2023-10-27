import { cleanup } from "@testing-library/react";
import { render } from "../../../../testing";
import { AdminCallback } from "../AdminCallbackPage";
import type { Props } from "../AdminCallbackPage";

const renderAdminCallback = (props?: Partial<Props>) => render((
  <AdminCallback callbackUrl={props?.callbackUrl} />
), { wrappers: { theme: true } });

describe("AdminCallback", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { getByRole, findByText } = renderAdminCallback({
      callbackUrl: "https://deskpro.test/callback",
    });
    const callbackInput = getByRole("textbox");

    expect(callbackInput).toHaveValue("https://deskpro.test/callback");
    expect(await findByText(/The callback URL will be required during Linear app setup/i)).toBeInTheDocument();
  });

  test("should show the loader if there is no URL", async () => {
    const { findByText } = renderAdminCallback();
    expect(await findByText(/Loading.../i)).toBeInTheDocument();
  });
});
