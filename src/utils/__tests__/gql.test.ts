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

  test.todo("pass wrong values");
});
