import { useEffect, useState } from 'react';
import { useDeskproAppClient } from '@deskpro/app-sdk';
import { getIssuesService } from '../services/linear';
import { Issue, Relation } from '../services/linear/types';

export function useIssueRelationships(originalRelationships: Relation[], issueID: string) {
    const { client } = useDeskproAppClient();
    const [relationships, setRelationships] = useState<Relation[]>(originalRelationships);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!client) return;

        getIssuesService(client, {})
            .then((issues: Issue[]) => {
                const relatedIssues = issues
                    .filter(issue => issue.relations.some(relation => relation.type === 'related' && relation.relatedIssue.id === issueID))
                    .map(relatedIssue => ({
                        id: relatedIssue.id,
                        type: 'related',
                        relatedIssue: relatedIssue
                    }));
                const blockedIssues = issues
                    .filter(issue => issue.relations.some(relation => relation.type === 'blocks' && relation.relatedIssue.id === issueID))
                    .map(blockingIssue => ({
                        id: blockingIssue.id,
                        type: 'blocked',
                        relatedIssue: blockingIssue
                    }));
                const duplicatedIssues = issues
                    .filter(issue => issue.relations.some(relation => relation.type === 'duplicate' && relation.relatedIssue.id === issueID))
                    .map(duplicateIssue => ({
                        id: duplicateIssue.id,
                        type: 'duplicated',
                        relatedIssue: duplicateIssue
                    }));
                const allRelationships = [
                    ...originalRelationships,
                    ...relatedIssues,
                    ...blockedIssues,
                    ...duplicatedIssues
                ];
                const uniqueRelationships = Array.from(
                    new Map(
                        allRelationships.map(relationship => [relationship.id, relationship] as [string, Relation])
                    ).values()
                );

                setRelationships(uniqueRelationships);
            })
            .catch(error => {
                setError(`error getting relationships: ${error.message}`);
            });
    }, [client, issueID, originalRelationships]);

    return { relationships, error };
};