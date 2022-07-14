import { Button } from "@mantine/core";
import React from "react";
import ToolBox from "./ToolBox";
import { store } from "./store";
import { Provider } from "react-redux";
import { handleClick, render } from "./render";
import { canvasId } from "./constants";

function Canva() {
  const canvaRef = React.useRef<HTMLCanvasElement>(null);
  const ctxRef = React.useRef<CanvasRenderingContext2D | null>(null);

  React.useEffect(() => {
    ctxRef.current = (
      document.getElementById(canvasId) as HTMLCanvasElement
    )?.getContext("2d");
    const unsubscribe = store.subscribe(() => {
      render();
    });
    return unsubscribe;
  });

  React.useEffect(() => {
    const canva = canvaRef.current;
    canva?.addEventListener("click", handleClick);
    return () => canva?.removeEventListener("click", handleClick);
  });

  return (
    <Provider store={store}>
      <div className="relative">
        <ToolBox canvasId={canvasId} />
        <canvas
          ref={canvaRef}
          id={canvasId}
          width={600}
          height={600}
          className="border border-blue-100 w-[600px] h-[600px]"
        >
          <button id="button1">Continue</button>
        </canvas>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {
              const ctx = ctxRef.current;
              ctx?.clearRect(
                0,
                0,
                ctx.canvas.clientWidth,
                ctx.canvas.clientHeight
              );
            }}
          >
            reset
          </Button>
          <Button
            onClick={() => {
              ctxRef.current?.save();
            }}
          >
            save
          </Button>
          <Button
            onClick={() => {
              ctxRef.current?.restore();
            }}
          >
            restore
          </Button>
        </div>
      </div>
    </Provider>
  );
}

export default Canva;
