import { Shape } from "./types";

export const canvasId = "canva";
export const initialShape: Shape = {
  x: 0,
  y: 0,
  w: 32,
  h: 32,
  // corner radius
  rtl: 0, // top left
  rtr: 0, // top right
  rbl: 0, // bottom left
  rbr: 0, // bottom right
  //fill: "rgba(44, 122, 156, 1)",
  stroke: "#000000",
};
