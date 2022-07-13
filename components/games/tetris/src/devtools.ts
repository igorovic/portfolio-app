import Line from "./blocks/line";
import Brick from "./blocks/brick";
import { TetrisEngine } from "./engine";

import { Block } from "./blocks/block";
import { BlockOptions } from "./types";

export class DevTools {
  engine: TetrisEngine;
  constructor(engine: TetrisEngine) {
    this.engine = engine;
  }

  clearCanvas() {
    this.engine.context.clearRect(
      0,
      0,
      this.engine.context.canvas.clientWidth,
      this.engine.context.canvas.clientHeight
    );
  }

  drawSquare() {
    this.clearCanvas();
    const ctx = this.engine.context;
    const B = new Block({
      shape: "square",
      width: ctx.canvas.clientWidth / 10,
      height: ctx.canvas.clientHeight / 20,
      style: { fill: "#00af00" },
    });
    console.debug(B);
    B.render(ctx);
  }

  drawRoundedSquare() {
    this.clearCanvas();
    const ctx = this.engine.context;
    const options: BlockOptions = {
      shape: "squareRounded",
      width: ctx.canvas.clientWidth / 10,
      height: ctx.canvas.clientHeight / 20,
      cornerRadius: (ctx.canvas.clientWidth / 10) * 0.15,
      style: { fill: "#00af00" },
    };
    const B = new Block(options);
    console.debug(B);
    B.render(ctx);
    const B2 = new Block({
      ...options,
      position: {
        x: ctx.canvas.clientWidth / 10 + 22,
        y: 0,
      },
    });
    console.debug(B2);
    B2.render(ctx);
    const B3 = new Block({
      ...options,
      position: {
        x: (ctx.canvas.clientWidth / 10) * 3,
        y: 0,
      },
      padding: 4,
    });
    B3.name = "square-rounded-with-padding";
    console.debug(B3);
    B3.render(ctx);
  }

  drawBlockWithChild() {
    this.clearCanvas();
    const ctx = this.engine.context;
    const options: BlockOptions = {
      shape: "squareRounded",
      width: ctx.canvas.clientWidth / 10,
      height: ctx.canvas.clientHeight / 20,
      cornerRadius: (ctx.canvas.clientWidth / 10) * 0.15,
      style: { fill: "#00af00" },
      padding: 6,
    };
    const C1 = new Block({
      ...options,
      style: { fill: "#ac0120" },
    });
    const B = new Block(options, [C1]);
    B.render(ctx);
    console.debug(B);
  }

  drawBrick() {
    this.clearCanvas();
    const ctx = this.engine.context;
    this.clearCanvas();
    const B = Brick(ctx);
    B.render(ctx);
  }

  // showGameMatrix() {
  //   console.debug(this.engine.matrix);
  // }

  drawLine() {
    const ctx = this.engine.context;
    this.clearCanvas();
    const L = Line(ctx);
    console.debug(L);
    L.render(ctx);
  }

  debugCurrentBlock() {
    console.debug("currentBlock", this.engine.blocks.get("currentBlock"));
  }
}
