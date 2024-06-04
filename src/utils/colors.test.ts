import { expect, test } from "vitest";

import { closestTailwindToHex, hexToRgb, normalizeHex } from "./colors";

test.each([
  ["fff", "ffffff"],
  ["ffffff", "ffffff"],
])("normalizeHex(%s) -> %s", (input, expected) => {
  expect(normalizeHex(input)).toBe(expected);
});

test.each([["d6d3d1", { R: 214, G: 211, B: 209 }]])(
  "hexToRgb(%s) -> %j",
  (input, expected) => {
    expect(hexToRgb(input)).toStrictEqual(expected);
  }
);

test.each([
  ["000000", { tailwind: "black", hex: "000000", truncatedDiff: 0 }],
  ["ffffff", { tailwind: "white", hex: "ffffff", truncatedDiff: 0 }],
  ["93c5fd", { tailwind: "blue-300", hex: "93c5fd", truncatedDiff: 0 }],
  ["701a75", { tailwind: "fuchsia-900", hex: "701a75", truncatedDiff: 0 }],
  ["9101ec", { tailwind: "purple-600", hex: "9333ea", truncatedDiff: 4 }],
  ["123c2d", { tailwind: "emerald-950", hex: "022c22", truncatedDiff: 5 }],
])("closestTailwindToHex(%s) -> %j", (input, expected) => {
  const closestTailwind = closestTailwindToHex(input);

  expect(closestTailwind.tailwind).toBe(expected.tailwind);
  expect(closestTailwind.hex).toBe(expected.hex);
  expect(Math.trunc(closestTailwind.diff)).toBe(expected.truncatedDiff);
});
