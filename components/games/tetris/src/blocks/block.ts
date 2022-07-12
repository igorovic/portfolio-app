import { BlockOptions, Constraints, isCanvasSize, XY } from "../types";

export class Block {
  x: number = 0;
  y: number = 0;
  w: number = 32;
  h: number = 32;

  // padding
  pt: number;
  pb: number;
  pl: number;
  pr: number;

  canvasW: number;
  canvasH: number;
  ctx: CanvasRenderingContext2D;
  parent: Block | null = null;
  children: Array<Block> = [];
  options: BlockOptions;
  constructor(ctx: CanvasRenderingContext2D, options: BlockOptions = {}) {
    this.ctx = ctx;
    this.options = options;
    this.canvasW = this.ctx.canvas.clientWidth;
    this.canvasH = this.ctx.canvas.clientHeight;
    this.w = this.canvasW / 10;
    this.h = this.canvasH / 20;
    this.pt = 0;
    this.pb = 0;
    this.pl = 0;
    this.pr = 0;
  }
  get X() {
    return this.x + this.pl;
  }
  get Y() {
    return this.y + this.pt;
  }
  get W() {
    return this.w - this.pl - this.pr;
  }
  get H() {
    return this.h - this.pt - this.pb;
  }
  get topLeft(): XY {
    return { x: this.X, y: this.Y, xy: [this.X, this.Y] };
  }
  get topRight(): XY {
    return { x: this.X + this.W, y: this.Y, xy: [this.X + this.W, this.Y] };
  }
  get bottomRight(): XY {
    return {
      x: this.X + this.W,
      y: this.Y + this.H,
      xy: [this.X + this.W, this.Y + this.H],
    };
  }
  get bottomLeft(): XY {
    return { x: this.X, y: this.Y + this.H, xy: [this.X, this.Y + this.H] };
  }

  get constraints(): Constraints {
    return { x: this.X, y: this.Y, w: this.W, h: this.H };
  }
  clearSelf() {
    // TODO: does not properly clear self
    this.ctx.clearRect(this.x, this.y, this.w, this.h);
    this.children.forEach((c) => c.clearSelf());
  }

  render() {
    console.warn("Not implemented");
  }

  renderChildren() {
    this.children.forEach((c) => c.render());
  }

  appendChild(C: Block) {
    C.parent = this;
    const constraints = this.constraints;
    this.x = constraints.x;
    this.y = constraints.y;
    this.w = constraints.w / (this.children.length + 1);
    this.h = constraints.h;
    this.children.push(C);
  }

  moveRight(x: number) {
    this.x += x;
  }
  moveLeft(x: number) {
    this.x -= x;
  }
  moveDown(y: number) {
    this.y += y;
  }
}
