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
      const { findByText, findAllByText } = renderIssueItem({
        issue: normalize(mockIssue.data.issue) as never,
      });

      expect(await findByText(/Control and Maintenance of the Wall's Defense/i)).toBeInTheDocument();
      expect(await findByText(/GOT-26/i)).toBeInTheDocument();
      expect(await findByText(/In Progress/i)).toBeInTheDocument();
      expect(await findByText(/High/i)).toBeInTheDocument();
      expect(await findByText(/30 Nov, 2023/i)).toBeInTheDocument();
      expect(await findByText(/Jon Snow/i)).toBeInTheDocument();

      /* Labels */
      expect(await findByText(/Strategy/i)).toBeInTheDocument();
      expect(await findByText(/White Walker/i)).toBeInTheDocument();
      expect(await findAllByText(/Wall/i)).toHaveLength(2);
      expect(await findAllByText(/Defense/i)).toHaveLength(2);
  });
});
