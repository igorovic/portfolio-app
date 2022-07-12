import { Brick } from "./blocks/block";
import { TetrisEngine } from "./engine";
import { MaybeContext } from "./types";

export class DevTools {
  ctx: MaybeContext;
  engine: TetrisEngine;
  constructor(ctx: MaybeContext, engine: TetrisEngine) {
    this.ctx = ctx;
    this.engine = engine;
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
    const B = new Brick(this.ctx);
    B.render();
  }

  drawNestedBlocks() {
    if (!this.ctx) return;
    this.clearCanvas();
    const B = new Brick(this.ctx);
    B.appendChild(
      new Brick(this.ctx, { style: { fill: "#c2d0fc", paddingRatio: 0.25 } })
    );
    B.render();
  }

  showGameMatrix() {
    console.debug(this.engine.matrix);
  }
}
