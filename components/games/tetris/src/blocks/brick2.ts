import { Brick } from "./brick";
import { BlockOptions, CanvasContext } from "../types";

type BrickOptions = BlockOptions;
export class Brick2 extends Brick {
  constructor(ctx: CanvasContext, options: BrickOptions = {}) {
    super(ctx, { padding: 2 });
    this.appendChild(
      new Brick(ctx, {
        style: { fill: "#c2d0fc" },
        paddings: {
          pt: this.H * 0.25,
          pb: this.H * 0.25,
          pl: this.W * 0.25,
          pr: this.W * 0.25,
        },
      })
    );
  }
}
