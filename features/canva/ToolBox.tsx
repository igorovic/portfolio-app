import React from "react";
import { Accordion, NumberInput, Select, ColorPicker } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "./store";
import {
  setX,
  setY,
  setH,
  setW,
  setFill,
  useX,
  useY,
  useW,
  useH,
  useFill,
  useCornerRadius,
  setCornerRadius,
  useSelectedShapeKey,
  setStroke,
  useStroke,
} from "./features/boardSlice";

type ToolBoxProps = {
  canvasId: string;
};

const FillColorComponent = () => {
  const dispatch = useAppDispatch();
  const fill = useFill();

  return (
    <ColorPicker
      format="rgba"
      value={fill}
      onChange={(color) => {
        dispatch(setFill(color));
      }}
    />
  );
};

const StrokeColorComponent = () => {
  const dispatch = useAppDispatch();
  const stroke = useStroke();
  return (
    <ColorPicker
      format="rgba"
      value={stroke}
      onChange={(color) => {
        dispatch(setStroke(color));
      }}
    />
  );
};

function ToolBox({ canvasId }: ToolBoxProps) {
  const dispatch = useAppDispatch();
  const selectedShapeK = useSelectedShapeKey();
  const X = useX();
  const Y = useY();
  const W = useW();
  const H = useH();

  const rtl = useCornerRadius();
  const updateProperty = (el: HTMLInputElement) => {
    if (el.value === undefined || el.value === null) return;
    switch (true) {
      case el.name === "x":
        dispatch(setX(parseFloat(el.value)));
        break;
      case el.name === "y":
        dispatch(setY(parseFloat(el.value)));
        break;
      case el.name === "w":
        dispatch(setW(parseFloat(el.value)));
        break;
      case el.name === "h":
        dispatch(setH(parseFloat(el.value)));
        break;
      case el.name === "rtl":
        dispatch(setCornerRadius(parseFloat(el.value)));
        break;
      default:
        null;
    }
  };
  const keyupHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      updateProperty(e.currentTarget);
      e.currentTarget.blur();
    }
  };
  const blurHandler: React.FocusEventHandler<HTMLInputElement> = (e) => {
    updateProperty(e.target);
  };
  return (
    <div className="absolute border w-80 rounded-sm top-0 right-2 p-2 canva-toolbox bg-white">
      <Accordion
        defaultValue={String(0)}
        sx={() => ({
          backgroundColor: "#fff",
        })}
      >
        <Accordion.Item value="0" sx={{ border: 0 }}>
          <Accordion.Control>Toolbox</Accordion.Control>
          <Accordion.Panel>
            {selectedShapeK ? (
              <>
                <p>selected shape: {selectedShapeK}</p>
                <div className="grid grid-cols-2 gap-2">
                  <NumberInput
                    label="X"
                    name="x"
                    value={X}
                    hideControls
                    onKeyUpCapture={keyupHandler}
                    onBlur={blurHandler}
                  />
                  <NumberInput
                    label="Y"
                    name="y"
                    value={Y}
                    hideControls
                    onKeyUpCapture={keyupHandler}
                    onBlur={blurHandler}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <NumberInput
                    label="W"
                    name="w"
                    value={W}
                    hideControls
                    onKeyUpCapture={keyupHandler}
                    onBlur={blurHandler}
                  />
                  <NumberInput
                    label="H"
                    name="h"
                    value={H}
                    hideControls
                    onKeyUpCapture={keyupHandler}
                    onBlur={blurHandler}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <NumberInput
                    label="R"
                    name="rtl"
                    value={rtl}
                    hideControls
                    onKeyUpCapture={keyupHandler}
                    onBlur={blurHandler}
                  />
                </div>
                <h3 className="font-semibold test-xl py-2">Fill</h3>
                <FillColorComponent />
                <h3 className="font-semibold test-xl py-2">Stroke</h3>
                <StrokeColorComponent />
              </>
            ) : null}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default ToolBox;
