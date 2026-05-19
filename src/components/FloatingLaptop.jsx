import React from 'react';
import { motion } from 'framer-motion';

const FloatingLaptop = () => {
  return (
    <motion.div
      className="relative w-[18rem] h-[18rem] md:w-[20rem] md:h-[20rem]"
      style={{ perspective: 900 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        drag
        dragElastic={0.18}
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        whileHover={{ rotateX: 12, rotateY: -14, scale: 1.02 }}
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Screen */}
        <div
          className="absolute left-1/2 top-[14%] w-[78%] h-[48%] -translate-x-1/2 rounded-2xl border border-white/10 shadow-2xl"
          style={{
            transform: "translateZ(40px) rotateX(10deg)",
            background:
              "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.14), rgba(255,255,255,0) 52%), linear-gradient(135deg, rgba(34,211,238,0.20), rgba(168,85,247,0.08))",
          }}
        >
          <div className="absolute inset-[10px] rounded-xl bg-primary/60 border border-white/10 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-neon-cyan/15 blur-2xl" />
            <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute top-4 left-4 right-4 h-2 rounded-full bg-white/5" />
            <div className="absolute top-10 left-4 w-24 h-3 rounded-full bg-white/10" />
            <div className="absolute top-16 left-4 w-40 h-3 rounded-full bg-white/5" />
          </div>
        </div>

        {/* Hinge */}
        <div
          className="absolute left-1/2 top-[58%] w-[82%] h-[10px] -translate-x-1/2 rounded-full bg-white/5 border border-white/10"
          style={{ transform: "translateZ(26px) rotateX(12deg)" }}
        />

        {/* Base / Keyboard */}
        <div
          className="absolute left-1/2 top-[60%] w-[88%] h-[34%] -translate-x-1/2 rounded-[2rem] border border-white/10 shadow-2xl"
          style={{
            transform: "translateZ(10px) rotateX(64deg)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)), radial-gradient(circle at 50% 10%, rgba(99,102,241,0.16), rgba(255,255,255,0) 55%)",
          }}
        >
          <div className="absolute left-1/2 top-[22%] w-[42%] h-[22%] -translate-x-1/2 rounded-xl bg-white/5 border border-white/10" />
          <div className="absolute left-[8%] right-[8%] top-[52%] h-[1px] bg-white/10" />
          <div className="absolute left-[8%] right-[8%] bottom-[16%] h-[1px] bg-white/10" />
        </div>

        {/* Shadow */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-56 h-10 rounded-full bg-black/50 blur-2xl translate-y-16" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FloatingLaptop;
