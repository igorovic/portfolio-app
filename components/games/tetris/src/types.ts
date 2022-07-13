export type Maybe<T> = T | undefined | null;
export interface CanvasContext extends CanvasRenderingContext2D {}
export type MaybeContext = Maybe<CanvasContext>;
export type XY = { x: number; y: number; xy: [number, number] };
export type Constraints = {
  x: number;
  y: number;
  w: number;
  h: number;
};

type CanvasRowsCols = {
  cols: number;
  rows: number;
};

type CanvasSize = {
  w: number;
  h: number;
};
type CanvasSizeRowsCols = CanvasRowsCols & CanvasSize;

export type BlockOptions = {
  position?: {
    x: number;
    y: number;
  };
  width?: number;
  height?: number;
  padding?: number;
  paddings?: {
    pt: number;
    pb: number;
    pl: number;
    pr: number;
  };

  style?: {
    fill?: string;
    paddingRatio?: number;
  };
};

export function isCanvasRowsCols(obj: any): obj is CanvasRowsCols {
  return (
    Boolean(obj) &&
    typeof (obj as CanvasRowsCols).rows === "number" &&
    typeof (obj as CanvasRowsCols).cols == "number"
  );
}

export function isCanvasSize(obj: any): obj is CanvasSize {
  return (
    Boolean(obj) &&
    typeof (obj as CanvasSize).w === "number" &&
    typeof (obj as CanvasSize).h === "number"
  );
}

export function isCanvasSizeRowsCols(obj: any): obj is CanvasSizeRowsCols {
  return (
    Boolean(obj) &&
    typeof (obj as CanvasSize).w === "number" &&
    typeof (obj as CanvasSize).h === "number" &&
    typeof (obj as CanvasRowsCols).rows === "number" &&
    typeof (obj as CanvasRowsCols).cols == "number"
  );
}
