import { useMemo } from 'react';
import { Relation } from '../services/linear/types';

const INVERSE_TYPE: Record<string, string> = {
    blocks: 'blocked',
    duplicate: 'duplicated',
    related: 'related',
    similar: 'similar',
};

export function useIssueRelationships(
    relations: Relation[] = [],
    inverseRelations: Relation[] = [],
) {
    const relationships = useMemo(() => {
        const inverseMapped = inverseRelations.map(rel => ({
            ...rel,
            type: INVERSE_TYPE[rel.type] ?? rel.type,
            relatedIssue: rel.issue,
        }));

        const all = [...relations, ...inverseMapped];
        const seen = new Set<string>();
        return all.filter(r => {
            const key = r.id ?? (r.relatedIssue as { id?: string })?.id;
            if (!key || seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }, [relations, inverseRelations]);

    return { relationships, error: null };
}
