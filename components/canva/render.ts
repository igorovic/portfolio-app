export const render = (canvasId: string, o: any) => {
  if (typeof window === "undefined") return;

  window.requestAnimationFrame(() => {
    const canva = document.getElementById(canvasId) as HTMLCanvasElement | null;
    const ctx = canva?.getContext("2d");
    if (!ctx) {
      return console.error("canvas context is undefined");
    }

    ctx?.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    drawRect(ctx, o);
  });
};

function drawRect(ctx: CanvasRenderingContext2D, o: any) {
  if (o.fill) {
    ctx.fillStyle = o.fill;
  }
  if (o.rtl) {
    ctx.beginPath();
    ctx.moveTo(topLeft(o).x + o.rtl, topLeft(o).y);
    ctx.lineTo(topRight(o).x - o.rtr, topRight(o).y);
    ctx.quadraticCurveTo(
      ...topRight(o).xy,
      topRight(o).x,
      topRight(o).y + o.rtr
    );
    ctx.lineTo(bottomRight(o).x, bottomRight(o).y - o.rbr);
    ctx.quadraticCurveTo(
      ...bottomRight(o).xy,
      bottomRight(o).x - o.rbr,
      bottomRight(o).y
    );
    ctx.lineTo(bottomLeft(o).x + o.rbl, bottomLeft(o).y);
    ctx.quadraticCurveTo(
      ...bottomLeft(o).xy,
      bottomLeft(o).x,
      bottomLeft(o).y - o.rbl
    );
    ctx.lineTo(topLeft(o).x, topLeft(o).y + o.rtl);
    ctx.quadraticCurveTo(...topLeft(o).xy, topLeft(o).x + o.rtl, topLeft(o).y);
    ctx.closePath();
    if (o.fill) {
      ctx.fill();
    }
  } else {
    if (o.fill) {
      ctx.fillRect(o.x, o.y, o.w, o.h);
    } else {
      ctx.rect(o.x, o.y, o.w, o.h);
    }
  }
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
