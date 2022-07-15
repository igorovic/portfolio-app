import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialShape } from "../constants";
import { useAppSelector } from "../store";
import { Shape } from "../types";

interface State {
  selectedShape: string | null;
  shapesRepository: Record<string, Shape>;
}
const initialState: State = {
  selectedShape: null,
  shapesRepository: {},
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    selectShape: (state, { payload }: PayloadAction<string | null>) => {
      state.selectedShape = payload;
    },
    resetBoard: (state) => {
      state.selectedShape = null;
      state.shapesRepository = {};
    },
    addShape: (state, { payload }: PayloadAction<[string, Shape]>) => {
      state.selectedShape = payload[0];
      state.shapesRepository[payload[0]] = payload[1];
    },
    // shape
    setX: (state, { payload }: PayloadAction<number>) => {
      if (state.selectedShape === null) return;
      state.shapesRepository[state.selectedShape].x = payload;
    },
    setY: (state, { payload }: PayloadAction<number>) => {
      if (state.selectedShape === null) return;
      state.shapesRepository[state.selectedShape].y = payload;
    },
    setW: (state, { payload }: PayloadAction<number>) => {
      if (state.selectedShape === null) return;
      state.shapesRepository[state.selectedShape].w = payload;
    },
    setXY: (state, { payload }: PayloadAction<[number, number]>) => {
      if (state.selectedShape === null) return;
      state.shapesRepository[state.selectedShape].x = payload[0];
      state.shapesRepository[state.selectedShape].y = payload[1];
    },
    setXYWH: (
      state,
      { payload }: PayloadAction<{ x: number; y: number; w: number; h: number }>
    ) => {
      if (state.selectedShape === null) return;
      state.shapesRepository[state.selectedShape].x = payload.x;
      state.shapesRepository[state.selectedShape].y = payload.y;
      state.shapesRepository[state.selectedShape].w = payload.w;
      state.shapesRepository[state.selectedShape].h = payload.h;
    },
    setH: (state, { payload }: PayloadAction<number>) => {
      if (state.selectedShape === null) return;
      state.shapesRepository[state.selectedShape].h = payload;
    },
    setFill: (state, { payload }: PayloadAction<string>) => {
      if (state.selectedShape === null) return;
      state.shapesRepository[state.selectedShape].fill = payload;
    },
    setStroke: (state, { payload }: PayloadAction<string>) => {
      if (state.selectedShape === null) return;
      state.shapesRepository[state.selectedShape].stroke = payload;
    },
    setCornerRadius: (state, { payload }: PayloadAction<number>) => {
      if (state.selectedShape === null) return;
      state.shapesRepository[state.selectedShape].rtl = payload;
      state.shapesRepository[state.selectedShape].rtr = payload;
      state.shapesRepository[state.selectedShape].rbl = payload;
      state.shapesRepository[state.selectedShape].rbr = payload;
    },

    setShape: (state, { payload }: PayloadAction<Shape>) => {
      if (state.selectedShape === null) return;
      state.shapesRepository[state.selectedShape] = payload;
    },
  },
});

export const {
  selectShape,
  resetBoard,
  addShape,
  setX,
  setY,
  setXY,
  setXYWH,
  setW,
  setH,
  setFill,
  setStroke,
  setCornerRadius,
  setShape,
} = boardSlice.actions;
export default boardSlice.reducer;

export const useX = () =>
  useAppSelector((state) =>
    state.board.selectedShape
      ? state.board.shapesRepository[state.board.selectedShape].x
      : initialShape.x
  );
export const useY = () =>
  useAppSelector((state) =>
    state.board.selectedShape
      ? state.board.shapesRepository[state.board.selectedShape].y
      : initialShape.y
  );
export const useW = () =>
  useAppSelector((state) =>
    state.board.selectedShape
      ? state.board.shapesRepository[state.board.selectedShape].w
      : initialShape.w
  );
export const useH = () =>
  useAppSelector((state) =>
    state.board.selectedShape
      ? state.board.shapesRepository[state.board.selectedShape].h
      : initialShape.h
  );
export const useFill = () =>
  useAppSelector((state) =>
    state.board.selectedShape
      ? state.board.shapesRepository[state.board.selectedShape].fill
      : "rgba(255,255,255,0)"
  );
export const useStroke = () =>
  useAppSelector((state) =>
    state.board.selectedShape
      ? state.board.shapesRepository[state.board.selectedShape].stroke
      : "#000000"
  );
export const useCornerRadius = () =>
  useAppSelector((state) =>
    state.board.selectedShape
      ? state.board.shapesRepository[state.board.selectedShape].rtl
      : initialShape.rtl
  );
export const useShape = () =>
  useAppSelector((state) =>
    state.board.selectedShape
      ? state.board.shapesRepository[state.board.selectedShape]
      : initialShape
  );

export const useSelectedShapeKey = () =>
  useAppSelector((state) => state.board.selectedShape);
