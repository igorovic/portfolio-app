import { Block } from "./block";

export function render(ctx: CanvasRenderingContext2D, block: Block) {
  switch (true) {
    case block.options.shape === undefined:
      break;
    case block.options.shape === "square":
      ctx.rect(block.X, block.Y, block.W, block.H);
      if (block.options.style?.fill) {
        ctx.fillStyle = block.options.style.fill;
        ctx.fill();
      }
      break;
    case block.options.shape === "squareRounded":
      ctx.beginPath();
      ctx.moveTo(block.topLeft.x + block.cornerRadius, block.topLeft.y);
      ctx.lineTo(block.topRight.x - block.cornerRadius, block.topRight.y);
      ctx.quadraticCurveTo(
        ...block.topRight.xy,
        block.topRight.x,
        block.topRight.y + block.cornerRadius
      );
      ctx.lineTo(block.bottomRight.x, block.bottomRight.y - block.cornerRadius);
      ctx.quadraticCurveTo(
        ...block.bottomRight.xy,
        block.bottomRight.x - block.cornerRadius,
        block.bottomRight.y
      );
      ctx.lineTo(block.bottomLeft.x + block.cornerRadius, block.bottomLeft.y);
      ctx.quadraticCurveTo(
        ...block.bottomLeft.xy,
        block.bottomLeft.x,
        block.bottomLeft.y - block.cornerRadius
      );
      ctx.lineTo(block.topLeft.x, block.topLeft.y + block.cornerRadius);
      ctx.quadraticCurveTo(
        ...block.topLeft.xy,
        block.topLeft.x + block.cornerRadius,
        block.topLeft.y
      );
      ctx.closePath();

      if (block.options.style?.fill) {
        ctx.fillStyle = block.options.style.fill;
        ctx.fill();
      }
      break;
    default:
      console.error("Not implemented");
  }
}
