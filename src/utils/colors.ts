import colors from "tailwindcss/colors";
import type { DefaultColors } from "tailwindcss/types/generated/colors";
import { closest } from "color-diff";

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

const TailwindRgbColors = RgbToTailwindMap.keys();

export const closestTailwindToHex = (hex: string) => {
  const normalizedHex = normalizeHex(hex);
  const gotRgb = hexToRgb(normalizedHex);

  const closestRgb = closest(gotRgb, TailwindRgbColors) as Rgb;

  const closestTailwind = RgbToTailwindMap.get(closestRgb);

  if (closestTailwind === undefined) {
    throw Error("couldn't find closest tailwind");
  }

  return closestTailwind;
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
