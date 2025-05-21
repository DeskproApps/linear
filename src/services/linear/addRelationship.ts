import { IDeskproClient } from '@deskpro/app-sdk';
import { baseRequest } from './baseRequest';
import { gql, normalize } from '../../utils';

type Input = {
    issueId: string;
    relatedIssueId: string;
    type: string;
};

export function addRelationship(client: IDeskproClient, input: Input) {
    const query = gql({ input })`
        mutation AddRelationship($input: IssueRelationCreateInput!) {
            issueRelationCreate(input: $input) {
                issueRelation {
                    id
                    type
                    issue { id }
                    relatedIssue { id }
                }
            }
        }
    `;

    return baseRequest(client, { data: query })
        .then(normalize)
        .then(res => {
            return res?.data?.issueRelationCreate?.issueRelation;
        });
};