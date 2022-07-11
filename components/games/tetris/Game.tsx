import React from "react";

interface GameProps {
  width: number;
}

function Game({ width }: GameProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  return (
    <canvas
      id="tetris"
      ref={canvasRef}
      width={width}
      height={width * 2}
      className="border"
    ></canvas>
  );
}

export default Game;
