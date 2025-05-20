import { Title } from '@deskpro/app-sdk';
import { P5 } from '@deskpro/deskpro-ui';
import { RelationshipItem } from '../../RelationshipItem/RelationshipItem';
import type { Relation } from '../../../services/linear/types';

interface Relationships {
    relationships: Relation[];
};

export function Relationships({ relationships }: Relationships) {
    return (
        <>
            <Title title={`Relationships (${relationships.length})`} />
            {relationships.length === 0
                ? <P5>No relationships found</P5>
                : relationships.map(relationship => <RelationshipItem key={relationship.id} relation={relationship} />)
            }
        </>
    );
};