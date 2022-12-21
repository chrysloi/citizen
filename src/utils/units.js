import { Dimensions } from "react-native";

const Dimension = ({ width, height } = Dimensions.get("screen"));

export const vw = width / 100;
export const vh = height / 100;
export const vmin = Math.min(vw, vh);
export const vmax = Math.max(vw, vh);
