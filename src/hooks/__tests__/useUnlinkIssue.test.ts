import { cleanup, renderHook, act } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { deleteEntityService } from "../../services/deskpro";
import { useUnlinkIssue } from "../useUnlinkIssue";
import { mockIssue } from "../../../testing";
import type { Result } from "../useUnlinkIssue";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock("../useAsyncError", () => ({
  useAsyncError: jest.fn().mockReturnValue({ asyncErrorHandler: jest.fn() }),
}));
jest.mock("../../services/deskpro/deleteEntityService");

const payload = {
  type: "unlink",
  issue: mockIssue,
}

const renderUseUnlinkIssue = () => renderHook<Result, unknown>(() => useUnlinkIssue());

describe("useUnlinkCard", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should unlink card", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (deleteEntityService as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderUseUnlinkIssue();

    await act(async () => {
      await result.current.unlink(payload as never);
    })

    expect(deleteEntityService).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });

  test("shouldn't navigate to /home if unlink card failed", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (deleteEntityService as jest.Mock).mockRejectedValueOnce(new Error("unlink failed"));

    const { result } = renderUseUnlinkIssue();

    await act(async () => {
      await result.current.unlink(payload as never);
    });

    expect(deleteEntityService).toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalledWith("/home");
  });

  test("shouldn't navigate to /home if no card", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (deleteEntityService as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderUseUnlinkIssue();

    await act(async () => {
      await result.current.unlink(undefined as never);
    });

    expect(deleteEntityService).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalledWith("/home");
  });
});
