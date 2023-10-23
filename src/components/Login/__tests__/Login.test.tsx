import { cleanup } from "@testing-library/react";
import { render } from "../../../../testing";
import { Login } from "../Login";

describe("VerifySettings", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = render((
      <Login isLoading={true} authUrl="" onLogin={jest.fn()} />
    ), { wrappers: { theme: true }});

    expect(await findByText("Log into your Linear Account")).toBeInTheDocument();
    expect(await findByText("Log In")).toBeInTheDocument();
  });

  test("should render link with login url", async () => {
    const { getByRole } = render((
      <Login
        isLoading={false}
        authUrl="https://deskpro.test/callback"
        onLogin={jest.fn()}
      />
    ), { wrappers: { theme: true }});

    const link = getByRole("link");
    expect(link).toHaveAttribute("href", "https://deskpro.test/callback");
  });

  test("should show error", async () => {
    const { findByText } = render((
      <Login isLoading={false} authUrl="" onLogin={jest.fn()} error="some error" />
    ), { wrappers: { theme: true }});

    expect(await findByText("some error")).toBeInTheDocument();
  });
});
