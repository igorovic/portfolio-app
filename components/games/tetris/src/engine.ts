import type { Block } from "./blocks/block";
import { Brick2 } from "./blocks";
import { DevTools } from "./devtools";
import { CanvasContext, Maybe, MaybeContext } from "./types";

export type TetrisEngineOptions = {
  canvasId: string;
};

type LineIndex = number;
type ColIndex = number;
type Cols = Map<ColIndex, Brick2 | null>;
type Matrix = Map<LineIndex, Cols>;

export class TetrisEngine {
  config: TetrisEngineOptions;
  ctx: MaybeContext;
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
  matrix: Matrix;

  constructor(options: TetrisEngineOptions) {
    this.config = options;
    const cols = new Map(Array(10).fill(null, 0, 10).entries());
    this.matrix = new Map<number, Cols>(Array(20).fill(cols, 0, 20).entries());
  }
  initialize() {
    const canvas = document.getElementById(
      this.config.canvasId
    ) as HTMLCanvasElement;

    this.ctx = canvas?.getContext("2d");
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        this.movX = "r";
      } else if (e.key === "ArrowLeft") {
        this.movX = "l";
      } else if (e.key === "ArrowDown") {
        this.yStepTimeLapse = 160;
      }
    });
    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        this.movX = null;
      } else if (e.key === "ArrowDown") {
        this.yStepTimeLapse = 800;
      }
    });
  }
  clearAll() {
    this.ctx?.clearRect(
      0,
      0,
      this.ctx.canvas.clientWidth,
      this.ctx.canvas.clientHeight
    );
  }
  start_pause() {
    if (this.state === "IDLE") {
      console.debug("initialize");
      this.initialize();
      this.state = "INITIALIZED";
    }
    if (this.state === "INITIALIZED") {
      if (this.ctx) this.blocks.set("currentBlock", new Brick2(this.ctx));
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
      currentBlock?.render();

      if (this.touchBottom(currentBlock)) {
        this.blocks.set("currentBlock", new Brick2(this.ctx as CanvasContext));
      }
    }

    this.previousTimestamp = timestamp;
    window.requestAnimationFrame(this.gameLoop);
  };

  get devtools() {
    this.initialize();
    return new DevTools(this.ctx, this);
  }
}
