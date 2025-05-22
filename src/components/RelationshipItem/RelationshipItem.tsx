import { P5 } from '@deskpro/deskpro-ui';
import { InternalIconLink } from '../common';
import { Relation } from '../../services/linear/types';
import { RELATIONSHIP_LABELS, RelationshipType } from '../../types/relationships';

interface RelationshipItem {
    relation: Relation;
};

export function RelationshipItem({ relation }: RelationshipItem) {
    const label = RELATIONSHIP_LABELS[relation.type as RelationshipType] || relation.type;

    return (
        <>
            <P5>
                {`${label}: `}
                <strong>{relation.relatedIssue.title}</strong>
            </P5>
            <P5 style={{display: 'flex'}}>
                {`ID: ${relation.relatedIssue.identifier} `}
                <InternalIconLink link={`/issues/view/${relation.relatedIssue.id}`} />
            </P5>
        </>
    );
};