import { P5 } from '@deskpro/deskpro-ui';
import { InternalIconLink } from '../common';
import { Relation } from '../../services/linear/types';

interface RelationshipItem {
    relation: Relation;
};

export function RelationshipItem({ relation }: RelationshipItem) {
    let relationship = '';

    switch (relation.type) {
        case 'related':
            relationship = 'Related to';

            break;

        case 'blocks':
            relationship = 'Blocks';

            break;

        case 'duplicate':
            relationship = 'Duplicate of';

            break;

        case 'blocked':
            relationship = 'Blocked by';

            break;

        case 'duplicated':
            relationship = 'Duplicated by';

            break;
    };

    return (
        <>
            <P5>
                {`${relationship} `}
                <strong>{relation.relatedIssue.title}</strong>
            </P5>
            <P5 style={{display: 'flex'}}>
                {`ID: ${relation.relatedIssue.identifier} `}
                <InternalIconLink link={`/issues/view/${relation.relatedIssue.id}`} />
            </P5>
        </>
    );
};