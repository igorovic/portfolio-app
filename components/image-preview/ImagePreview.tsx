import { useState, WheelEventHandler } from "react";
import { useCallback } from "react";
import DropZone from "../dropzone/DropZone";

//@ts-ignore
import imageParser from "probe-image-size/sync";
import type { ProbeResult } from "probe-image-size";

import { useRef } from "react";
import UnspashRandomImage from "./UnspashRandomImage";
import { useContextState } from "./store";
import { useEffect } from "react";

type ParsedImage = {
  url: string;
  meta: ProbeResult;
};

function clearCanvas(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
}

function drawImage(
  ctx: CanvasRenderingContext2D,
  parsedImage: ParsedImage,
  zoomFactor: number = 1
) {
  const image = new Image();
  image.width = parsedImage.meta.width;
  image.height = parsedImage.meta.height;
  if (zoomFactor < 1) {
    /**
     * Clear the previous image artifacts
     */
    ctx.clearRect(
      ctx.canvas.width * zoomFactor,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    );
    ctx.clearRect(
      0,
      ctx.canvas.height * zoomFactor,
      ctx.canvas.width,
      ctx.canvas.height
    );
  }
  image.onload = () => {
    ctx.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      0,
      0,
      image.width * zoomFactor,
      image.height * zoomFactor
    );
  };
  image.src = parsedImage.url;
}

function ImagePreview() {
  const [state, dispatch] = useContextState();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null | undefined>(
    null
  );
  const imageRef = useRef<ParsedImage | null>(null);
  const zoomFactorRef = useRef(1);

  const onDrop = useCallback(
    async (files: FileList) => {
      dispatch({ type: "RESET" });
      const fu: ParsedImage[] = [];
      const ctx = canvasRef.current?.getContext("2d");
      let meta: ProbeResult | undefined;
      for (let idx = 0; idx < files.length; idx++) {
        const file = files[idx];

        meta = imageParser(
          Buffer.from(await file.arrayBuffer())
        ) as ProbeResult;
        fu.push({ url: URL.createObjectURL(file), meta });
        imageRef.current = { url: URL.createObjectURL(file), meta };
      }
      canvasContextRef.current = ctx;
      if (ctx && imageRef.current) {
        clearCanvas(ctx);
        drawImage(ctx, imageRef.current);
      }
    },
    [dispatch]
  );

  const canvasZoom: WheelEventHandler<HTMLCanvasElement> = (e) => {
    if (!canvasContextRef.current || !imageRef.current) return;

    if (e.deltaY < 0) {
      zoomFactorRef.current = zoomFactorRef.current - 0.025;
    } else {
      zoomFactorRef.current = zoomFactorRef.current + 0.025;
    }
    if (zoomFactorRef.current <= 0.1) {
      zoomFactorRef.current = 0.1;
    } else if (zoomFactorRef.current > 2) {
      zoomFactorRef.current = 2;
    }

    drawImage(
      canvasContextRef.current,
      imageRef.current,
      zoomFactorRef.current
    );
  };

  if (state.unsplashImageW) {
    const [width, height] = state.unsplashImageW.split("x");
    const url = `https://source.unsplash.com/random/${state.unsplashImageW}`;
    console.debug(url);
    imageRef.current = {
      url,
      // anyway we need only width and height
      meta: { width: parseInt(width), height: parseInt(height) } as ProbeResult,
    };
  }
  if (canvasContextRef.current && imageRef.current) {
    drawImage(
      canvasContextRef.current,
      imageRef.current,
      zoomFactorRef.current
    );
  }

  return (
    <div className="h-full">
      <h2>Image Preview</h2>

      <div className="grid grid-cols-2-hugl h-full">
        <div>
          <DropZone onDrop={onDrop} label="drag and drop an image here" />
          <UnspashRandomImage />
        </div>
        <div className="px-2 relative h-full">
          <canvas
            ref={canvasRef}
            id="image-preview"
            className="w-full h-full"
            width={canvasContextRef.current?.canvas.clientWidth}
            height={canvasContextRef.current?.canvas.clientHeight}
            onWheel={canvasZoom}
          ></canvas>
        </div>
      </div>
    </div>
  );
}

export default ImagePreview;
