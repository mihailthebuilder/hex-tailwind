import { expect, test } from "vitest";

import { hexToRgb, normalizeHex } from "./colors";

test("normalizeHex with 3 characters", () => {
  expect(normalizeHex("FFF")).toBe("#FFFFFF");
});

test("normalizeHex with 6 characters", () => {
  expect(normalizeHex("FFFFFF")).toBe("#FFFFFF");
});
