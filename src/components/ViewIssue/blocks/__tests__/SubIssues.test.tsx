import { cleanup } from "@testing-library/react";
import { render, mockIssue } from "../../../../../testing";
import { SubIssues } from "../SubIssues";
import type { Props } from "../SubIssues";

const renderSubIssues = (props?: Partial<Props>) => render((
  <SubIssues
    subIssues={props?.subIssues || mockIssue.data.issue.children.nodes as never}
    onChangeState={props?.onChangeState || jest.fn()}
    states={props?.states || []}
  />
), { wrappers: { theme: true } });

describe("ViewIssue", () => {
  describe("SubIssues", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderSubIssues();

      expect(await findByText(/Create page/i)).toBeInTheDocument();
      expect(await findByText(/Search issues via API/i)).toBeInTheDocument();
      expect(await findByText(/Linking tasks into DP ticket using entity associations/i)).toBeInTheDocument();
      expect(await findByText(/Write tests/i)).toBeInTheDocument();
    });
  });
});
