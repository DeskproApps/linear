import { Relation } from '../services/linear/types';

export function useIssueRelationships(originalRelationships: Relation[], _issueID: string) {
    return { relationships: originalRelationships, error: null };
};