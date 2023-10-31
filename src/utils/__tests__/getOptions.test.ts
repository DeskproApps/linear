import { mockTeams } from "../../../testing";
import { getOptions } from "../getOptions";

describe("getOptions", () => {
  test("should return options", () => {
    expect(getOptions(mockTeams.data.teams.nodes)).toStrictEqual([
      {
        key: "cceb1641-c487-4b71-853e-ba2cf83d89e4",
        label: "Deskpro Team",
        type: "value",
        value: "cceb1641-c487-4b71-853e-ba2cf83d89e4",
      },
      {
        key: "4711a15c-8025-40d9-b0b1-2e17179a1d2a",
        label: "Game of Thrones",
        type: "value",
        value: "4711a15c-8025-40d9-b0b1-2e17179a1d2a",
      },
    ]);
  });

  test.each(
    [undefined, null, "", 0, true, false, {}],
  )("wrong value: %p", (value) => {
    expect(getOptions(value as never)).toStrictEqual([]);
  });
});
