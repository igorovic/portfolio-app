import React from "react";
import game from "./engine";
function Game(/* { children }: React.PropsWithChildren<unknown> */) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        game.init(ctx);
        game.start();
      }
    }
  });
  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={800}
      className="border"
    ></canvas>
  );
}

export default Game;
