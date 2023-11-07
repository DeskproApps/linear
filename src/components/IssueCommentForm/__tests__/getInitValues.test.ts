import { getInitValues } from "../utils";

describe("CardCommentForm", () => {
  describe("getInitValues", () => {
    test("should return comment values", () => {
      expect(getInitValues()).toEqual({
        comment: "",
      });
    });
  });
});
