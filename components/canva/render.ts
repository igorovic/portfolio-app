import { canvasId } from "./constants";
import { store } from "./store";
let clickPosition: { x: number; y: number } | null = null;

export function handleClick(e: MouseEvent) {
  const ctx = (
    document.getElementById("canva") as HTMLCanvasElement
  )?.getContext("2d");
  clickPosition = { x: e.offsetX, y: e.offsetY };
  console.debug(e);
  render();
}

export const render = () => {
  const o = store.getState().shape;
  if (typeof window === "undefined") return;
  const canva = document.getElementById(canvasId) as HTMLCanvasElement | null;

  window.requestAnimationFrame(() => {
    const ctx = canva?.getContext("2d");
    if (!ctx) {
      return console.error("canvas context is undefined");
    }

    ctx?.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    console.debug("click position", clickPosition);
    drawRect(ctx, o);

    if (clickPosition && ctx.isPointInPath(clickPosition.x, clickPosition.y)) {
      console.debug("click on shape detected");
    }
  });
};

function drawRect(ctx: CanvasRenderingContext2D, o: any) {
  if (o.fill) {
    ctx.fillStyle = o.fill;
  }
  const P = svgRectPath(o);
  //   ctx.beginPath();
  //   ctx.moveTo(topLeft(o).x + o.rtl, topLeft(o).y);
  //   ctx.lineTo(topRight(o).x - o.rtr, topRight(o).y);
  //   ctx.quadraticCurveTo(...topRight(o).xy, topRight(o).x, topRight(o).y + o.rtr);
  //   ctx.lineTo(bottomRight(o).x, bottomRight(o).y - o.rbr);
  //   ctx.quadraticCurveTo(
  //     ...bottomRight(o).xy,
  //     bottomRight(o).x - o.rbr,
  //     bottomRight(o).y
  //   );
  //   ctx.lineTo(bottomLeft(o).x + o.rbl, bottomLeft(o).y);
  //   ctx.quadraticCurveTo(
  //     ...bottomLeft(o).xy,
  //     bottomLeft(o).x,
  //     bottomLeft(o).y - o.rbl
  //   );
  //   ctx.lineTo(topLeft(o).x, topLeft(o).y + o.rtl);
  //   ctx.quadraticCurveTo(...topLeft(o).xy, topLeft(o).x + o.rtl, topLeft(o).y);
  //   ctx.closePath();
  if (o.fill) {
    ctx.fill(P);
  } else {
    ctx.stroke(P);
  }
}

function svgRectPath(o: any): Path2D {
  const tr = topRight(o);
  const tl = topLeft(o);
  const bl = bottomLeft(o);
  const br = bottomRight(o);
  const svgPath = `
  M ${tl.x + o.rtl} ${tl.y} 
  H ${tr.x - o.rtr} 
  Q ${tr.x} ${tr.y} ${tr.x} ${tr.y + o.rtr} 
  V ${br.y - o.rbr} 
  Q ${br.x} ${br.y} ${br.x - o.rbr} ${br.y}
  H ${bl.x + o.rbl} 
  Q ${bl.x} ${bl.y} ${bl.x} ${bl.y - o.rbl}
  V ${tl.y + o.rtl}
  Q ${tl.x} ${tl.y} ${tl.x + o.rtl} ${tl.y}
  `;
  console.debug(svgPath);
  return new Path2D(svgPath);
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

function coordinates2D(
  x: number,
  y: number
): { x: number; y: number; xy: [number, number] } {
  return { x, y, xy: [x, y] };
}
