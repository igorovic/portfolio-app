import { BlockOptions } from "../types";
import { Block } from "./block";

function Brick(ctx: CanvasRenderingContext2D, params: BlockOptions = {}) {
  const options: BlockOptions = {
    shape: "squareRounded",
    width: ctx.canvas.clientWidth / 10,
    height: ctx.canvas.clientHeight / 20,
    cornerRadius: (ctx.canvas.clientWidth / 10) * 0.15,
    style: { fill: "#4d76f2" },
    padding: 2,
  };
  const brick = new Block({ ...options, ...params }, [
    new Block({
      ...options,
      style: { fill: "#c2d0fc" },
      padding: 16,
    }),
  ]);
  return brick;
}

export default Brick;
