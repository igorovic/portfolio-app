import Script from "next/script";
import React from "react";

function Game(/* { children }: React.PropsWithChildren<unknown> */) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  return (
    <>
      <canvas
        id="tetris"
        ref={canvasRef}
        width={320}
        height={800}
        className="border"
      ></canvas>
      <Script
        type="module"
        src="/tetris/engine.js"
        onLoad={() => {
          if (typeof window !== "undefined") {
            //@ts-ignore
            window["TeTris"].initialize("tetris");
          }
        }}
      ></Script>
    </>
  );
}

export default Game;
