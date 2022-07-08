import React from "react";
import { Context } from "./CanvasContext";
import { useImageIsLoading } from "./store";

interface CanvasImageProps {
  //image: HTMLImageElement;
  src: string;
  width: number;
  height: number;
}
function CanvasImage({ src, width, height }: CanvasImageProps) {
  const { canvas, zoom } = React.useContext(Context);
  const imgRef = React.useRef<HTMLImageElement>();
  const [, setImageIsLoading] = useImageIsLoading();
  const cc = () => canvas?.getContext("2d");
  const _zoom = zoom || 1;

  const refreshCanvas = (img: HTMLImageElement) => {
    const ctx = cc();
    ctx?.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    ctx?.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      0,
      0,
      /**
       * When screen size is small than the image width
       * paint the image only on the available space
       */
      Math.min(img.width * _zoom, ctx?.canvas.clientWidth ?? img.width * _zoom),
      Math.min(img.height * _zoom, ctx?.canvas.clientWidth ?? img.width * _zoom)
    );
  };

  React.useLayoutEffect(() => {
    if (!imgRef.current) {
      const htmlImg = new Image();
      imgRef.current = htmlImg;
    }
  });
  if (imgRef.current) {
    const htmlImg = imgRef.current;
    htmlImg.width = width;
    htmlImg.height = height;

    refreshCanvas(imgRef.current);
  }

  if (imgRef.current && imgRef.current.src !== src) {
    const htmlImg = imgRef.current;
    htmlImg.onload = () => {
      refreshCanvas(htmlImg);
      setImageIsLoading(false);
    };
    imgRef.current.src = src;
  }

  return null;
}

export default CanvasImage;
