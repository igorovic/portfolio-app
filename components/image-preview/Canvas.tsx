import React, { WheelEventHandler } from "react";
import { useImage, useImageIsLoading } from "./store";
import { ParsedImage } from "./types";

function clearCanvas(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
}

interface CanvasProps {
  image: ParsedImage | null;
}

const Canvas = ({ image }: CanvasProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const imageRef = React.useRef<HTMLImageElement>();
  const [, setImageIsLoading] = useImageIsLoading();
  const cc = () => canvasRef.current?.getContext("2d");
  const refreshCanvas = (img: HTMLImageElement) => {
    cc()?.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      0,
      0,
      img.width * zoomFactor,
      img.height * zoomFactor
    );
  };
  let zoomFactor = 1;

  React.useEffect(() => {
    const currentImage = new Image();

    if (currentImage) {
      currentImage.width = image?.meta.width ?? 300;
      currentImage.height = image?.meta.height ?? 300;
      currentImage.onload = () => {
        refreshCanvas(currentImage);
        imageRef.current = currentImage;
        setImageIsLoading(false);
      };
      currentImage.onerror = () => setImageIsLoading(false);
    }
    if (currentImage && currentImage.src !== image?.url) {
      currentImage.src = image?.url ?? "";
    }
  });

  const canvasZoom: WheelEventHandler<HTMLCanvasElement> = (e) => {
    const ctx = cc();
    if (!ctx) return;
    const previousFactor = zoomFactor;
    if (e.deltaY < 0) {
      zoomFactor = zoomFactor - 0.025;
    } else {
      zoomFactor = zoomFactor + 0.025;
    }
    if (zoomFactor <= 0.1) {
      zoomFactor = 0.1;
    } else if (zoomFactor > 2) {
      zoomFactor = 2;
    }
    const ref = imageRef.current;
    if (ref) {
      if (zoomFactor < previousFactor) {
        /**
         * Clear the previous image artifacts
         */
        ctx.clearRect(
          ref.width * zoomFactor,
          0,
          ctx.canvas.width,
          ctx.canvas.height
        );
        ctx.clearRect(
          0,
          ref.height * zoomFactor,
          ctx.canvas.width,
          ctx.canvas.height
        );
      }
      refreshCanvas(ref);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      id="image-preview"
      className="w-full h-full border"
      // need to set width and height otherwise image is distorted
      width={cc()?.canvas.clientWidth}
      height={cc()?.canvas.clientHeight}
      onWheel={canvasZoom}
    ></canvas>
  );
};
Canvas.displayName = "Canvas";
export default Canvas;
