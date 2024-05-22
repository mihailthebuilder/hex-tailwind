import { expect, test } from "vitest";

import { closestTailwindToHex, hexToRgb, normalizeHex } from "./colors";

test("normalizeHex with 3 characters", () => {
  expect(normalizeHex("FFF")).toBe("FFFFFF");
});

test("normalizeHex with 6 characters", () => {
  expect(normalizeHex("FFFFFF")).toBe("FFFFFF");
});

test("hexToRgb", () => {
  expect(hexToRgb("D6D3D1")).toStrictEqual({ R: 214, G: 211, B: 209 });
});

test("closestTailwindToHex", () => {
  const testCases = [
    ["000000", "black"],
    ["FFFFFF", "white"],
  ];

  testCases.forEach((testCase) => {
    const [input, expected] = testCase;

    expect(closestTailwindToHex(input as string)).toBe(expected as string);
  });
});
