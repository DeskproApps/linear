import { cleanup } from "@testing-library/react";
import { render, mockIssue } from "../../../../../testing";
import { Comments } from "../Comments";
import type { Props } from "../Comments";

jest.mock('react-time-ago', () => jest.fn().mockReturnValue('7h 30m'));

const renderComments = (props?: Partial<Props>) => render((
  <Comments
    comments={props?.comments || mockIssue.data.issue.comments.nodes as never[]}
  />
), { wrappers: { theme: true } });

describe("ViewIssue", () => {
  describe("Comments", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderComments();

      expect(await findByText(/Very long text Lorem ipsum dolor sit amet/i)).toBeInTheDocument();
      expect(await findByText(/Comment with Markdown/i)).toBeInTheDocument();
      expect(await findByText(/one comment/i)).toBeInTheDocument();
    });
  });
});
