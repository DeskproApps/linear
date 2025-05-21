import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, useDeskproAppClient } from '@deskpro/app-sdk';
import { P5 } from '@deskpro/deskpro-ui';
import { RelationshipItem } from '../../RelationshipItem/RelationshipItem';
import { ErrorBlock } from '../../common';
import { getIssuesService } from '../../../services/linear';
import type { Issue, Relation } from '../../../services/linear/types';

interface Relationships {
    relationships: Relation[];
    issueID: string;
};

export function Relationships({ relationships, issueID }: Relationships) {
    const { client } = useDeskproAppClient();
    const navigate = useNavigate();
    const [trueRelationships, setTrueRelationships] = useState<Relation[]>(relationships);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!client) {
            return;
        };

        getIssuesService(client, {})
            .then((issues: Issue[]) => {
                const blockedIssues = issues
                    .filter(issue => issue.relations.some(relation => relation.type === 'blocks' && relation.relatedIssue.id === issueID))
                    .map(blockingIssue => {
                        const originalRelation = blockingIssue.relations.find(relation => relation.type === 'blocks' && relation.relatedIssue.id === issueID);

                        return originalRelation
                            ? {
                                ...originalRelation,
                                id: blockingIssue.id,
                                type: 'blocked',
                                relatedIssue: blockingIssue,
                            }
                            : null;
                    })
                    .filter(Boolean);

                setTrueRelationships(() => {
                    const allRelationships = [...relationships, ...blockedIssues];
                    const uniqueRelationships = Array
                        .from(
                            allRelationships
                                .filter((relationship): relationship is Relation => relationship !== null)
                                .map(relationship => [relationship.id, relationship] as [string, Relation])
                        )
                        .map(([_, relationship]) => relationship);

                    return uniqueRelationships;
                });
            })
            .catch(error => {
                setError(`error getting relationships: ${error.message}`);
            });
    }, [client, issueID, relationships]);

    return (
        <>
            <Title title={`Relationships (${trueRelationships.length})`} onClick={() => {navigate(`/issues/${issueID}/relationships`)}} />
            {error && <ErrorBlock text={error} />}
            {trueRelationships.length === 0
                ? <P5>No relationships found</P5>
                : trueRelationships.map(relationship => <RelationshipItem key={relationship.id} relation={relationship} />)
            }
        </>
    );
};