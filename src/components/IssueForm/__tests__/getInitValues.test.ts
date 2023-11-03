import { mockIssue } from "../../../../testing";
import { normalize } from "../../../utils";
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

    test("should return init values for edit issue", () => {
      expect(getInitValues(normalize(mockIssue.data.issue) as never)).toStrictEqual({
        team: "4711a15c-8025-40d9-b0b1-2e17179a1d2a",
        title: "Control and Maintenance of the Wall's Defense",
        status: "f3a56e47-0995-446c-ba16-95f2d04a4387",
        priority: 2,
        dueDate: new Date("2023-11-30T00:00:00.000Z"),
        description: "Conduct a comprehensive review and enhancement of the Wall's defense mechanisms to ensure maximum preparedness against potential threats from the North.",
        assignee: "2ad5db8b-3e03-4c6a-87cb-04519ff7d257",
        labels: [
          "663d62cb-e25e-4611-a58d-b2a2f63be740",
          "a64df69d-0a12-40f9-baea-448c1bdbb08e",
          "8329f1c0-fb16-412a-8d0b-21bb618cbd9f",
          "6c627335-6c0f-44b4-a25d-f7fc25c3065c",
        ],
      });
    });
  });
});
