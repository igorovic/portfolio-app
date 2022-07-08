import React, { WheelEventHandler } from "react";

import CanvasContextProvider from "./CanvasContext";

function Canvas2({ children }: React.PropsWithChildren<any>) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const cc = () => canvasRef.current?.getContext("2d");
  const [zoom, setZoom] = React.useState(1);

  const canvasZoom: WheelEventHandler<HTMLCanvasElement> = (e) => {
    const step = 0.025;
    setZoom((previous) => {
      if (e.deltaY < 0) {
        if (previous - step < 0.1) return 0.1;
        else return previous - step;
      } else {
        if (previous + step > 2) return 2;
        else return previous + step;
      }
    });
  };

  return (
    <>
      <p>zoom: {Math.round(zoom * 100)}% scroll to change zoom</p>
      <canvas
        ref={canvasRef}
        id="image-preview"
        className="w-full h-full border"
        // need to set width and height otherwise image is distorted
        width={cc()?.canvas.clientWidth}
        height={cc()?.canvas.clientHeight}
        onWheel={canvasZoom}
      >
        <CanvasContextProvider value={{ canvas: canvasRef.current, zoom }}>
          {children}
        </CanvasContextProvider>
      </canvas>
    </>
  );
}
Canvas2.displayName = "Canvas2";
export default Canvas2;
