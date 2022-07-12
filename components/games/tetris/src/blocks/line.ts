import { Brick2 } from ".";
import { BlockOptions } from "../types";
import { Block } from "./block";

export type LineOrientation = "vertical" | "horizontal";
const defaultOptions = {
  length: 4,
};
export type LineOptions = BlockOptions & typeof defaultOptions;

export class Line extends Block {
  _options: LineOptions;
  orientation: LineOrientation = "horizontal";

  constructor(ctx: CanvasRenderingContext2D, options: BlockOptions = {}) {
    super(ctx, options);
    this._options = { ...defaultOptions, ...options } as LineOptions;

    for (let i = 0; i < this._options.length; i++) {
      const B = new Brick2(this.ctx);
      this.appendChild(B);
    }
  }

  render(): void {
    this.w = this.children.reduce((prev, B) => prev + B.w, 0);
    // split space between children
    // this.children.forEach((C) => {
    //   C.w = this.w / this.children.length;
    // });

    for (let i = 1; i < this.children.length; i++) {
      this.children[i].x = this.children[i - 1].x + this.children[i - 1].w;
    }

    this.renderChildren();
    //this.children[1].render();
  }
}
