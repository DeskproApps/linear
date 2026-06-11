import { renderHook } from "@testing-library/react";
import { useIssueRelationships } from "../useIssueRelationships";
import { getIssuesService } from "../../services/linear";
import type { Relation } from "../../services/linear/types";

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
});
