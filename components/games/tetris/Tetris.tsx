import React, { useEffect } from "react";
import { Button } from "@mantine/core";
import Game from "./Game";
import tetris, { devtools } from "./src/engine";
function Tetris() {
  useEffect(() => {
    tetris.initialize("tetris");
    return () => {
      tetris.dispose();
    };
  });
  return (
    <div>
      <h2>Tetris</h2>
      <div className="p-2 bg-slate-300 w-min rounded-md">
        <Game width={700} />
        <Button onClick={() => tetris.start_pause()}>start</Button>
        {process.env.NODE_ENV !== "production" ? (
          <div className="absolute top-16 right-0 mx-2 flex flex-col gap-2">
            <p className="font-semibold test-base">DevTools</p>
            <Button onClick={() => devtools.drawSquare()}>draw square</Button>
            <Button onClick={() => devtools.drawRoundedSquare()}>
              draw rounded square
            </Button>
            <Button onClick={() => devtools.drawBlockWithChild()}>
              draw Block with child
            </Button>
            <Button onClick={() => devtools.drawBrick()}>draw Brick</Button>

            <Button onClick={() => devtools.drawLine()}>draw line</Button>
            <Button onClick={() => devtools.debugCurrentBlock()}>
              debug currentBlock
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Tetris;
