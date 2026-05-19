import React, { useEffect, useMemo, useRef } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const TechBackdrop = ({ className = "" }) => {
  const canvasRef = useRef(null);
  const stateRef = useRef({ rafId: 0, ro: null });

  const seed = useMemo(() => Math.random() * 10_000, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return undefined;

    const reduced = prefersReducedMotion();
    const dprCap = reduced ? 1 : 1.25;
    const getDpr = () => Math.min(window.devicePixelRatio || 1, dprCap);

    const rand = (n) => {
      const x = Math.sin(n) * 10000;
      return x - Math.floor(x);
    };

    const nodes = [];
    let w = 1;
    let h = 1;
    let dpr = 1;

    const rebuild = () => {
      const host = canvas.parentElement;
      w = Math.max(1, host?.clientWidth || 1);
      h = Math.max(1, host?.clientHeight || 1);
      dpr = getDpr();
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      nodes.length = 0;
      const count = Math.floor(Math.min(110, Math.max(45, (w * h) / 16000)));
      for (let i = 0; i < count; i += 1) {
        const nx = rand(seed + i * 12.13);
        const ny = rand(seed + i * 3.73);
        nodes.push({
          x: nx * w,
          y: ny * h,
          r: 1.2 + rand(seed + i * 9.1) * 2.2,
          phase: rand(seed + i * 6.77) * Math.PI * 2,
        });
      }
    };

    const drawStatic = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // base gradient
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "rgba(2,6,23,0.05)");
      g.addColorStop(0.55, "rgba(2,6,23,0.55)");
      g.addColorStop(1, "rgba(2,6,23,0.85)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // subtle grid
      const grid = Math.max(34, Math.min(64, Math.floor(w / 18)));
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = "rgba(99,102,241,0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = (w % grid) / 2; x < w; x += grid) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = (h % grid) / 2; y < h; y += grid) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // nodes + short links
      ctx.globalAlpha = 1;
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        // links (limit)
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 160) continue;
          const alpha = (1 - dist / 160) * 0.22;
          ctx.strokeStyle = `rgba(34,211,238,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        // glow dot
        const rg = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, a.r * 8);
        rg.addColorStop(0, "rgba(34,211,238,0.55)");
        rg.addColorStop(1, "rgba(34,211,238,0)");
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r * 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(226,232,240,0.85)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // vignette
      const v = ctx.createRadialGradient(w * 0.5, h * 0.35, 20, w * 0.5, h * 0.35, Math.max(w, h) * 0.75);
      v.addColorStop(0, "rgba(0,0,0,0)");
      v.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, w, h);
    };

    const draw = (tMs) => {
      const t = tMs * 0.001;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // base gradient
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "rgba(2,6,23,0.03)");
      g.addColorStop(0.55, "rgba(2,6,23,0.55)");
      g.addColorStop(1, "rgba(2,6,23,0.88)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // animated scan line
      const scanY = (t * 38) % (h + 220) - 110;
      const sg = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      sg.addColorStop(0, "rgba(34,211,238,0)");
      sg.addColorStop(0.5, "rgba(34,211,238,0.10)");
      sg.addColorStop(1, "rgba(34,211,238,0)");
      ctx.fillStyle = sg;
      ctx.fillRect(0, scanY - 80, w, 160);

      // subtle grid
      const grid = Math.max(34, Math.min(64, Math.floor(w / 18)));
      ctx.globalAlpha = 0.11;
      ctx.strokeStyle = "rgba(99,102,241,0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      const xOffset = (t * 6) % grid;
      const yOffset = (t * 3) % grid;
      for (let x = (w % grid) / 2 - xOffset; x < w + grid; x += grid) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = (h % grid) / 2 - yOffset; y < h + grid; y += grid) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      // nodes + links + twinkle
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        const tw = 0.6 + 0.4 * Math.sin(t * 1.6 + a.phase);

        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 170) continue;
          const alpha = (1 - dist / 170) * 0.2;
          ctx.strokeStyle = `rgba(34,211,238,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        const rg = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, a.r * 9);
        rg.addColorStop(0, `rgba(34,211,238,${0.38 * tw})`);
        rg.addColorStop(1, "rgba(34,211,238,0)");
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r * 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(226,232,240,${0.55 + 0.35 * tw})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // vignette
      const v = ctx.createRadialGradient(w * 0.5, h * 0.35, 20, w * 0.5, h * 0.35, Math.max(w, h) * 0.75);
      v.addColorStop(0, "rgba(0,0,0,0)");
      v.addColorStop(1, "rgba(0,0,0,0.58)");
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, w, h);

      stateRef.current.rafId = window.requestAnimationFrame(draw);
    };

    rebuild();
    drawStatic();

    const ro = new ResizeObserver(() => {
      rebuild();
      drawStatic();
    });
    ro.observe(canvas.parentElement || canvas);
    stateRef.current.ro = ro;

    const onVis = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(stateRef.current.rafId);
        stateRef.current.rafId = 0;
        return;
      }
      if (!reduced && !stateRef.current.rafId) stateRef.current.rafId = window.requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);

    if (!reduced) stateRef.current.rafId = window.requestAnimationFrame(draw);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.cancelAnimationFrame(stateRef.current.rafId);
      stateRef.current.rafId = 0;
      stateRef.current.ro?.disconnect?.();
      stateRef.current.ro = null;
    };
  }, [seed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
};

export default TechBackdrop;
