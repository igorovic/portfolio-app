import DropZone from "components/dropzone/DropZone";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

import { useCallback, useEffect, useRef, useState } from "react";
import { pdfUrlObject } from "./store";
import * as pdfJs from "pdfjs-dist";
import { Button, Slider } from "@mantine/core";
import Two from "two.js";
pdfJs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

function PdfEmbed() {
  const canvasId = "pdfjs-canvas";
  const { locale } = useRouter();
  const [pdfUrlObj, setPdfUrlObj] = useAtom(pdfUrlObject);
  console.debug(pdfUrlObj);
  const pageRef = useRef<pdfJs.PDFPageProxy | null>(null);
  const [zoom, setZoom] = useState(1);
  const twoRef = useRef<Two | null>(null);

  const render = useCallback(() => {
    // Display page on the existing canvas with 100% scale.
    if (!pageRef.current) return;
    const page = pageRef.current;
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    let viewport = page.getViewport({ scale: 1 });
    const w_scale = canvas.clientWidth / viewport.width;
    viewport = page.getViewport({ scale: w_scale });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    console.debug("w_scale", w_scale);

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const renderTask = page.render({
      canvasContext: ctx,
      viewport,
    });
    return renderTask.promise;
  }, [zoom]);

  const onDrop = useCallback(
    (files: FileList) => {
      if (files.length === 0) return;
      const file = files[0];
      const fileObjUrl = URL.createObjectURL(new Blob([file]));
      setPdfUrlObj(fileObjUrl);
      const loadingTask = pdfJs.getDocument(fileObjUrl);
      loadingTask.promise.then((pdf) => {
        // Request a first page
        return pdf.getPage(1).then(function (pdfPage) {
          pageRef.current = pdfPage;
          render();
        });
      });
    },
    [render, setPdfUrlObj]
  );

  useEffect(() => {
    if (!twoRef.current) {
      twoRef.current = new Two({
        type: "canvas",
        domElement: document.getElementById(canvasId) as HTMLCanvasElement,
      });
    }
  });

  const drawCircle = useCallback(() => {
    if (!twoRef.current) return;
    const two = twoRef.current;
    const C = two.makeCircle(20, 20, 32);
    C.fill = "rgb(255, 100, 100)";
    C.noStroke();
    two.render();
  }, []);

  return (
    <>
      <DropZone onDrop={onDrop} label="drag and drop pdf here" />
      <div className="pt-4 flex justify-around">
        <Button onClick={() => render()}>re-render</Button>
        <Button onClick={drawCircle}>draw circle</Button>
      </div>
      <div>
        <Slider
          defaultValue={1}
          min={0.1}
          max={4}
          label={(value) => value.toFixed(1)}
          step={0.1}
          styles={{ markLabel: { display: "none" } }}
          onChange={setZoom}
          onChangeEnd={() => render()}
        />
      </div>
      <canvas
        id={canvasId}
        width={600}
        height={600}
        className="w-full h-full"
      ></canvas>
    </>
  );
}

export default PdfEmbed;
