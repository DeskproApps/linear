import { cleanup } from "@testing-library/react";
import { render } from "../../../../testing";
import { Login } from "../Login";
import type { Props } from "../Login";

const renderLogin = (props?: Partial<Props>) => render((
  <Login
    authUrl={props?.authUrl || ""}
    onLogin={props?.onLogin || jest.fn()}
    isLoading={props?.isLoading || false}
    error={props?.error || null}
  />
), { wrappers: { theme: true } });

describe("VerifySettings", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderLogin();

    expect(await findByText("Log into your Linear Account")).toBeInTheDocument();
    expect(await findByText("Log In")).toBeInTheDocument();
  });

  test("should render link with login url", async () => {
    const { getByRole } = renderLogin({ authUrl: "https://deskpro.test/callback" });
    const link = getByRole("link");

    expect(link).toHaveAttribute("href", "https://deskpro.test/callback");
  });

  test("should show error", async () => {
    const { findByText } = renderLogin({ error: "some error" });
    expect(await findByText("some error")).toBeInTheDocument();
  });
});
