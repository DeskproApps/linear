import { useMemo } from 'react';
import { Relation } from '../services/linear/types';

// TODO: Reverse-relation discovery (issues that point TO this issue) is not
// implemented here. The IssueFilter type has no relatedIssue.id comparator.
// Use Issue.inverseRelations instead to surface bidirectional relationships.
export function useIssueRelationships(originalRelationships: Relation[] = [], _issueID: string) {
    return useMemo(
        () => ({ relationships: originalRelationships, error: null }),
        [originalRelationships]
    );
}
