import { BlockOptions, Constraints, XY } from "./types";

const defaultOptions = {
  style: {
    fill: "#4d76f2",
    paddingRatio: 0.05,
  },
};

export class Block {
  x: number = 0;
  y: number = 0;
  w: number = 32;
  h: number = 32;
  // padding
  p: number;
  // border radius
  r: number;
  ctx: CanvasRenderingContext2D;
  parent: Block | null = null;
  children: Array<Block> = [];
  options: BlockOptions & typeof defaultOptions;
  constructor(
    ctx: CanvasRenderingContext2D,
    options: BlockOptions = defaultOptions
  ) {
    this.ctx = ctx;
    this.options = options as BlockOptions & typeof defaultOptions;
    const blockW = Math.round(this.ctx.canvas.clientWidth / 10);
    const blockH = Math.round(this.ctx.canvas.clientHeight / 20);
    this.w = blockW;
    this.h = blockH;
    this.p = blockW * this.options.style.paddingRatio;
    this.r = blockW * 0.05;
  }
  get X() {
    return this.x + this.p;
  }
  get Y() {
    return this.y + this.p;
  }
  get W() {
    return this.w - 2 * this.p;
  }
  get H() {
    return this.h - 2 * this.p;
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
    this.ctx.clearRect(this.x, this.y, this.w, this.h);
    this.children.forEach((c) => c.clearSelf());
  }
  render() {
    if (this.parent) {
      const constraints = this.parent.constraints;
      this.x = constraints.x;
      this.y = constraints.y;
      this.w = constraints.w;
      this.h = constraints.h;
    }
    //this.clearSelf();
    this.ctx.beginPath();
    this.ctx.moveTo(this.topLeft.x + this.r, this.topLeft.y);
    this.ctx.lineTo(this.topRight.x - this.r, this.topRight.y);
    this.ctx.quadraticCurveTo(
      ...this.topRight.xy,
      this.topRight.x,
      this.topRight.y + this.r
    );
    this.ctx.lineTo(this.bottomRight.x, this.bottomRight.y - this.r);
    this.ctx.quadraticCurveTo(
      ...this.bottomRight.xy,
      this.bottomRight.x - this.r,
      this.bottomRight.y
    );
    this.ctx.lineTo(this.bottomLeft.x + this.r, this.bottomLeft.y);
    this.ctx.quadraticCurveTo(
      ...this.bottomLeft.xy,
      this.bottomLeft.x,
      this.bottomLeft.y - this.r
    );
    this.ctx.lineTo(this.topLeft.x, this.topLeft.y + this.r);
    this.ctx.quadraticCurveTo(
      ...this.topLeft.xy,
      this.topLeft.x + this.r,
      this.topLeft.y
    );
    this.ctx.closePath();
    this.ctx.fillStyle = this.options.style.fill;
    this.ctx.fill();
    this.children.forEach((c) => c.render());

    // this.ctx.fillStyle = "#c2d0fc";
    // this.ctx.beginPath();
    // this.ctx.ellipse(
    //   this.w / 2,
    //   this.h / 2,
    //   this.w / 4.5,
    //   this.h / 4.5,
    //   Math.PI * 2,
    //   0,
    //   Math.PI * 2
    // );
    // this.ctx.fill();
  }

  appendChild(C: Block) {
    C.parent = this;
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
