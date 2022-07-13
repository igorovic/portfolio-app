import { Line } from "./blocks/line";
import { Brick } from "./blocks/brick";
import { TetrisEngine } from "./engine";
import { MaybeContext } from "./types";
import { Brick2 } from "./blocks";
import { Block } from "./blocks/block";

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
    const B = new Block(this.ctx);
    B.render = () => {
      B.ctx.rect(...B.topLeft.xy, ...B.bottomRight.xy);
      B.ctx.fillStyle = "#cecece";
      B.ctx.fill();
    };
    console.debug(B);
    B.render();
  }
  drawBlockWithChild() {
    if (!this.ctx) return;
    const B = new Block(this.ctx, { padding: 16 });
    B.render = () => {
      console.debug(...B.topLeft.xy, B.W, B.H);
      B.ctx.rect(...B.topLeft.xy, B.W, B.H);
      B.ctx.fillStyle = "#00ff00";
      B.ctx.fill();
    };

    const B2 = new Block(this.ctx, { padding: 16 });
    B2.render = () => {
      console.debug(...B2.topLeft.xy, B2.W, B2.H);
      B2.ctx.rect(...B2.topLeft.xy, B2.W, B2.H);
      B2.ctx.fillStyle = "#ac00fe";
      B2.ctx.fill();
    };
    B.appendChild(B2);
    console.debug(B);
    console.debug("B2", B2);
    B.render();
    B.renderChildren();
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
