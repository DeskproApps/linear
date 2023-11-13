import cloneDeep from "lodash/cloneDeep";
import { getEntityMetadata } from "../getEntityMetadata";
import { normalize } from "../normalize";
import { mockIssue } from "../../../testing/mocks";

describe("getEntityMetadata", () => {
  test("should return metadata", () => {
    expect(getEntityMetadata(mockIssue.data.issue as never))
      .toStrictEqual({
        id: "4c214f9f-3567-425a-92da-60367e04c0a7",
        identifier: "GOT-26",
        title: "Control and Maintenance of the Wall's Defense",
        status: "In Progress",
        priority: "High",
        team: "Game of Thrones",
        assignee: {
          name: "Jon Snow",
          displayName: "jon.snow",
          email: "jon.snow@me.com",
        },
      });
  });

  test("shouldn't show assignee", () => {
    const issue = cloneDeep(normalize(mockIssue.data.issue));
    issue.assignee = null;

    expect(getEntityMetadata(issue as never))
      .toStrictEqual({
        id: "4c214f9f-3567-425a-92da-60367e04c0a7",
        identifier: "GOT-26",
        title: "Control and Maintenance of the Wall's Defense",
        status: "In Progress",
        priority: "High",
        team: "Game of Thrones",
      });
  });

  test("shouldn't return metadata", () => {
    expect(getEntityMetadata()).toBeUndefined();
  });
});
