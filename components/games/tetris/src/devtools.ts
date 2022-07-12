import { Line } from "./blocks/line";
import { Brick } from "./blocks/brick";
import { TetrisEngine } from "./engine";
import { MaybeContext } from "./types";
import { Brick2 } from "./blocks";

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

  drawBrick() {
    if (!this.ctx) return;
    this.clearCanvas();
    const B = new Brick(this.ctx);
    B.render();
  }

  drawBrick2() {
    if (!this.ctx) return;
    this.clearCanvas();
    const B = new Brick2(this.ctx);
    console.debug(B);
    B.render();
  }

  showGameMatrix() {
    console.debug(this.engine.matrix);
  }

  drawLine() {
    if (!this.ctx) return;
    this.clearCanvas();
    const L = new Line(this.ctx);
    console.debug(L);
    L.render();
  }

  debugCurrentBlock() {
    console.debug("currentBlock", this.engine.blocks.get("currentBlock"));
  }
}
