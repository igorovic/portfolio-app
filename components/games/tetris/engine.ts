import { Block, drawBlock } from "./block";

class GameEngine {
  state: "RUNNING" | "PAUSED" | "STOPPED" = "STOPPED";
  ctx: CanvasRenderingContext2D | null = null;
  init(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  start() {
    if (this.state !== "RUNNING") {
      window.setInterval(this.run, 1000);
    }
  }

  run() {
    console.log("running");

    this.ctx?.clearRect(
      0,
      0,
      this.ctx.canvas.clientWidth,
      this.ctx.canvas.clientHeight
    );
    if (this.ctx) {
      console.log("add block");
      const b = new Block(this.ctx);
      b.draw();
    }
  }
}

const G = new GameEngine();
export default G;
