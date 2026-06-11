import { renderHook } from "@testing-library/react";
import { useIssueRelationships } from "../useIssueRelationships";
import { getIssuesService } from "../../services/linear";
import type { Relation } from "../../services/linear/types";

// Regression guard: ensures getIssuesService is never re-introduced into this
// hook (the empty-filter call previously caused Linear API rejections).
jest.mock("../../services/linear", () => ({
  ...jest.requireActual("../../services/linear"),
  getIssuesService: jest.fn(),
}));

const mockGetIssuesService = getIssuesService as jest.MockedFunction<typeof getIssuesService>;

const mockRelations: Relation[] = [
  {
    id: "rel-1",
    type: "related",
    relatedIssue: { id: "issue-2" },
  } as Relation,
];

describe("useIssueRelationships", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("returns originalRelationships without calling getIssuesService", () => {
    const { result } = renderHook(() =>
      useIssueRelationships(mockRelations, "issue-1")
    );

    expect(result.current.relationships).toEqual(mockRelations);
    expect(result.current.error).toBeNull();
    expect(mockGetIssuesService).not.toHaveBeenCalled();
  });

  test("returns empty array when no relationships exist", () => {
    const { result } = renderHook(() =>
      useIssueRelationships([], "issue-1")
    );

    expect(result.current.relationships).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  test("handles undefined relationships gracefully", () => {
    const { result } = renderHook(() =>
      useIssueRelationships(undefined as unknown as Relation[], "issue-1")
    );

    expect(result.current.relationships).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  test("result is unchanged when issueID changes", () => {
    const { result, rerender } = renderHook(
      ({ id }) => useIssueRelationships(mockRelations, id),
      { initialProps: { id: "issue-1" } }
    );

    rerender({ id: "issue-99" });

    expect(result.current.relationships).toEqual(mockRelations);
    expect(result.current.error).toBeNull();
  });
});
