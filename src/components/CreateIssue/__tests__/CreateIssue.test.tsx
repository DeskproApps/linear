import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../testing";
import { CreateIssue } from "../CreateIssue";
import type { Props } from "../CreateIssue";

const renderCreateIssue = (props?: Partial<Props>) => render((
  <CreateIssue
    onSubmit={props?.onSubmit || jest.fn()}
    onCancel={props?.onCancel || jest.fn()}
    isEditMode={props?.isEditMode || false}
    error={props?.error || null}
    onNavigateToLink={props?.onNavigateToLink || jest.fn()}
  />
), { wrappers: { theme: true, router: true, query: true } });

describe("CreateIssue", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should navigate to \"link issue\" page", async () => {
    const mockOnNavigateToLink = jest.fn();
    const { findByRole } = renderCreateIssue({ onNavigateToLink: mockOnNavigateToLink });

    const findButton = await findByRole("button", { name: "Find Issue" });
    await userEvent.click(findButton);

    expect(mockOnNavigateToLink).toHaveBeenCalled();
  });
});
