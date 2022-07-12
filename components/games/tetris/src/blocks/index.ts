import { Block } from "./block";
import { BlockOptions, CanvasContext } from "../types";

export function basic(ctx: CanvasContext) {
  const B = new Block(ctx);
  B.appendChild(
    new Block(ctx, {
      style: { fill: "#c2d0fc", paddingRatio: 0.25 },
    })
  );
  return B;
}

export function Line(ctx: CanvasContext) {
  const B1 = new Block(ctx);
  const B2 = new Block(ctx);
}
