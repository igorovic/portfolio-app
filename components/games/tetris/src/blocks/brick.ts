import { BlockOptions } from "../types";
import { Block } from "./block";

const defaultOptions = {
  style: {
    fill: "#4d76f2",
    paddingRatio: 0.05,
  },
};

type BrickOptions = BlockOptions & typeof defaultOptions;

export class Brick extends Block {
  // border radius
  r: number;
  _options: BrickOptions;

  constructor(ctx: CanvasRenderingContext2D, options: BlockOptions = {}) {
    super(ctx, options);
    this.ctx = ctx;
    this._options = { ...defaultOptions, ...options } as BrickOptions;

    this.pl =
      (this.parent ? this.parent.W : this.w) * this._options.style.paddingRatio;
    this.pr = this.pl;
    this.pt =
      (this.parent ? this.parent.H : this.h) * this._options.style.paddingRatio;
    this.pb = this.pt;
    this.r = this.w * 0.05;
  }

  render() {
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
    this.ctx.fillStyle = this._options.style.fill;
    this.ctx.fill();
    super.renderChildren();
  }
}
