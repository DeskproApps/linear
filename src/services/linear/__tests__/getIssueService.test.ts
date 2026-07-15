import { getIssueService } from "../getIssueService";
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

describe("getIssueService", () => {
  beforeEach(() => {
    (baseRequest as jest.Mock).mockClear();
  });

  test("queries the issue by id", async () => {
    await getIssueService(client, "issue-1");

    expect(getSentBody()).toContain("query Issue($issueId: String!)");
    expect(getSentVariables()).toEqual({ issueId: "issue-1" });
  });

  test("requests the releases associated with the issue", async () => {
    await getIssueService(client, "issue-1");

    // Releases is a Business+ feature; the API returns an empty connection on
    // lower tiers, so the field is always safe to request.
    expect(getSentBody()).toContain(
      "releases { nodes { id name version url stage { id name type color } } }",
    );
  });
});
