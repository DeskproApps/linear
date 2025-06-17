export type RelationshipType = 'related' | 'blocks' | 'duplicate' | 'blocked' | 'duplicated';

export const RELATIONSHIP_LABELS: Record<RelationshipType, string> = {
    related: 'Related to',
    blocks: 'Blocking',
    duplicate: 'Duplicates',
    blocked: 'Blocked by',
    duplicated: 'Duplicated by'
};

export const RELATIONSHIP_OPTIONS = [
    {value: 'related', label: RELATIONSHIP_LABELS.related},
    {value: 'blocks', label: RELATIONSHIP_LABELS.blocks},
    {value: 'duplicate', label: RELATIONSHIP_LABELS.duplicate},
    {value: 'blocked', label: RELATIONSHIP_LABELS.blocked},
    {value: 'duplicated', label: RELATIONSHIP_LABELS.duplicated}
] as const;