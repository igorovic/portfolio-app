import { BlockOptions } from "../types";
import { Block } from "./block";
import Brick from "./brick";

function Line(ctx: CanvasRenderingContext2D) {
  const w = ctx.canvas.clientWidth / 10;
  const h = ctx.canvas.clientHeight / 20;
  const options: BlockOptions = {
    width: w * 4,
    height: h,
  };
  const line = new Block(options, [
    Brick(ctx, { width: w }),
    Brick(ctx, {
      width: w,
      height: h,
      position: {
        x: w,
        y: 0,
      },
    }),
    Brick(ctx, {
      width: w,
      height: h,
      position: {
        x: w * 2,
        y: 0,
      },
    }),
    Brick(ctx, {
      width: w,
      height: h,
      position: {
        x: w * 3,
        y: 0,
      },
    }),
  ]);
  return line;
}

export default Line;
