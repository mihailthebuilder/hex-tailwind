import { expect, test } from "vitest";

import { closestTailwindToHex, hexToRgb, normalizeHex } from "./colors";

test.each([
  ["fff", "ffffff"],
  ["ffffff", "ffffff"],
])("normalizeHex(%s) -> %s", (input, expected) => {
  expect(normalizeHex(input)).toBe(expected);
});

test("hexToRgb", () => {
  expect(hexToRgb("D6D3D1")).toStrictEqual({ R: 214, G: 211, B: 209 });
});

test.each([
  ["000000", "black"],
  ["ffffff", "white"],
  ["93c5fd", "blue-300"],
  ["701a75", "fuchsia-900"],
  ["9101ec", "purple-600"],
  ["123c2d", "emerald-950"],
])("closestTailwindToHex(%s) -> %s", (input, expected) => {
  expect(closestTailwindToHex(input)).toBe(expected);
});
