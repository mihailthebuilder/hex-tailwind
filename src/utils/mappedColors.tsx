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
