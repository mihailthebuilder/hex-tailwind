import { expect, test } from "vitest";

import { closestTailwindToHex, hexToRgb, normalizeHex } from "./colors";

test("normalizeHex with 3 characters", () => {
  expect(normalizeHex("fff")).toBe("ffffff");
});

test("normalizeHex with 6 characters", () => {
  expect(normalizeHex("ffffff")).toBe("ffffff");
});

test("hexToRgb", () => {
  expect(hexToRgb("D6D3D1")).toStrictEqual({ R: 214, G: 211, B: 209 });
});

test.each([
  ["000000", "black"],
  ["ffffff", "white"],
])("closestTailwindToHex(%s) -> %s", (input, expected) => {
  expect(closestTailwindToHex(input)).toBe(expected);
});
