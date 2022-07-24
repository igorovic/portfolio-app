import DropZone from "components/dropzone/DropZone";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

import { useCallback, useEffect, useRef, useState } from "react";
import { pdfUrlObject } from "./store";
import * as pdfJs from "pdfjs-dist";
import { Button, Slider } from "@mantine/core";
import Two from "two.js";
import { FieldInfo } from "./types";
import { PDFInfo } from "./backend/pdf-lib";
import { nanoid } from "nanoid";
import { Maybe } from "types";
pdfJs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

function inputType(field: FieldInfo) {
  switch (field.type) {
    case "PDFTextField":
      return "text";
    case "PDFCheckBox":
      return "checkbox";
    default:
      return "text";
  }
}

function removeInputsFromDocument(ids: string[]) {
  let id: Maybe<string> = ids.pop();
  while (id) {
    try {
      const ele = document.getElementById(id);
      ele?.remove();
    } catch (err) {
      console.error(err);
    } finally {
      id = ids.pop();
    }
  }
}

function PdfEmbed() {
  const canvasId = "pdfjs-canvas";
  const { locale } = useRouter();
  const [pdfUrlObj, setPdfUrlObj] = useAtom(pdfUrlObject);
  console.debug(pdfUrlObj);
  const pageRef = useRef<pdfJs.PDFPageProxy | null>(null);
  const [zoom, setZoom] = useState(1);
  const twoRef = useRef<Two | null>(null);
  const wSclaeRef = useRef(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputFieldsIdRef = useRef<string[]>([]);

  const render = useCallback(() => {
    // Display page on the existing canvas with 100% scale.
    if (!pageRef.current) return;
    const page = pageRef.current;
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    let viewport = page.getViewport({ scale: 1 });
    const w_scale = canvas.clientWidth / viewport.width;
    wSclaeRef.current = w_scale;
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
  }, []);

  const onDrop = useCallback(
    (files: FileList) => {
      if (files.length === 0) return;
      const file = files[0];
      const fileObjUrl = URL.createObjectURL(
        new Blob([file], { type: file.type })
      );
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

  function addInput(field: FieldInfo) {
    if (!pageRef.current) return;
    const page = pageRef.current;
    let viewport = page.getViewport({ scale: wSclaeRef.current });
    const { rect } = field;

    const c = viewport.convertToViewportRectangle([
      rect.x,
      rect.y,
      rect.x + rect.width,
      rect.y + rect.height,
    ]);
    console.debug("coord", c);
    const input = document.createElement("input");
    const id = nanoid();
    inputFieldsIdRef.current.push(id);
    input.id = id;
    input.type = inputType(field);
    input.name = field.name;
    input.style.position = "absolute";
    input.style.top = `${c[3]}px`;
    input.style.left = `${c[0]}px`;
    input.style.width = `calc(${c[2]}px - ${c[0]}px)`;
    input.style.height = `calc(${c[1]}px - ${c[3]}px)`;
    input.style.fontSize = `calc((${c[1]}px - ${c[3]}px)*0.8)`;
    input.style.border = "1px solid grey";
    containerRef.current?.appendChild(input);
  }

  const pdfInfo = useCallback(() => {
    removeInputsFromDocument(inputFieldsIdRef.current);
    const data = new FormData();
    fetch(pdfUrlObj).then((r) => {
      r.blob().then((blob) => {
        console.debug(blob);
        data.append("pdf", blob, "file.pdf");
        fetch("/api/pdf-services/pdfInfo", {
          method: "POST",
          body: data,
        })
          .then((r) => r.json())
          .then((r: { result: PDFInfo }) => {
            console.debug(r.result);
            r.result.fields.forEach((R) => {
              addInput(R);
            });
          });
      });
    });
  }, [pdfUrlObj]);

  return (
    <>
      <DropZone onDrop={onDrop} label="drag and drop pdf here" />
      <div className="pt-4 flex justify-around">
        <Button onClick={() => render()}>re-render</Button>

        <Button onClick={pdfInfo}>generate form</Button>
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
      <div className="relative" ref={containerRef}>
        <canvas
          id={canvasId}
          width={600}
          height={600}
          className="w-full h-full"
          //style={{ width: "800px", height: "1200px", position: "relative" }}
        ></canvas>
        {/* <input
          type={"text"}
          className="border absolute top-4 left-0 bg-red-400 z-50"
        /> */}
      </div>
    </>
  );
}

export default PdfEmbed;
