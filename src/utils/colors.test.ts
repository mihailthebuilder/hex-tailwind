import { expect, test } from "vitest";

import { hexToRgb, normalizeHex } from "./colors";

test("normalizeHex with 3 characters", () => {
  expect(normalizeHex("FFF")).toBe("FFFFFF");
});

test("normalizeHex with 6 characters", () => {
  expect(normalizeHex("FFFFFF")).toBe("FFFFFF");
});

test("hexToRgb", () => {
  expect(hexToRgb("D6D3D1")).toStrictEqual({ red: 214, green: 211, blue: 209 });
});
