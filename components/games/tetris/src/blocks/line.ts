import { BlockOptions } from "../types";
import { Block } from "./block";
import Brick from "./brick";

function Line(ctx: CanvasRenderingContext2D) {
  const w = ctx.canvas.clientWidth / 10;
  const h = ctx.canvas.clientHeight / 20;
  const options: BlockOptions = {
    name: "Line",
    layout: "horizontal",
    width: w * 4,
    height: h,
  };
  const line = new Block(options, [
    Brick(ctx, { name: "b1" }),
    Brick(ctx, { name: "b2" }),
    Brick(ctx, { name: "b3" }),
    Brick(ctx, { name: "b4" }),
  ]);
  return line;
}

export default Line;
