import { cleanup, renderHook, act } from "@testing-library/react";
import { createIssueCommentService } from "../../../services/linear";
import { useLinkedAutoComment } from "../../useLinkedAutoComment";
import type { Result } from "../../useLinkedAutoComment";

jest.mock("../../../services/linear/createIssueCommentService");

jest.mock("@deskpro/app-sdk", () => ({
  ...jest.requireActual("@deskpro/app-sdk"),
  useDeskproLatestAppContext: () => ({
    context: {
      settings: { add_comment_when_linking: false },
      data: {
        ticket: { id: "215", subject: "Big ticket", permalinkUrl: "https://permalink.url" },
      },
    },
  }),
}));

const renderLinkedAutoComment = () => renderHook<Result, unknown>(() => useLinkedAutoComment());

describe("useAutoCommentLinkedIssue", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("shouldn't to called the service to create an automatic comment (link issue)", async () => {
    (createIssueCommentService as jest.Mock).mockResolvedValueOnce(() => Promise.resolve());

    const { result } = renderLinkedAutoComment();

    await act(async () => {
      await result.current.addLinkComment("2-40");
    });

    expect(createIssueCommentService).not.toHaveBeenCalled();
  });

  test("shouldn't to called the service to create an automatic comment (unlink issue)", async () => {
    (createIssueCommentService as jest.Mock).mockResolvedValueOnce(() => Promise.resolve());

    const { result } = renderLinkedAutoComment();

    await act(async () => {
      await result.current.addUnlinkComment("2-40");
    });

    expect(createIssueCommentService).not.toHaveBeenCalled();
  });
});
