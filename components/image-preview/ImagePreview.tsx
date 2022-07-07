import { useState, WheelEventHandler } from "react";
import { useCallback } from "react";
import DropZone from "../dropzone/DropZone";

//@ts-ignore
import imageParser from "probe-image-size/sync";

import UnspashRandomImage from "./UnspashRandomImage";
import { useDispatch, useImage } from "./store";
import type { ProbeResult } from "probe-image-size";
import Canvas from "./Canvas";

function ImagePreview() {
  const dispatch = useDispatch();
  const currentImage = useImage();
  const onDrop = useCallback(
    async (files: FileList) => {
      const file = files[files.length - 1];
      let meta: ProbeResult = imageParser(
        Buffer.from(await file.arrayBuffer())
      ) as ProbeResult;
      const _image = { url: URL.createObjectURL(file), meta };

      dispatch({
        type: "SET_CURRENT_IMAGE",
        payload: _image,
      });
    },
    [dispatch]
  );

  return (
    <div className="h-full">
      <h2>Image Preview</h2>

      <div className="grid grid-cols-2-hugl h-full">
        <div>
          <DropZone onDrop={onDrop} label="drag and drop an image here" />
          <UnspashRandomImage />
        </div>
        <div className="px-2 relative h-full">
          <Canvas image={currentImage} />
        </div>
      </div>
    </div>
  );
}

export default ImagePreview;
