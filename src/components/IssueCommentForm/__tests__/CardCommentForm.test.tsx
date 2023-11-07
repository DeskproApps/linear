import get from "lodash/get";
import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../testing";
import { IssueCommentForm } from "../IssueCommentForm";
import type { Props } from "../types";

const renderIssueCommentForm = (props?: Partial<Props>) => render((
  <IssueCommentForm
    onSubmit={get(props, ["onSubmit"], jest.fn())}
    onCancel={get(props, ["onCancel"], jest.fn())}
    error={get(props, ["error"], null)}
  />
), { wrappers: { theme: true } });

describe("IssueCommentForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderIssueCommentForm();

    expect(await findByText("New comment")).toBeInTheDocument();
    expect(await findByText("Add")).toBeVisible();
    expect(await findByText("Cancel")).toBeVisible();
  });

  test("should should navigate to issue details", async () => {
    const mockOnCancel = jest.fn();
    const { findByRole } = renderIssueCommentForm({ onCancel: mockOnCancel });
    const cancelButton = await findByRole("button", { name: /Cancel/i });

    await userEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  test("render error", async () => {
    const { findByText } = renderIssueCommentForm({ error: "some error" })
    expect(await findByText("some error")).toBeInTheDocument();
  });
});
