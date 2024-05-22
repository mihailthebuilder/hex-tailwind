import colors from "tailwindcss/colors";
import type { DefaultColors } from "tailwindcss/types/generated/colors";

let copiedColors = JSON.parse(JSON.stringify(colors));

delete copiedColors.inherit;
delete copiedColors.transparent;
delete copiedColors.current;
delete copiedColors.lightBlue;
delete copiedColors.warmGray;
delete copiedColors.trueGray;
delete copiedColors.coolGray;
delete copiedColors.blueGray;

type ColoursToMap = Omit<
  DefaultColors,
  | "inherit"
  | "transparent"
  | "current"
  | "lightBlue"
  | "warmGray"
  | "trueGray"
  | "coolGray"
  | "trueGray"
>;

let colorsToMap = copiedColors as ColoursToMap;

export const hexToTailwind = (hex: string) => {
  const normalizedHex = normalizeHex(hex);
  const rgb = hexToRgb(normalizedHex);

  // const inputLab = rgbToLab(hexToRgb(normalizeHex(hex)));

  // const closestColor = labColors
  //   .map((color) => ({
  //     ...color,
  //     deltaE: deltaE(inputLab, color.lab).toFixed(2),
  //   }))
  //   .sort((a, b) => a.deltaE - b.deltaE)[0];

  // return {
  //   tailwind: `${closestColor.main}-${closestColor.sub}`,
  //   tailwindHex: closestColor.hex,
  //   deltaE: closestColor.deltaE,
  // };
};

export const normalizeHex = (hex: string) => {
  let normalizedHex = hex;

  if (normalizedHex.length == 3) {
    normalizedHex = normalizedHex
      .split("")
      .map((x) => x + x)
      .join("");
  }

  return "#" + normalizedHex;
};

export const hexToRgb = (hex: string) => {
  // https://github.com/sindresorhus/hex-rgb/blob/main/index.js

  const number = Number.parseInt(hex, 16);
  const red = number >> 16;
  const green = (number >> 8) & 255;
  const blue = number & 255;

  return { red, green, blue };
};
