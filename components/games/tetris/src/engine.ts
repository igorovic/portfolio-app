import { Block } from "./block";

export type TetrisEngineOptions = {
  canvasId: string;
};
export class TetrisEngine {
  config: TetrisEngineOptions;
  ctx: CanvasRenderingContext2D | undefined | null;
  state: "RUNNING" | "PAUSED" | "STOPPED" = "STOPPED";
  blocks = new Map<string, Block>();
  constructor(options: TetrisEngineOptions) {
    this.config = options;
  }
  start() {
    const canvas = document.getElementById(
      this.config.canvasId
    ) as HTMLCanvasElement;

    this.ctx = canvas?.getContext("2d");
    this.ctx?.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    if (this.state !== "RUNNING") {
      this.state = "RUNNING";

      if (this.ctx) {
        const B = new Block(this.ctx);
        this.blocks.set("currentBlock", B);
        B.draw();
      }
      document.addEventListener("keydown", (e) => {
        console.log(e);
        const B = this.blocks.get("currentBlock");
        if (e.key === "ArrowRight") {
          B?.moveRight();
        } else if (e.key === "ArrowLeft") {
          B?.moveLeft();
        }
      });
    }
  }
}
