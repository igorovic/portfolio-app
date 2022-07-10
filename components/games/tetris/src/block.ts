export function drawBlock(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.rect(0, 0, 32, 32);
  ctx.stroke();
}

export class Block {
  x: number = 0;
  y: number = 0;
  w: number = 30;
  h: number = 30;
  ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D, width?: number, height?: number) {
    this.ctx = ctx;
    this.w = width ?? this.w;
    this.h = height ?? this.h;
  }
  draw() {
    console.debug("draw", this.x, this.y, this.w, this.h);
    this.ctx.strokeRect(this.x, this.y, this.w, this.h);
    /* this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.w, this.h);
    this.ctx.stroke(); */
  }

  moveRight() {
    this.ctx.clearRect(this.x, this.y, this.w + 2, this.h + 2);
    this.x += 32;
    this.draw();
  }
  moveLeft() {
    this.ctx.clearRect(this.x, this.y, this.w + 2, this.h + 2);
    this.x -= 32;
    this.draw();
  }
}
