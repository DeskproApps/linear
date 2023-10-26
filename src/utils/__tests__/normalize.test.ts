import { normalize } from "../normalize";

const issueOne = {
  id: "001",
  title: "issue 001",
  labels: { nodes: [] },
  assignee: { id: "301", name: "Armen Tamzarian" },
};
const issueTwo = {
  id: "001",
  title: "issue 001",
  state: { id: "201", name: "" },
  assignee: null,
  labels: {
    nodes: [
      { id: "101", name: "In Progress" },
      { id: "102", name: "To Do" },
    ],
  },
};
const issueThree = {
  id: "001",
  title: "issue 001",
};

describe("normalize", () => {
  test("should normalize graphql response", () => {
    const data = {
      data: {
        issues: {
          nodes: [issueOne, issueTwo],
        },
      },
    };
    expect(normalize(data as never)).toStrictEqual({
      data: {
        issues: [
          {
            id: "001",
            title: "issue 001",
            labels: [],
            assignee: { id: "301", name: "Armen Tamzarian" }
          },
          {
            id: "001",
            title: "issue 001",
            state: { id: "201", name: "" },
            assignee: null,
            labels: [
              { id: "101", name: "In Progress" },
              { id: "102", name: "To Do" },
            ],
          },
        ],
      },
    });
  });

  test("shouldn't do anything if \"nodes\" key doesn't exist", () => {
    expect(normalize(issueThree as never)).toStrictEqual(issueThree);
  });

  test.each(
    [undefined, null, "", 0, true, false, {}, []],
  )("wrong value: %p", (payload) => {
    expect(normalize(payload as never)).toStrictEqual(payload);
  });
});
