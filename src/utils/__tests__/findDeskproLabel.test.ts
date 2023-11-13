import { findDeskproLabel } from "../findDeskproLabel";

const dpLabel = { id: "000", name: "Deskpro" };

const labels = [
  { id: "001", name: "MVP" },
  { id: "002", name: "test" },
  { id: "003",  name: "" },
];

describe("findDeskproLabel", () => {
  test("should return Deskpro Label", () => {
    expect(findDeskproLabel([dpLabel] as never)).toStrictEqual(dpLabel);
    expect(findDeskproLabel([...labels, dpLabel] as never)).toStrictEqual(dpLabel);
  });

  test("should return undefined if Deskpro Label not exist", () => {
    expect(findDeskproLabel(labels as never)).toBeUndefined();
  });

  test.each(
    [undefined, null, "", 0, true, false, {}, []]
  )("wrong value %p", (value) => {
    expect(findDeskproLabel(value as never)).toBeUndefined();
  });
});
