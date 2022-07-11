import { Block } from "../block";
import { CanvasContext } from "../types";

export function basic(ctx: CanvasContext) {
  const B = new Block(ctx);
  B.appendChild(
    new Block(ctx, { style: { fill: "#c2d0fc", paddingRatio: 0.25 } })
  );
  return B;
}
