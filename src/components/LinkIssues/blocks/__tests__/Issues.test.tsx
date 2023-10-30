import { cleanup } from "@testing-library/react";
import { render, mockIssue  } from "../../../../../testing";
import { normalize } from "../../../../utils";
import { Issues } from "../Issues";
import type { Props } from "../Issues";

const renderIssues = (props?: Partial<Props>) => render((
  <Issues
    issues={props?.issues || [normalize(mockIssue)] as Props["issues"]}
    isLoading={props?.isLoading || false}
    selectedIssues={props?.selectedIssues || []}
    onChangeSelectedIssue={props?.onChangeSelectedIssue || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("LinkIssues", () => {
  describe("Issues", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderIssues();
      expect(await findByText(/\[Linear\] Link & Search issues/i)).toBeInTheDocument();
    });
  });
});
