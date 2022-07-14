import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../store";

const initialState = {
  x: 0,
  y: 0,
  w: 32,
  h: 32,
  // corner radius
  rtl: 0, // top left
  rtr: 0, // top right
  rbl: 0, // bottom left
  rbr: 0, // bottom right
  fill: "rgba(44, 122, 156, 0.7)",
};

const shpaeSlice = createSlice({
  name: "shape",
  initialState,
  reducers: {
    setX: (state, { payload }: PayloadAction<number>) => {
      state.x = payload;
    },
    setY: (state, { payload }: PayloadAction<number>) => {
      state.y = payload;
    },
    setW: (state, { payload }: PayloadAction<number>) => {
      state.w = payload;
    },
    setH: (state, { payload }: PayloadAction<number>) => {
      state.h = payload;
    },
    setFill: (state, { payload }: PayloadAction<string>) => {
      state.fill = payload;
    },
    setCornerRadius: (state, { payload }: PayloadAction<number>) => {
      state.rtl = payload;
      state.rtr = payload;
      state.rbl = payload;
      state.rbr = payload;
    },
  },
});

export const { setX, setY, setW, setH, setFill, setCornerRadius } =
  shpaeSlice.actions;
export default shpaeSlice.reducer;

export const useX = () => useAppSelector((state) => state.shape.x);
export const useY = () => useAppSelector((state) => state.shape.y);
export const useW = () => useAppSelector((state) => state.shape.w);
export const useH = () => useAppSelector((state) => state.shape.h);
export const useFill = () => useAppSelector((state) => state.shape.fill);
export const useCornerRadius = () => useAppSelector((state) => state.shape.rtl);
