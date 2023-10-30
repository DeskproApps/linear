import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../../testing";
import { Buttons } from "../Buttons";
import type { Props } from "../Buttons";

const renderButtons = (props?: Partial<Props>) => render((
  <Buttons
    selectedIssues={props?.selectedIssues || []}
    onCancel={props?.onCancel || jest.fn()}
    onLinkIssues={props?.onLinkIssues || jest.fn()}
    isSubmitting={props?.isSubmitting || false}
  />
), { wrappers: { theme: true } });

describe("LinkIssues", () => {
  describe("Buttons", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByRole } = renderButtons();

      const linkButton = await findByRole("button", { name: "Link Issues" });
      const cancelButton = await findByRole("button", { name: "Cancel" });

      expect(linkButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });

    test("should click \"link issues\"", async () => {
      const onLinkCards = jest.fn();

      const { findByRole } = renderButtons({
        selectedIssues:[{} as never],
        onLinkIssues: onLinkCards,
      });

      const linkButton = await findByRole("button", { name: "Link Issues" });

      await userEvent.click(linkButton as Element);

      expect(onLinkCards).toBeCalledTimes(1);
    });

    test("should click \"Cancel\"", async () => {
      const mockOnCancel = jest.fn();

      const { findByRole } = renderButtons({ onCancel: mockOnCancel });

      const cancelButton = await findByRole("button", { name: "Cancel" });

      await userEvent.click(cancelButton as Element);

      expect(mockOnCancel).toBeCalledTimes(1);
    });
  });
});
