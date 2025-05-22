import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { HorizontalDivider, Search, Select, useDeskproAppClient } from '@deskpro/app-sdk';
import { Button, Container, ErrorBlock, Label } from '../../components/common';
import { useRegisterElements, useSetTitle } from '../../hooks';
import { Stack } from '@deskpro/deskpro-ui';
import { Issues } from '../../components/LinkIssues/blocks';
import { useSearchIssues } from '../LinkIssuesPage/hooks';
import { Issue } from '../../services/linear/types';
import { cloneDeep, set } from 'lodash';
import { getOption } from '../../utils';
import { addRelationship } from '../../services/linear/addRelationship';

type RelationshipType = 'related' | 'blocks' | 'blocked' | 'duplicates' | 'duplicated';

const relationshipTypes: {value: RelationshipType}[] = [
    {value: 'related'},
    {value: 'blocks'},
    {value: 'blocked'},
    {value: 'duplicates'},
    {value: 'duplicated'}
];

export function AddRelationshipPage() {
    const { client } = useDeskproAppClient();
    const [query, setQuery] = useState('');
    const { issues, isLoading } = useSearchIssues(query);
    const [selectedIssues, setSelectedIssues] = useState<Issue[]>([]);
    const [selectedType, setSelectedType] = useState<RelationshipType>('related');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { issueId } = useParams();
    const [error, setError] = useState<string | null>(null);

    useSetTitle('Add Relationship');

    useRegisterElements(({ registerElement }) => {
        registerElement('refresh', {type: 'refresh_button'});
    });

    const handleQueryChange = useDebouncedCallback(setQuery, 1500);

    const options = relationshipTypes.map(type => getOption<RelationshipType>(type.value));

    const handleSelectChange = (value?: string | string[]) => {
        setSelectedType(value as RelationshipType);
    };

    const handleLinkIssues = () => {
        if (!client || !issueId) {
            return;
        };

        setIsSubmitting(true);

        selectedIssues.forEach(issue => {
            let input = {
                issueId: issueId,
                relatedIssueId: issue.id,
                type: selectedType as string
            };

            if (selectedType === 'blocked' || selectedType === 'duplicated') {
                input = {
                    issueId: issue.id,
                    relatedIssueId: issueId,
                    type: selectedType === 'blocked' ? 'blocks' : 'duplicate'
                };
            };

            if (selectedType === 'duplicates') {
                input.type = 'duplicate';
            };

            addRelationship(client, input)
                .then(() => {
                    navigate(`/issues/view/${issueId}`);
                })
                .catch(error => {
                    setError(`error adding relationship: ${error.message}`);
                });
        });

        setIsSubmitting(false);
    };

    const handleCancel = () => {
        navigate(`/issues/view/${issueId}`);
    };

    const handleChangeSelectedIssue = (issue: Issue) => {
        let newSelectedIssues = cloneDeep(selectedIssues);

        if (selectedIssues.some(selectedIssue => issue.id === selectedIssue.id)) {
            newSelectedIssues = selectedIssues.filter(selectedCard => selectedCard.id !== issue.id);
        } else {
            newSelectedIssues.push(issue);
        };

        setSelectedIssues(newSelectedIssues);
    };

    return (
        <>
            <Container>
                {error && <ErrorBlock text={error} />}
                <Search
                    inputProps={{variant: 'normal'}}
                    isFetching={isLoading}
                    onChange={handleQueryChange}
                />
                <Label htmlFor='relationship-type' label='Relationship Type' required>
                    <Select<RelationshipType>
                        id='relationship-type'
                        options={options}
                        value={selectedType}
                        placeholder='select relationship type'
                        onChange={handleSelectChange}
                    />
                </Label>
                <Stack justify='space-between'>
                    <Button
                        type='button'
                        text='Link Issues'
                        loading={isSubmitting}
                        disabled={selectedIssues.length === 0}
                        onClick={handleLinkIssues}
                    />
                    <Button
                        type='button'
                        text='Cancel'
                        intent='secondary'
                        onClick={handleCancel}
                    />
                </Stack>
            </Container>
            <HorizontalDivider />
            <Container>
                <Issues
                    issues={issues}
                    selectedIssues={selectedIssues}
                    isLoading={isLoading}
                    onChangeSelectedIssue={handleChangeSelectedIssue}
                />
            </Container>
        </>
    );
};