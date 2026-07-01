import { renderHook } from "@testing-library/react";
import { useIssueRelationships } from "../useIssueRelationships";
import type { Relation } from "../../services/linear/types";

const makeRelation = (overrides: Partial<Relation>): Relation =>
    ({ id: "rel-1", type: "related", relatedIssue: { id: "issue-2" }, issue: null, ...overrides } as unknown as Relation);

describe("useIssueRelationships", () => {
    test("returns forward relations unchanged", () => {
        const forward: Relation[] = [makeRelation({ id: "rel-1", type: "blocks" })];
        const { result } = renderHook(() => useIssueRelationships(forward, []));
        expect(result.current.relationships).toHaveLength(1);
        expect(result.current.relationships[0].type).toBe("blocks");
    });

    test("maps inverse relation types: blocks→blocked, duplicate→duplicated, related→related", () => {
        const inverseRelations: Relation[] = [
            makeRelation({ id: "rel-a", type: "blocks", issue: { id: "issue-b", title: "B" } as Relation["issue"] }),
            makeRelation({ id: "rel-b", type: "duplicate", issue: { id: "issue-c", title: "C" } as Relation["issue"] }),
            makeRelation({ id: "rel-c", type: "related", issue: { id: "issue-d", title: "D" } as Relation["issue"] }),
        ];
        const { result } = renderHook(() => useIssueRelationships([], inverseRelations));
        const types = result.current.relationships.map(r => r.type);
        expect(types).toEqual(["blocked", "duplicated", "related"]);
    });

    test("maps the symmetric 'similar' inverse relation to itself", () => {
        const inverseRelations: Relation[] = [
            makeRelation({ id: "rel-s", type: "similar", issue: { id: "issue-s", title: "S" } as Relation["issue"] }),
        ];
        const { result } = renderHook(() => useIssueRelationships([], inverseRelations));
        expect(result.current.relationships[0].type).toBe("similar");
    });

    test("uses issue field as relatedIssue for inverse relations", () => {
        const otherIssue = { id: "issue-b", title: "Issue B" };
        const inv: Relation[] = [
            makeRelation({ id: "rel-1", type: "blocks", issue: otherIssue as Relation["issue"] }),
        ];
        const { result } = renderHook(() => useIssueRelationships([], inv));
        expect(result.current.relationships[0].relatedIssue).toBe(otherIssue);
    });

    test("deduplicates when a relation appears in both forward and inverse", () => {
        const forward: Relation[] = [makeRelation({ id: "rel-shared", type: "related" })];
        const inverse: Relation[] = [makeRelation({ id: "rel-shared", type: "related" })];
        const { result } = renderHook(() => useIssueRelationships(forward, inverse));
        expect(result.current.relationships).toHaveLength(1);
    });

    test("merges forward and inverse relations", () => {
        const forward: Relation[] = [makeRelation({ id: "rel-1", type: "blocks" })];
        const inverse: Relation[] = [makeRelation({ id: "rel-2", type: "related" })];
        const { result } = renderHook(() => useIssueRelationships(forward, inverse));
        expect(result.current.relationships).toHaveLength(2);
    });

    test("handles empty arrays gracefully", () => {
        const { result } = renderHook(() => useIssueRelationships([], []));
        expect(result.current.relationships).toEqual([]);
        expect(result.current.error).toBeNull();
    });

    test("handles undefined arguments gracefully", () => {
        const { result } = renderHook(() =>
            useIssueRelationships(undefined as unknown as Relation[], undefined as unknown as Relation[])
        );
        expect(result.current.relationships).toEqual([]);
    });

    test("relationships array is stable across rerenders when inputs are unchanged", () => {
        const forward: Relation[] = [makeRelation({ id: "rel-1", type: "blocks" })];
        const inverse: Relation[] = [];
        const { result, rerender } = renderHook(
            ({ f, i }) => useIssueRelationships(f, i),
            { initialProps: { f: forward, i: inverse } }
        );
        const firstRelationships = result.current.relationships;
        rerender({ f: forward, i: inverse });
        expect(result.current.relationships).toBe(firstRelationships);
    });
});
