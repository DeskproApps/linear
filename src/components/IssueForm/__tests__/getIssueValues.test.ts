import pick from "lodash/pick";
import cloneDeep from "lodash/cloneDeep";
import { getIssueValues } from "../utils";
import mockValues from "./mockValues.json";

describe("IssueForm", () => {
  describe("getIssueValues", () => {
    test("should return required values", () => {
      const values = pick(cloneDeep(mockValues), ["team", "title"]);
      expect(getIssueValues(values as never)).toStrictEqual({
        teamId: "team-001",
        title: "Reinforcement of the Shadow Tower",
        priority: 0,
        description: "",
        labelIds: [],
      });
    });

    test("should return full card values", () => {
      expect(getIssueValues(mockValues as never)).toStrictEqual({
        teamId: "team-001",
        title: "Reinforcement of the Shadow Tower",
        priority: 2,
        description: "The Reinforcement of the Shadow Tower beyond the Wall.",
        labelIds: ["label-001", "label-002", "label-003"],
        stateId: "status-001",
        dueDate: "2023-12-30T22:00:00.000Z",
        assigneeId: "user-001",
      });
    });
  });
});
