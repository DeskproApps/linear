import { parse } from "../parse";

describe("date", () => {
  describe("parse", () => {
    test("should return parsed date", () => {
      expect(parse("2023-11-05" as never))
          .toStrictEqual(new Date("2023-11-05T00:00:00.000Z"));
    });

    test.each(
      [undefined, null, "", 0, true, false, {}]
    )("wrong value: %p", (payload) => {
      expect(parse(payload as never)).toBeNull();
    });
  });
});
