import React from "react";
//@ts-ignore
import imageParser from "probe-image-size/sync";
import type { ProbeResult } from "probe-image-size";
import { SetStateAction } from "jotai";
import { ImageWithMeta } from "./types";

export const useOnDrop = (
  updateImage: (a: SetStateAction<ImageWithMeta | null>) => void
) =>
  React.useCallback(
    async (files: FileList) => {
      const file = files[files.length - 1];
      let meta: ProbeResult = imageParser(
        Buffer.from(await file.arrayBuffer())
      ) as ProbeResult;
      const _image = { url: URL.createObjectURL(file), meta };
      updateImage(_image);
    },
    [updateImage]
  );
