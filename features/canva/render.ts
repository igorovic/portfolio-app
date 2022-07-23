import { canvasId, initialShape } from "./constants";
import { addShape, selectShape, setXY, setXYWH } from "./features/boardSlice";
import { store } from "./store";
import { Shape } from "./types";

let ctx: CanvasRenderingContext2D | null = null;
type OutlineElement = Path2D & { fill?: string; stroke?: string };
const outlineElements: OutlineElement[] = [];

// internal state
let mouseDown = false;
let outlineClicked = false;
const clickFromOrigin: { offsetX: number; offsetY: number } = {
  offsetX: 0,
  offsetY: 0,
};

const items = () =>
  new Map(Object.entries(store.getState().board.shapesRepository));
const newShapeKey = () => items().size.toString();
const updateXY = (x: number, y: number) => store.dispatch(setXY([x, y]));
const updateXYWH = (x: number, y: number, w: number, h: number) =>
  store.dispatch(setXYWH({ x, y, w, h }));
const currentShapeKey = () => store.getState().board.selectedShape;

const getContext2D = () => {
  if (typeof window !== "undefined" && !ctx) {
    ctx = (document?.getElementById(canvasId) as HTMLCanvasElement)?.getContext(
      "2d"
    );
  }
};

function currentShape() {
  const state = store.getState();
  return state.board.selectedShape
    ? state.board.shapesRepository[state.board.selectedShape]
    : null;
}

getContext2D();

export function handleClick(e: MouseEvent) {
  for (let [key, shape] of items().entries()) {
    const svg = svgRectPath(shape);
    const path2d = new Path2D(svg);
    if (ctx?.isPointInPath(path2d, e.offsetX, e.offsetY) || outlineClicked) {
      console.debug("selected shape %s %O", key, shape);
      store.dispatch(selectShape(key));
      break;
    } else {
      store.dispatch(selectShape(null));
    }
  }
  offsetFromOrigin(e.offsetX, e.offsetY);
  outline();
}

function outlineIsClicked(x: number, y: number) {
  outlineClicked = outlineElements.some((o) => {
    if (o.fill) return ctx?.isPointInPath(o, x, y);
    else if (o.stroke) {
      return ctx?.isPointInStroke(o, x, y);
    }
  });
}

export function mouseDownHandler(e: MouseEvent) {
  mouseDown = true;
  outlineIsClicked(e.offsetX, e.offsetY);

  console.debug(clickFromOrigin);
  handleClick(e);
}
export function mouseUpHandler() {
  mouseDown = false;
}
export function shapeDragHandler(e: MouseEvent) {
  if (mouseDown) {
    const shape = currentShape();
    if (shape && !outlineClicked) {
      updateXY(
        e.offsetX - clickFromOrigin.offsetX,
        e.offsetY - clickFromOrigin.offsetY
      );
      // keep outline consistent with new position
      outline();
    } else {
      resizeHandler(e);
    }
  }
}

function resizeHandler(e: MouseEvent) {
  const x = e.offsetX;
  const y = e.offsetY;
  const s = currentShape();
  if (s) {
    const w = x - s.x + s.w;
    const h = y - s.y + s.h;
    updateXYWH(x, y, w, h);
  }
}

export function addRect() {
  getContext2D();
  store.dispatch(addShape([newShapeKey(), initialShape]));
}

function outline() {
  const s = currentShape();
  const outlineColor = "rgba(140, 180, 255, 0.8)";
  while (outlineElements.pop()) {}
  if (!s) {
    return;
  }
  const outline = {
    ...s,
    x: s.x - 2,
    y: s.y - 2,
    w: s.w + 4,
    h: s.h + 4,
  };
  const corner = Object.assign(new Path2D(), {
    fill: outlineColor,
  });
  corner.rect(topLeft(outline).x - 2, topLeft(outline).y - 2, 8, 8);
  const O: OutlineElement = Object.assign(new Path2D(svgRectPath(outline)), {
    stroke: outlineColor,
  });
  outlineElements.push(O, corner);
}

export const render = () => {
  if (typeof window === "undefined") return;
  const canva = document.getElementById(canvasId) as HTMLCanvasElement | null;

  window.requestAnimationFrame(() => {
    const ctx = canva?.getContext("2d");
    if (!ctx) {
      return console.error("canvas context is undefined");
    }

    ctx?.clearRect(
      0,
      0,
      ctx.canvas.clientWidth + 10,
      ctx.canvas.clientHeight + 10
    );
    outline();
    items().forEach((shape, key) => {
      const svg = svgRectPath(shape);
      const path2d = new Path2D(svg);

      if (shape.fill) {
        ctx.fillStyle = shape.fill;
        ctx.fill(path2d);
      }
      if (shape.stroke) {
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = shape.stroke;
        ctx.stroke(path2d);
      }
      // selection outline
      outlineElements.forEach((el) => {
        if (el.fill) {
          ctx.save();
          ctx.fillStyle = el.fill;
          ctx.fill(el);
          ctx.restore();
        }
        if (el.stroke) {
          ctx.save();
          ctx.strokeStyle = el.stroke;
          ctx.stroke(el);
          ctx.restore();
        }
      });
    });
  });
};

function svgRectPath(o: any): string {
  const tr = topRight(o);
  const tl = topLeft(o);
  const bl = bottomLeft(o);
  const br = bottomRight(o);
  const svgPath = `
  M${tl.x + o.rtl},${tl.y}
  H${tr.x - o.rtr} 
  Q${tr.x},${tr.y},${tr.x},${tr.y + o.rtr}
  V${br.y - o.rbr}
  Q${br.x},${br.y},${br.x - o.rbr},${br.y}
  H${bl.x + o.rbl}
  Q${bl.x},${bl.y},${bl.x},${bl.y - o.rbl}
  V${tl.y + o.rtl}
  Q${tl.x},${tl.y},${tl.x + o.rtl},${tl.y}
  Z
  `
    .replaceAll("\n", "")
    .replaceAll("\r", "")
    .replaceAll(" ", "");

  return svgPath;
}

function topLeft(obj: { x: number; y: number }) {
  const x = obj.x;
  const y = obj.y;
  return coordinates2D(x, y);
}

function topRight(obj: { x: number; y: number; w: number }) {
  const x = obj.x + obj.w;
  const y = obj.y;
  return coordinates2D(x, y);
}

function bottomLeft(obj: { x: number; y: number; h: number }) {
  const x = obj.x;
  const y = obj.y + obj.h;
  return coordinates2D(x, y);
}

function bottomRight(obj: { x: number; y: number; h: number; w: number }) {
  const x = obj.x + obj.w;
  const y = obj.y + obj.h;
  return coordinates2D(x, y);
}

function offsetFromOrigin(x: number, y: number) {
  const s = currentShape();
  if (s) {
    clickFromOrigin.offsetX = x - s.x;
    clickFromOrigin.offsetY = y - s.y;
  }
}

function coordinates2D(
  x: number,
  y: number
): { x: number; y: number; xy: [number, number] } {
  return { x, y, xy: [x, y] };
}
