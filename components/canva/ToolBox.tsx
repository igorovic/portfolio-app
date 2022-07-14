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
} from "./features/shapeSlice";

type ToolBoxProps = {
  canvasId: string;
};

function ToolBox({ canvasId }: ToolBoxProps) {
  const dispatch = useAppDispatch();
  const X = useX();
  const Y = useY();
  const W = useW();
  const H = useH();
  const fill = useFill();
  const cornerRadius = useCornerRadius();

  return (
    <div className="absolute border w-80 rounded-sm top-0 right-2 p-2 canva-toolbox">
      <Accordion initialItem={0}>
        <Accordion.Item label="Toolbox" sx={{ border: 0 }}>
          <div className="grid grid-cols-2 gap-2">
            <NumberInput
              label="X"
              defaultValue={X}
              hideControls
              onChange={(x) => {
                if (x === undefined) return;
                dispatch(setX(x));
              }}
            />
            <NumberInput
              label="Y"
              defaultValue={Y}
              hideControls
              onChange={(y) => {
                if (y === undefined) return;
                dispatch(setY(y));
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <NumberInput
              label="W"
              defaultValue={W}
              hideControls
              onChange={(w) => {
                if (w === undefined) return;
                dispatch(setW(w));
              }}
            />
            <NumberInput
              label="H"
              defaultValue={H}
              hideControls
              onChange={(h) => {
                if (h === undefined) return;
                dispatch(setH(h));
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <NumberInput
              label="R"
              defaultValue={cornerRadius}
              hideControls
              onChange={(r) => {
                if (r === undefined) return;
                dispatch(setCornerRadius(r));
              }}
            />
          </div>
          <h3 className="font-semibold test-xl py-2">Fill</h3>
          <ColorPicker
            format="rgba"
            defaultValue={fill}
            onChange={(color) => {
              dispatch(setFill(color));
            }}
          />
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default ToolBox;
