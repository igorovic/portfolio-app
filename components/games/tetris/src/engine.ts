import type { Block } from "./blocks/block";
import Brick from "./blocks/brick";
import { DevTools } from "./devtools";
import { Maybe } from "./types";

export type TetrisEngineOptions = {
  canvasId: string;
};

type LineIndex = number;
type ColIndex = number;
type Cols = Map<ColIndex, Block | null>;
type Matrix = Map<LineIndex, Cols>;

export class TetrisEngine {
  //config: TetrisEngineOptions;
  //@ts-ignore
  ctx: CanvasRenderingContext2D;
  state: "IDLE" | "INITIALIZED" | "RUNNING" | "PAUSED" | "STOPPED" = "IDLE";
  xStepTimeLapse = 160;
  yStepTimeLapse = 800;
  movX: Maybe<"l" | "r">;
  movY: Maybe<"d">;
  verticalStepTimestamp: number = 0;
  lateralStepTimestamp: number = 0;
  startTimestamp: number = 0;
  previousTimestamp: number = 0;
  blocks = new Map<string, Block>();
  //matrix: Matrix;

  // constructor(options: TetrisEngineOptions) {
  //   this.config = options;
  //   const cols = new Map(Array(10).fill(null, 0, 10).entries());
  //   this.matrix = new Map<number, Cols>(Array(20).fill(cols, 0, 20).entries());
  // }
  keydown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      this.movX = "r";
    } else if (e.key === "ArrowLeft") {
      this.movX = "l";
    } else if (e.key === "ArrowDown") {
      this.yStepTimeLapse = 160;
    }
  };
  keyup = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      this.movX = null;
    } else if (e.key === "ArrowDown") {
      this.yStepTimeLapse = 800;
    }
  };
  initialize(canvasId: string) {
    this.state = "INITIALIZED";
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");
    if (!ctx) {
      throw new Error(`could not find HTMLCanvasElement id:${canvasId}`);
    }
    this.ctx = ctx;
    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
  }
  dispose() {
    this.state = "IDLE";
    document.removeEventListener("keydown", this.keydown);
    document.removeEventListener("keyup", this.keyup);
  }
  clearAll() {
    this.ctx?.clearRect(
      0,
      0,
      this.ctx.canvas.clientWidth,
      this.ctx.canvas.clientHeight
    );
  }
  get context(): CanvasRenderingContext2D {
    return this.ctx;
  }
  start_pause() {
    if (this.state === "INITIALIZED") {
      if (this.ctx) this.blocks.set("currentBlock", Brick(this.ctx));
    }
    if (this.state !== "RUNNING") {
      console.info("start");
      this.state = "RUNNING";
      window.requestAnimationFrame(this.gameLoop);
    } else {
      console.info("pause");
      this.state = "PAUSED";
    }
  }

  touchRightEdge(block: Maybe<Block>) {
    if (!block || !this.ctx) return false;
    return block.x + block.w >= this.ctx.canvas.clientWidth;
  }
  touchLeftEdge(block: Maybe<Block>) {
    if (!block) return false;
    return 0 >= block.x;
  }
  touchBottom(block: Maybe<Block>) {
    if (!block || !this.ctx) return false;
    return block.y + block.h >= this.ctx.canvas.clientHeight;
  }

  gameLoop: FrameRequestCallback = (timestamp) => {
    if (this.startTimestamp === 0) {
      this.startTimestamp = timestamp;
    }
    this.verticalStepTimestamp += timestamp - this.previousTimestamp;
    this.lateralStepTimestamp += timestamp - this.previousTimestamp;
    if (this.previousTimestamp !== timestamp && this.state === "RUNNING") {
      const currentBlock = this.blocks.get("currentBlock");
      this.clearAll();

      // lateral movements
      if (this.lateralStepTimestamp >= this.xStepTimeLapse) {
        if (this.movX === "r" && !this.touchRightEdge(currentBlock)) {
          currentBlock?.moveRight(currentBlock.w);
        } else if (this.movX === "l" && !this.touchLeftEdge(currentBlock)) {
          currentBlock?.moveLeft(currentBlock.w);
        }
        this.lateralStepTimestamp = 0;
      }
      // Vertical movements
      if (
        !this.touchBottom(currentBlock) &&
        this.verticalStepTimestamp >= this.yStepTimeLapse
      ) {
        currentBlock?.moveDown(currentBlock.h);
        this.verticalStepTimestamp = 0;
      }
      currentBlock?.render(this.context);

      if (this.touchBottom(currentBlock)) {
        this.blocks.set("currentBlock", Brick(this.ctx));
      }
    }

    this.previousTimestamp = timestamp;
    window.requestAnimationFrame(this.gameLoop);
  };
}

const engine = new TetrisEngine();
const dev = new DevTools(engine);

export default engine;
export { dev as devtools };
