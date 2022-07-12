import { Brick } from "./block";
import { BlockOptions, CanvasContext } from "../types";

export function basic(ctx: CanvasContext) {
  const B = new Brick(ctx);
  B.appendChild(
    new Brick(ctx, {
      style: { fill: "#c2d0fc", paddingRatio: 0.25 },
    })
  );
  return B;
}

export function Line(ctx: CanvasContext) {
  const B1 = new Brick(ctx);
  const B2 = new Brick(ctx);
}
