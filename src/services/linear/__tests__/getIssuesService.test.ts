import { getIssuesService } from "../getIssuesService";
import { baseRequest } from "../baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";

jest.mock("../baseRequest", () => ({
  baseRequest: jest.fn(() => Promise.resolve({ data: {} })),
}));

const client = {} as IDeskproClient;

const getSentBody = (): string => {
  const mock = baseRequest as jest.Mock;
  return JSON.parse(mock.mock.calls[0][1].data).query;
};

const getSentVariables = () => {
  const mock = baseRequest as jest.Mock;
  return JSON.parse(mock.mock.calls[0][1].data).variables;
};

describe("getIssuesService", () => {
  beforeEach(() => {
    (baseRequest as jest.Mock).mockClear();
  });

  test("searches by term (matches identifier + title) when given a query", async () => {
    await getIssuesService(client, { q: "ENG-123" });

    const query = getSentBody();
    expect(query).toContain("searchIssues(term: $term)");
    expect(query).not.toContain("containsIgnoreCase");
    expect(getSentVariables()).toEqual({ term: "ENG-123" });
    // searchIssues returns IssueSearchResult, not Issue, so the top-level node
    // must inline the scalar fields rather than spread the `on Issue` fragment.
    expect(query).toContain("searchIssues(term: $term) { nodes { id identifier title");
    expect(query).not.toContain("searchIssues(term: $term) { nodes { ...issueInfo");
  });

  test("filters by id list when given ids", async () => {
    await getIssuesService(client, { ids: ["uuid-1", "uuid-2"] });

    const query = getSentBody();
    expect(query).toContain("issues(filter: $filter)");
    expect(getSentVariables()).toEqual({ filter: { id: { in: ["uuid-1", "uuid-2"] } } });
  });

  test("requests linked releases on listed issues (both query shapes)", async () => {
    const releasesSelection =
      "releases { nodes { id name version url stage { id name type color } } }";

    await getIssuesService(client, { ids: ["uuid-1"] });
    expect(getSentBody()).toContain(releasesSelection);

    (baseRequest as jest.Mock).mockClear();

    await getIssuesService(client, { q: "ENG-123" });
    expect(getSentBody()).toContain(releasesSelection);
  });
});
