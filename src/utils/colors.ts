import colors from "tailwindcss/colors";
import type { DefaultColors } from "tailwindcss/types/generated/colors";

// @ts-ignore
import { closest, diff } from "color-diff";

type Rgb = { R: number; G: number; B: number };
type RgbMap = Map<Rgb, string>;

export const hexToRgb: (hex: string) => Rgb = (hex) => {
  // https://github.com/sindresorhus/hex-rgb/blob/main/index.js

  const number = Number.parseInt(hex, 16);
  const red = number >> 16;
  const green = (number >> 8) & 255;
  const blue = number & 255;

  return { R: red, G: green, B: blue };
};

const rgbToTailwindMap: (colors: DefaultColors) => RgbMap = (colors) => {
  let importedColors = JSON.parse(JSON.stringify(colors));

  delete importedColors.inherit;
  delete importedColors.transparent;
  delete importedColors.current;
  delete importedColors.lightBlue;
  delete importedColors.warmGray;
  delete importedColors.trueGray;
  delete importedColors.coolGray;
  delete importedColors.blueGray;

  const out = new Map<Rgb, string>();

  out.set(hexToRgb("000000"), "black");
  delete importedColors.black;

  out.set(hexToRgb("ffffff"), "white");
  delete importedColors.white;

  type TailwindColorsToMap = Omit<
    DefaultColors,
    | "inherit"
    | "transparent"
    | "current"
    | "lightBlue"
    | "warmGray"
    | "trueGray"
    | "coolGray"
    | "trueGray"
    | "white"
    | "black"
  >;

  const colorsToMap = importedColors as TailwindColorsToMap;

  Object.keys(colorsToMap).forEach((color) => {
    const tailwindShadesForGivenColor = colorsToMap[color as "stone"];

    Object.keys(tailwindShadesForGivenColor).forEach((shade) => {
      const hex = tailwindShadesForGivenColor[shade as "50"].slice(1);
      out.set(hexToRgb(hex), `${color}-${shade}`);
    });
  });

  return out;
};

const RgbToTailwindMap = rgbToTailwindMap(colors);

const TailwindRgbColors = Array.from(RgbToTailwindMap.keys());

function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgb: Rgb) {
  return componentToHex(rgb.R) + componentToHex(rgb.G) + componentToHex(rgb.B);
}

export const closestTailwindToHex = (hex: string) => {
  const normalizedHex = normalizeHex(hex);
  const gotRgb = hexToRgb(normalizedHex);

  const closestTailwindRgb = closest(gotRgb, TailwindRgbColors) as Rgb;
  const closestTailwindDiff = diff(gotRgb, closestTailwindRgb) as number;
  const closestTailwindHex = rgbToHex(closestTailwindRgb);

  const closestTailwind = RgbToTailwindMap.get(closestTailwindRgb);
  if (closestTailwind === undefined) {
    throw Error("couldn't find closest tailwind");
  }

  return {
    tailwind: closestTailwind,
    hex: closestTailwindHex,
    diff: closestTailwindDiff,
  };
};

export const normalizeHex = (hex: string) => {
  let normalizedHex = hex;

  if (normalizedHex.length == 3) {
    normalizedHex = normalizedHex
      .split("")
      .map((x) => x + x)
      .join("");
  }

  return normalizedHex;
};
