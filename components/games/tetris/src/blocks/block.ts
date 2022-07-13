import { TetrisEngine } from "../engine";
import { BlockOptions, Constraints, XY } from "../types";
import { render } from "./renderer";
import { isCanvasContext } from "./utils";

type Parent = CanvasRenderingContext2D | Block;

export class Block {
  // origin is top left corner
  x: number = 0;
  y: number = 0;
  // padding
  pt: number;
  pb: number;
  pl: number;
  pr: number;
  cornerRadius: number;

  options: BlockOptions;
  children: Array<Block> = [];
  parent: Block | null = null;

  constructor(options: BlockOptions, children: Block[] = []) {
    this.options = options;
    const padding = this.options?.padding;
    const paddings = this.options?.paddings;
    this.cornerRadius = options.cornerRadius ?? 0;
    this.pt = paddings?.pt ?? padding ?? 0;
    this.pb = paddings?.pb ?? padding ?? 0;
    this.pl = paddings?.pl ?? padding ?? 0;
    this.pr = paddings?.pr ?? padding ?? 0;
    if (this.options.position) {
      (this.x = this.options.position.x), (this.y = this.options.position.y);
    }
    this.children = children.map((C) => {
      C.parent = this;
      C.x = this.X;
      C.y = this.Y;
      return C;
    });
  }

  get X(): number {
    if (this.parent) {
      return this.parent.X + this.pl;
    }
    return this.x + this.pl;
  }
  get Y(): number {
    if (this.parent) {
      return this.parent.Y + this.pt;
    }
    return this.y + this.pt;
  }
  get w(): number {
    let _w = 0;
    if (this.parent) {
      _w = this.parent.topRight.x - this.parent.topLeft.x;
    } else {
      _w = this.options.width ?? 0;
    }
    return _w;
  }

  get h(): number {
    let _h = 0;
    if (this.parent) {
      _h = this.parent.bottomLeft.y - this.parent.topLeft.y;
    } else {
      _h = this.options.height ?? 0;
    }
    return _h;
  }

  get W(): number {
    return Math.max(0, this.w - this.pl - this.pr);
  }
  get H(): number {
    return Math.max(0, this.h - this.pl - this.pr);
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

  render(ctx: CanvasRenderingContext2D) {
    render(ctx, this);
    this.children.forEach((c) => c.render(ctx));
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
  name: string = "Block";
}
