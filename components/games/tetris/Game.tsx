import { Button } from "@mantine/core";
import Script from "next/script";
import React from "react";
import { TetrisEngine } from "./src/engine";

function Game(/* { children }: React.PropsWithChildren<unknown> */) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const tetris = new TetrisEngine({ canvasId: "tetris" });

  return (
    <>
      <canvas
        id="tetris"
        ref={canvasRef}
        width={320}
        height={800}
        className="border"
      ></canvas>
      <Button onClick={() => tetris.start()}>start</Button>
      {/* <Script
        type="module"
        src="/tetris/engine.js"
        onLoad={() => {
          if (typeof window !== "undefined") {
            //@ts-ignore
            window["TeTris"].initialize("tetris");
          }
        }}
      ></Script> */}
    </>
  );
}

export default Game;
