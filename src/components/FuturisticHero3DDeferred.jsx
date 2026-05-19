import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";

const FuturisticHero3DLazy = React.lazy(() => import("./FuturisticHero3D.jsx"));

const supportsIdleCallback = typeof window !== "undefined" && "requestIdleCallback" in window;

const shouldAvoidHeavyGraphics = () => {
  if (typeof window === "undefined") return true;
  const prefersReducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return true;

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection?.saveData) return true;
  const effectiveType = connection?.effectiveType;
  if (effectiveType === "slow-2g" || effectiveType === "2g") return true;

  return false;
};

const pickQuality = () => {
  if (typeof window === "undefined") return "low";
  const isSmall = window.matchMedia?.("(max-width: 768px)")?.matches ?? false;
  return isSmall ? "low" : "auto";
};

const FuturisticHero3DDeferred = ({ className = "", minHeight = 240, rootMargin = "250px" }) => {
  const hostRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [quality] = useState(() => pickQuality());
  const avoid = useMemo(() => shouldAvoidHeavyGraphics(), []);

  useEffect(() => {
    if (avoid) return undefined;
    const el = hostRef.current;
    if (!el) return undefined;

    let didCancel = false;
    const trigger = () => {
      if (didCancel) return;
      if (supportsIdleCallback) {
        window.requestIdleCallback(() => setShouldLoad(true), { timeout: 1200 });
      } else {
        setTimeout(() => setShouldLoad(true), 250);
      }
    };

    if (!("IntersectionObserver" in window)) {
      trigger();
      return () => {
        didCancel = true;
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          trigger();
        }
      },
      { root: null, rootMargin, threshold: 0.01 },
    );
    io.observe(el);

    return () => {
      didCancel = true;
      io.disconnect();
    };
  }, [avoid, rootMargin]);

  if (avoid) {
    return <div className={`relative overflow-hidden ${className}`} style={{ minHeight }} />;
  }

  return (
    <div ref={hostRef} className={`relative overflow-hidden ${className}`} style={{ minHeight }}>
      {shouldLoad ? (
        <Suspense fallback={null}>
          <FuturisticHero3DLazy className="absolute inset-0 w-full h-full" quality={quality} />
        </Suspense>
      ) : null}
    </div>
  );
};

export default FuturisticHero3DDeferred;
