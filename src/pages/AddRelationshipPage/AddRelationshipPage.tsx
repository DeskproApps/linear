import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { useDebouncedCallback } from 'use-debounce';
import { HorizontalDivider, Search, Select, useDeskproAppClient } from '@deskpro/app-sdk';
import { Stack } from '@deskpro/deskpro-ui';
import { Issues } from '../../components/LinkIssues/blocks';
import { Button, Container, ErrorBlock, Label } from '../../components/common';
import { useRegisterElements, useSetTitle } from '../../hooks';
import { useSearchIssues } from '../LinkIssuesPage/hooks';
import { addRelationship } from '../../services/linear/addRelationship';
import { getOption } from '../../utils';
import { Issue } from '../../services/linear/types';
import { RELATIONSHIP_OPTIONS, RelationshipType } from '../../types/relationships';

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

    const options = RELATIONSHIP_OPTIONS.map(type => getOption<RelationshipType>(type.value, type.label));

    const handleSelectChange = (value?: string | string[]) => {
        setSelectedType(value as RelationshipType);
    };

    const handleLinkIssues = () => {
        if (!client || !issueId) {
            return;
        };

        setIsSubmitting(true);

        const promises = selectedIssues.map(issue => {
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

            return addRelationship(client, input);
        });

        Promise.all(promises)
            .then(() => {
                navigate(`/issues/view/${issueId}`);
            })
            .catch(error => {
                setError(`error adding relationship: ${error.message}`);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
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

    const filteredIssues = issues.filter(issue => issue.id !== issueId);

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
                    issues={filteredIssues}
                    selectedIssues={selectedIssues}
                    isLoading={isLoading}
                    onChangeSelectedIssue={handleChangeSelectedIssue}
                />
            </Container>
        </>
    );
};