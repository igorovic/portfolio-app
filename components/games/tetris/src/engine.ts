import { Block } from "./block";
import { basic } from "./blocks";
import { DevTools } from "./devtools";
import { Maybe, MaybeContext } from "./types";

export type TetrisEngineOptions = {
  canvasId: string;
};
export class TetrisEngine {
  config: TetrisEngineOptions;
  ctx: MaybeContext;
  state: "IDLE" | "INITIALIZED" | "RUNNING" | "PAUSED" | "STOPPED" = "IDLE";
  movXstep = 8;
  movYstep = 8;
  movX: Maybe<"l" | "r">;
  movY: Maybe<"d">;
  startTimestamp: Maybe<number> = null;
  previousTimestamp: Maybe<number> = null;
  blocks = new Map<string, Block>();
  constructor(options: TetrisEngineOptions) {
    this.config = options;
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
        this.movY = "d";
      }
    });
    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        this.movX = null;
      } else if (e.key === "ArrowDown") {
        this.movY = null;
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
      if (this.ctx) this.blocks.set("currentBlock", basic(this.ctx));
    }
    if (this.state !== "RUNNING") {
      console.debug("start");
      this.state = "RUNNING";
      window.requestAnimationFrame(this.gameLoop);
    } else {
      console.debug("pause");
      this.state = "PAUSED";
    }
  }

  gameLoop: FrameRequestCallback = (timestamp) => {
    if (this.startTimestamp === undefined) {
      this.startTimestamp = timestamp;
    }
    if (this.previousTimestamp !== timestamp && this.state !== "RUNNING") {
      const currentBlock = this.blocks.get("currentBlock");
      this.clearAll();
      if (this.movX === "r") {
        currentBlock?.moveRight(this.movXstep);
      } else if (this.movX === "l") {
        currentBlock?.moveLeft(this.movXstep);
      }
      currentBlock?.moveDown(this.movYstep);
      currentBlock?.render();
    }

    this.previousTimestamp = timestamp;
    window.requestAnimationFrame(this.gameLoop);
  };

  get devtools() {
    this.initialize();
    return new DevTools(this.ctx);
  }
}
