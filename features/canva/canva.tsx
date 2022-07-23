import { Button } from "@mantine/core";
import React from "react";
import ToolBox from "./ToolBox";
import { store } from "./store";
import { Provider } from "react-redux";
import {
  mouseDownHandler,
  shapeDragHandler,
  mouseUpHandler,
  addRect,
  render,
} from "./render";
import { canvasId, initialShape } from "./constants";
import { useAppDispatch } from "lib/app/hooks";
import { resetBoard } from "./features/boardSlice";

function Canva() {
  const canvaRef = React.useRef<HTMLCanvasElement>(null);
  const ctxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const dispatch = useAppDispatch();

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

    canva?.addEventListener("mousedown", mouseDownHandler);
    canva?.addEventListener("mouseup", mouseUpHandler);
    canva?.addEventListener("mousemove", shapeDragHandler);

    return () => {
      canva?.removeEventListener("mousedown", mouseDownHandler);
      canva?.removeEventListener("mouseup", mouseUpHandler);
      canva?.removeEventListener("mousemove", shapeDragHandler);
    };
  });

  return (
    <div className="relative w-full">
      <Provider store={store}>
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
              addRect();
            }}
          >
            add rect
          </Button>
          <Button
            onClick={() => {
              const ctx = ctxRef.current;
              ctx?.clearRect(
                0,
                0,
                ctx.canvas.clientWidth,
                ctx.canvas.clientHeight
              );
              dispatch(resetBoard());
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
      </Provider>
    </div>
  );
}

export default Canva;
