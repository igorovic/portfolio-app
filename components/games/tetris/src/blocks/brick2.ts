import { Brick } from "./brick";
import { CanvasContext } from "../types";

export class Brick2 extends Brick {
  constructor(ctx: CanvasContext) {
    super(ctx);
    this.appendChild(
      new Brick(ctx, {
        style: { fill: "#c2d0fc", paddingRatio: 0.25 },
      })
    );
  }
}
