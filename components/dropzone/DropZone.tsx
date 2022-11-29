import { useState } from "react";
import clsx from "clsx";

interface DropZoneProps {
  label?: string;
  onDrop?: (files: FileList) => void;
}

function DropZone({ onDrop, label }: DropZoneProps) {
  const [dragOver, setDragOver] = useState(false);
  return (
    <div
      className={clsx(
        "w-24 h-24 p-2 border-gray-400 grid content-center rounded-md relative",
        dragOver ? "border-blue-300 border-2" : "border"
      )}
    >
      <span className="text-sm text-gray-600">
        {label ? label : "drag and drop a media file here"}
      </span>
      <div
        className="absolute w-full h-full z-50"
        onDragLeave={(e) => {
          console.debug("drag leave");
          e.preventDefault();
          setDragOver(false);
        }}
        onDragEnter={(e) => {
          console.debug("drag enter");
          e.preventDefault();
          setDragOver(true);
        }}
        onDragOver={(e) => {
          console.debug("drag over");
          e.preventDefault();
        }}
        onDragExit={(e) => {
          e.preventDefault();
          setDragOver(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (onDrop) {
            onDrop(e.dataTransfer.files);
          }
        }}
      ></div>
    </div>
  );
}

export default DropZone;
