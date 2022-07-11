import { Block } from "./block";
import { MaybeContext } from "./types";

export class DevTools {
  ctx: MaybeContext;
  constructor(ctx: MaybeContext) {
    this.ctx = ctx;
  }

  clearCanvas() {
    if (!this.ctx) return;
    this.ctx.clearRect(
      0,
      0,
      this.ctx.canvas.clientWidth,
      this.ctx.canvas.clientHeight
    );
  }

  drawBlock() {
    if (!this.ctx) return;
    this.clearCanvas();
    const B = new Block(this.ctx);
    B.render();
  }

  drawNestedBlocks() {
    if (!this.ctx) return;
    this.clearCanvas();
    const B = new Block(this.ctx);
    B.appendChild(
      new Block(this.ctx, { style: { fill: "#c2d0fc", paddingRatio: 0.25 } })
    );
    B.render();
  }
}
