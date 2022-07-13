import { Block } from "./block";

export function isBlock(obj: any): obj is Block {
  return Boolean(obj) && Boolean(obj.__type === "Block");
}

export function isCanvasContext(obj: any): obj is CanvasRenderingContext2D {
  return Boolean(obj.rect) && Boolean(obj.beginPath);
}
