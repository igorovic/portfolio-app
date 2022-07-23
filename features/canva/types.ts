export interface Shape {
  x: number;
  y: number;
  w: number;
  h: number;
  // corner radius
  rtl: number; // top left
  rtr: number; // top right
  rbl: number; // bottom left
  rbr: number; // bottom right
  fill?: string;
  stroke?: string;
}
