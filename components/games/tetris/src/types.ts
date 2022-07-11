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

export type BlockOptions = {
  style?: {
    fill?: string;
    paddingRatio?: number;
  };
};
