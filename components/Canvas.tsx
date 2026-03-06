import React, { useEffect, useRef, useState } from "react";

type DrawTool = "pen" | "pencil" | "paintbrush" | "crayon" | "eraser";
type ShapeTool = "circle" | "rect" | "line";
type Tool = DrawTool | ShapeTool;
type ActiveTab = "draw" | "shapes";
type EraserSize = "S" | "M" | "L";

const COLORS = [
  "#E63946", // red
  "#F4611D", // orange
  "#FFD60A", // yellow
  "#2DC653", // green
  "#4361EE", // blue
  "#9B5DE5", // purple
  "#F72585", // pink
  "#1a1a1a", // black
];

const ERASER_PX: Record<EraserSize, number> = { S: 14, M: 36, L: 72 };

const isShapeTool = (t: Tool): t is ShapeTool =>
  t === "circle" || t === "rect" || t === "line";

const eraserCursor = (px: number) => {
  const s = Math.max(px, 8);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}"><circle cx="${s / 2}" cy="${s / 2}" r="${s / 2 - 1.5}" fill="none" stroke="#444" stroke-width="1.5" opacity="0.7"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${s / 2} ${s / 2}, crosshair`;
};

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const shapeStart = useRef<{ x: number; y: number } | null>(null);
  const snapshot = useRef<ImageData | null>(null);

  const [activeTab, setActiveTab] = useState<ActiveTab>("draw");
  const [tool, setTool] = useState<Tool>("pen");
  const [color, setColor] = useState(COLORS[7]);
  const [eraserSize, setEraserSize] = useState<EraserSize>("M");

  const toolRef = useRef(tool);
  const colorRef = useRef(color);
  const eraserSizeRef = useRef(eraserSize);
  useEffect(() => { toolRef.current = tool; }, [tool]);
  useEffect(() => { colorRef.current = color; }, [color]);
  useEffect(() => { eraserSizeRef.current = eraserSize; }, [eraserSize]);

  const switchTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setTool(tab === "draw" ? "pen" : "circle");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const getPos = (clientX: number, clientY: number) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const applyDrawStyle = (ctx: CanvasRenderingContext2D) => {
    const t = toolRef.current;
    ctx.globalCompositeOperation = "source-over";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = colorRef.current;
    if (t === "pen") {
      ctx.lineWidth = 2;
      ctx.globalAlpha = 1;
    } else if (t === "pencil") {
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.55;
    } else if (t === "paintbrush") {
      ctx.lineWidth = 18;
      ctx.globalAlpha = 0.88;
    } else if (t === "crayon") {
      ctx.lineWidth = 14;
      ctx.globalAlpha = 0.62;
    } else {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
      ctx.lineWidth = ERASER_PX[eraserSizeRef.current];
      ctx.globalAlpha = 1;
    }
  };

  const drawSegment = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    applyDrawStyle(ctx);
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  };

  const drawShape = (
    ctx: CanvasRenderingContext2D,
    start: { x: number; y: number },
    end: { x: number; y: number },
    preview = false,
  ) => {
    const t = toolRef.current as ShapeTool;
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = colorRef.current;
    ctx.lineWidth = 2.5;
    ctx.globalAlpha = preview ? 0.6 : 1;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    if (t === "line") {
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
    } else if (t === "rect") {
      ctx.rect(start.x, start.y, end.x - start.x, end.y - start.y);
    } else {
      const cx = (start.x + end.x) / 2;
      const cy = (start.y + end.y) / 2;
      ctx.ellipse(cx, cy, Math.abs(end.x - start.x) / 2, Math.abs(end.y - start.y) / 2, 0, 0, Math.PI * 2);
    }
    ctx.stroke();
  };

  // --- Shape helpers ---
  const startShape = (pos: { x: number; y: number }) => {
    shapeStart.current = pos;
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) snapshot.current = ctx.getImageData(0, 0, canvasRef.current!.width, canvasRef.current!.height);
  };

  const updateShape = (pos: { x: number; y: number }) => {
    if (!shapeStart.current || !snapshot.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.putImageData(snapshot.current, 0, 0);
    drawShape(ctx, shapeStart.current, pos, true);
  };

  const commitShape = (pos: { x: number; y: number }) => {
    if (!shapeStart.current || !snapshot.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.putImageData(snapshot.current, 0, 0);
    drawShape(ctx, shapeStart.current, pos, false);
    shapeStart.current = null;
    snapshot.current = null;
  };

  const cancelShape = () => {
    if (!snapshot.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) ctx.putImageData(snapshot.current, 0, 0);
    shapeStart.current = null;
    snapshot.current = null;
  };

  // --- Mouse handlers ---
  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getPos(e.clientX, e.clientY);
    if (isShapeTool(toolRef.current)) startShape(pos);
    else { drawing.current = true; lastPos.current = pos; }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getPos(e.clientX, e.clientY);
    if (isShapeTool(toolRef.current)) { updateShape(pos); return; }
    if (!drawing.current || !lastPos.current) return;
    drawSegment(lastPos.current, pos);
    lastPos.current = pos;
  };

  const onMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getPos(e.clientX, e.clientY);
    if (isShapeTool(toolRef.current)) commitShape(pos);
    else { drawing.current = false; lastPos.current = null; }
  };

  const onMouseLeave = () => {
    if (isShapeTool(toolRef.current)) cancelShape();
    else { drawing.current = false; lastPos.current = null; }
  };

  // --- Touch handlers ---
  const onTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const t = e.touches[0];
    const pos = getPos(t.clientX, t.clientY);
    if (isShapeTool(toolRef.current)) startShape(pos);
    else { drawing.current = true; lastPos.current = pos; }
  };

  const onTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const t = e.touches[0];
    const pos = getPos(t.clientX, t.clientY);
    if (isShapeTool(toolRef.current)) { updateShape(pos); return; }
    if (!drawing.current || !lastPos.current) return;
    drawSegment(lastPos.current, pos);
    lastPos.current = pos;
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isShapeTool(toolRef.current)) {
      const t = e.changedTouches[0];
      commitShape(getPos(t.clientX, t.clientY));
    } else {
      drawing.current = false;
      lastPos.current = null;
    }
  };

  const cursor = tool === "eraser" ? eraserCursor(ERASER_PX[eraserSize]) : "crosshair";

  // --- Toolbar styles ---
  const glass: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.35)",
    backdropFilter: "blur(16px) saturate(160%)",
    WebkitBackdropFilter: "blur(16px) saturate(160%)",
    border: "1px solid rgba(255,255,255,0.5)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.65), 0 4px 20px rgba(0,0,0,0.1)",
    userSelect: "none",
  };

  const tabBtn = (active: boolean): React.CSSProperties => ({
    fontFamily: "Inter, sans-serif",
    fontSize: 13,
    padding: "4px 11px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    background: active ? "#1a1a1a" : "transparent",
    color: active ? "#fff" : "#666",
    fontWeight: active ? 500 : 400,
    transition: "background 0.15s, color 0.15s",
  });

  const toolBtn = (active: boolean): React.CSSProperties => ({
    fontFamily: "Inter, sans-serif",
    fontSize: 13,
    padding: "4px 11px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    background: active ? "#d94e0f" : "transparent",
    color: active ? "#fff" : "#444",
    fontWeight: active ? 500 : 400,
    transition: "background 0.15s, color 0.15s",
  });

  const divider: React.CSSProperties = {
    width: 1, height: 20, background: "rgba(0,0,0,0.12)", margin: "0 4px", flexShrink: 0,
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", inset: 0, background: "#FFF1E9", cursor, display: "block" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />

      <div
        style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}
        onMouseDown={e => e.stopPropagation()}
      >
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#bbb", textAlign: "center", marginBottom: 10, letterSpacing: "0.03em" }}>
          Press ESC to return · Right click to save
        </p>

        <div style={glass}>

          {/* Tab switcher */}
          <button style={tabBtn(activeTab === "draw")} onClick={() => switchTab("draw")}>Draw</button>
          <button style={tabBtn(activeTab === "shapes")} onClick={() => switchTab("shapes")}>Shapes</button>

          <div style={divider} />

          {activeTab === "draw" ? (
            <>
              <button style={toolBtn(tool === "pen")} onClick={() => setTool("pen")}>Pen</button>
              <button style={toolBtn(tool === "pencil")} onClick={() => setTool("pencil")}>Pencil</button>
              <button style={toolBtn(tool === "paintbrush")} onClick={() => setTool("paintbrush")}>Brush</button>
              <button style={toolBtn(tool === "crayon")} onClick={() => setTool("crayon")}>Crayon</button>

              <div style={divider} />

              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#666", marginRight: 2 }}>Eraser</span>
              {(["S", "M", "L"] as const).map((sz) => {
                const active = tool === "eraser" && eraserSize === sz;
                const dot = sz === "S" ? 8 : sz === "M" ? 13 : 19;
                return (
                  <button
                    key={sz}
                    onClick={() => { setTool("eraser"); setEraserSize(sz); }}
                    style={{
                      width: dot + 10, height: dot + 10, borderRadius: "50%", padding: 0, border: "none",
                      background: active ? "#d94e0f" : "rgba(0,0,0,0.07)", cursor: "pointer", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "background 0.15s",
                    }}
                  >
                    <span style={{
                      width: dot, height: dot, borderRadius: "50%", display: "block",
                      background: active ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.18)",
                    }} />
                  </button>
                );
              })}
            </>
          ) : (
            <>
              {([
                { id: "circle" as ShapeTool, label: "Circle" },
                { id: "rect" as ShapeTool, label: "Rect" },
                { id: "line" as ShapeTool, label: "Line" },
              ]).map(({ id, label }) => (
                <button key={id} style={toolBtn(tool === id)} onClick={() => setTool(id)}>
                  {label}
                </button>
              ))}
            </>
          )}

          <div style={divider} />

          {/* Shared color swatches */}
          {COLORS.map((c) => (
            <button
              key={c}
              title={c}
              onClick={() => setColor(c)}
              style={{
                width: 20, height: 20, borderRadius: "50%", padding: 0, border: "none",
                background: c, cursor: "pointer", flexShrink: 0,
                outline: color === c ? "2px solid #d94e0f" : "2px solid transparent",
                outlineOffset: 2,
                transition: "outline 0.15s",
              }}
            />
          ))}

        </div>
      </div>
    </>
  );
};

export default Canvas;
