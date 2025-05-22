import { useNavigate } from 'react-router-dom';
import { Title } from '@deskpro/app-sdk';
import { P5 } from '@deskpro/deskpro-ui';
import { RelationshipItem } from '../../RelationshipItem/RelationshipItem';
import { ErrorBlock } from '../../common';
import { useIssueRelationships } from '../../../hooks/useIssueRelationships';
import { Relation } from '../../../services/linear/types';

interface Relationships {
    relationships: Relation[];
    issueID: string;
};

export function Relationships({ relationships, issueID }: Relationships) {
    const navigate = useNavigate();
    const { relationships: trueRelationships, error } = useIssueRelationships(relationships, issueID);

    return (
        <>
            <Title title={`Relationships (${trueRelationships.length})`} onClick={() => {navigate(`/issues/${issueID}/relationships/create`)}} />
            {error && <ErrorBlock text={error} />}
            {trueRelationships.length === 0
                ? <P5>No relationships found</P5>
                : trueRelationships.map(relationship => <RelationshipItem key={relationship.id} relation={relationship} />)
            }
        </>
    );
};