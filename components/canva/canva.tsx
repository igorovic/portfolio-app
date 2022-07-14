import { Button } from "@mantine/core";
import React, { useEffect } from "react";
import ToolBox from "./ToolBox";
import { store } from "./store";
import { Provider } from "react-redux";
import { render } from "./render";

function Canva() {
  const canvasId = "canva";
  const ctxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  //const timestampRef = React.useRef<number>();

  useEffect(() => {
    ctxRef.current = (
      document.getElementById(canvasId) as HTMLCanvasElement
    )?.getContext("2d");
    const unsubscribe = store.subscribe(() => {
      render(canvasId, store.getState().shape);
    });
    return unsubscribe;
  });

  return (
    <Provider store={store}>
      <div className="relative">
        <ToolBox canvasId={canvasId} />
        <canvas
          id={canvasId}
          width={600}
          height={600}
          className="border border-blue-100 w-[600px] h-[600px]"
        ></canvas>
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
            render(canvasId, store.getState().shape);
          }}
        >
          render
        </Button>
      </div>
    </Provider>
  );
}

export default Canva;
