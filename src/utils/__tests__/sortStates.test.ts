import { sortStates } from "../sortStates";
import { mockTeams } from "../../../testing";

describe("sortStates", () => {
  test("should sort states", () => {
    expect(sortStates(mockTeams.data.teams.nodes[1].states.nodes as never)).toMatchObject([
      { "name": "Backlog" },
      { "name": "New" },
      { "name": "Idea" },
      { "name": "Todo" },
      { "name": "Prioritized" },
      { "name": "Specified" },
      { "name": "In Progress" },
      { "name": "Started" },
      { "name": "Review" },
      { "name": "Blocked" },
      { "name": "Tested" },
      { "name": "Acceptance" },
      { "name": "Done" },
      { "name": "Released" },
      { "name": "Canceled" },
      { "name": "Duplicate" },
      { "name": "Discarded" },
    ]);
  });

  test.each(
    [undefined, null, "", 0, true, false, {}],
  )("wrong value: %p", (value) => {
    expect(sortStates(value as never)).toStrictEqual([]);
  });
});
