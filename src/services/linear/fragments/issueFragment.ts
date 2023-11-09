export const issueFragment = `
  fragment issueInfo on Issue {
    id
    identifier
    title
    priority
    priorityLabel
    url
    dueDate
  }
`;
export const issueFullInfoFragment = `
  fragment issueFullInfo on Issue {
    ...issueInfo
    description
  }
  ${issueFragment}
`;
