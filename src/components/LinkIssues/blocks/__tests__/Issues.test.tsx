import { cleanup } from "@testing-library/react";
import { render, mockIssues  } from "../../../../../testing";
import { normalize } from "../../../../utils";
import { Issues } from "../Issues";
import type { Props } from "../Issues";

const renderIssues = (props?: Partial<Props>) => render((
  <Issues
    issues={props?.issues || normalize(mockIssues.data.issues.nodes) as never}
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
      expect(await findByText(/\[Linear\] Home/i)).toBeInTheDocument();
      expect(await findByText(/\[Linear\] Link & Search issues/i)).toBeInTheDocument();
    });
  });
});
