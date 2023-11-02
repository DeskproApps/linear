import { getInitValues } from "../utils";

describe("IssueForm", () => {
  describe("getInitValues", () => {
    test("should return init values for new issue", () => {
      expect(getInitValues()).toStrictEqual({
        team: "",
        title: "",
        status: "",
        priority: 0,
        dueDate: undefined,
        description: "",
        assignee: "",
        labels: [],
      });
    });

    test.todo("should return init values for edit issue");
  });
});
