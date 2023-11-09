import { gql } from "../gql";

describe("gql", () => {
  test("should return GraphQL query", () => {
    const query = gql`
      query Me {
        viewer { id name email }
      }
    `
    const result =  "{\"query\":\"query Me { viewer { id name email } }\"}";

    expect(query).toBe(result);
  });

  test("should return GraphQL query with pass variables", () => {
    const search = "search query";
    const query = gql({ q: search })`
      query getCustomers ($q: String) {
        customers(first: 100, query: $q) {
          id, displayName, email
        }
      }
    `;

    const result = "{\"query\":\"query getCustomers ($q: String) { customers(first: 100, query: $q) { id, displayName, email } }\",\"variables\":{\"q\":\"search query\"}}";

    expect(query).toBe(result);
  });

  test("work with fragments", () => {
    const userFragment = `fragment userFragment on User { id name email }`;

    const query = gql({ issueId: "001" })`
      query Issue($issueId: String!) {
        issue(id: $issueId) {
          ...userInfo
        }
      }
      ${userFragment}
    `;

    const result =  "{\"query\":\"query Issue($issueId: String!) { issue(id: $issueId) { ...userInfo } } fragment userFragment on User { id name email }\",\"variables\":{\"issueId\":\"001\"}}";

    expect(query).toBe(result);
  });

  test.todo("pass wrong values");
});
