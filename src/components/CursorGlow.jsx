import React, { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const glowRef = useRef(null);
  const rafRef = useRef(0);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return undefined;

    const onMove = (event) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div
        ref={glowRef}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(circle at center, rgba(34,211,238,0.22), rgba(99,102,241,0.14), rgba(168,85,247,0.0) 62%)",
        }}
      />
    </div>
  );
};

export default CursorGlow;

