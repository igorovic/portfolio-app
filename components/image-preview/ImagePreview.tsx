import React from "react";
import DropZone from "../dropzone/DropZone";

import UnslpashRandomImage from "./UnspashRandomImage";
import { useImage } from "./store";

import CanvasImage from "./CanvasImage";
import Canvas2 from "./Canvas";
import { useOnDrop } from "./useOnDrop";

function ImagePreview() {
  const [currentImage, updateImage] = useImage();
  const onDrop = useOnDrop(updateImage);

  return (
    <div className="overflow-hidden">
      <div className="flex">
        <DropZone onDrop={onDrop} label="drag and drop an image here" />
        <div className="px-4">
          <h2>Image Preview</h2>
        </div>
      </div>
      <UnslpashRandomImage />
      <div className="h-[800px] w-full">
        <Canvas2>
          {currentImage ? (
            <CanvasImage
              src={currentImage?.url}
              width={currentImage?.meta.width}
              height={currentImage?.meta.height}
            />
          ) : null}
        </Canvas2>
      </div>
    </div>
  );
}

export default ImagePreview;
