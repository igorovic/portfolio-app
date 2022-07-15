import React from "react";

import Game from "./Game";
function Tetris() {
  return (
    <div>
      <h2>Tetris</h2>
      <div className="p-2 bg-slate-300 w-min rounded-md">
        <Game />
      </div>
    </div>
  );
}

export default Tetris;
