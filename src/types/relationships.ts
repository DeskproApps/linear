export type RelationshipType = 'related' | 'blocks' | 'duplicates' | 'blocked' | 'duplicated';

export const RELATIONSHIP_LABELS: Record<RelationshipType, string> = {
    related: 'Related to',
    blocks: 'Blocking',
    duplicates: 'Duplicates',
    blocked: 'Blocked by',
    duplicated: 'Duplicated by'
};

export const RELATIONSHIP_OPTIONS = [
    {value: 'related', label: RELATIONSHIP_LABELS.related},
    {value: 'blocks', label: RELATIONSHIP_LABELS.blocks},
    {value: 'duplicates', label: RELATIONSHIP_LABELS.duplicates},
    {value: 'blocked', label: RELATIONSHIP_LABELS.blocked},
    {value: 'duplicated', label: RELATIONSHIP_LABELS.duplicated}
] as const;