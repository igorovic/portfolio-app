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
              draw block
            </Button>
            <Button onClick={() => tetris.devtools.drawNestedBlocks()}>
              draw nested blocks
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Tetris;
