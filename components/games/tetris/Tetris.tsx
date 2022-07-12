import React from "react";
import { Button } from "@mantine/core";
import Game from "./Game";
import { TetrisEngine } from "./src/engine";
function Tetris() {
  const tetris = new TetrisEngine({ canvasId: "tetris" });
  return (
    <div>
      <h2>Tetris</h2>
      <div className="p-2 bg-slate-300 w-min rounded-md">
        <Game width={700} />
        <Button onClick={() => tetris.start_pause()}>start</Button>
        {process.env.NODE_ENV !== "production" ? (
          <div className="absolute top-16 right-0 mx-2 flex flex-col gap-2">
            <p className="font-semibold test-base">DevTools</p>
            <Button onClick={() => tetris.devtools.drawBlock()}>
              draw Block
            </Button>
            <Button onClick={() => tetris.devtools.drawBlockWithChild()}>
              draw Block with child
            </Button>
            <Button onClick={() => tetris.devtools.drawBrick()}>
              draw Brick
            </Button>
            <Button onClick={() => tetris.devtools.drawBrick2()}>
              draw Brick2
            </Button>
            <Button onClick={() => tetris.devtools.drawLine()}>
              draw line
            </Button>
            <Button onClick={() => tetris.devtools.debugCurrentBlock()}>
              debug currentBlock
            </Button>
            <Button onClick={() => tetris.devtools.showGameMatrix()}>
              debug matrix
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Tetris;
