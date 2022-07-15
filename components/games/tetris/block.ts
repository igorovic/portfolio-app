export function drawBlock(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.rect(0, 0, 32, 32);
  ctx.stroke();
}

export class Block {
  x: number = 0;
  y: number = 0;
  ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, 32, 32);
    this.ctx.stroke();
  }
}
