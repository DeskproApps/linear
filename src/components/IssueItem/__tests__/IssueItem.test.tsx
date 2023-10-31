import { cleanup } from "@testing-library/react";
import { render, mockIssue } from "../../../../testing";
import { normalize } from "../../../utils";
import { IssueItem } from "../IssueItem";
import type { Props } from "../IssueItem";

const renderIssueItem = (props?: Partial<Props>) => render((
  <IssueItem
    issue={props?.issue as never}
    onClickTitle={props?.onClickTitle || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("DeskproTickets", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
      const { findByText } = renderIssueItem({
        issue: normalize(mockIssue.data.issue) as never,
      });

      expect(await findByText(/\[Linear\] Link & Search issues/i)).toBeInTheDocument();
      expect(await findByText(/DP-10/i)).toBeInTheDocument();
      expect(await findByText(/Done/i)).toBeInTheDocument();
      expect(await findByText(/Urgent/i)).toBeInTheDocument();
      expect(await findByText(/05 Nov, 2023/i)).toBeInTheDocument();
      expect(await findByText(/Urgent/i)).toBeInTheDocument();
      expect(await findByText(/ilia makarov/i)).toBeInTheDocument();
      expect(await findByText(/Feature/i)).toBeInTheDocument();
      expect(await findByText(/Improvement/i)).toBeInTheDocument();
  });
});
