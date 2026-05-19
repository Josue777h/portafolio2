import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import TechBackdrop from './TechBackdrop';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24">
      <div className="absolute inset-0 -z-10">
        <TechBackdrop className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/65 to-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(34,211,238,0.16),transparent_55%)] mix-blend-screen opacity-90 pointer-events-none" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/15">
              <span className="w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_22px_rgba(34,211,238,0.55)]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-200">
                Agencia tech • Disponible
              </span>
            </div>

            <h1 className="mt-6 text-5xl md:text-7xl lg:text-8xl font-black font-outfit tracking-tighter leading-[0.95]">
              Experiencias <span className="text-gradient">Digitales</span>
              <br />
              de Alto Impacto
            </h1>

            <p className="mt-6 max-w-2xl text-lg md:text-xl text-slate-300 leading-relaxed">
              Diseño, desarrollo y motion para marcas que quieren verse futuristas, premium y convertir más.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="#projects"
                className="group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 hover:border-neon-cyan/40 text-white px-7 py-4 rounded-2xl text-base font-bold transition-all shadow-xl shadow-black/30 flex items-center gap-2"
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.18),transparent_55%)]" />
                Ver Proyectos
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="group px-7 py-4 rounded-2xl text-base font-bold transition-all flex items-center gap-2 hover:bg-white/5 border border-transparent hover:border-white/10"
              >
                Contacto
                <ChevronRight size={18} className="text-slate-500 group-hover:text-white transition-colors" />
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-xs font-bold uppercase tracking-[0.28em] text-slate-500">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-blue/70" /> UI/UX
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan/70" /> Frontend
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-purple/70" /> Motion
              </span>
            </div>
          </motion.div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass border-white/10 rounded-[2.5rem] p-6 md:p-8 relative overflow-hidden"
            >
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-neon-purple/15 rounded-full blur-3xl" />
              <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-neon-cyan/12 rounded-full blur-3xl" />

              <div className="relative">
                <p className="text-sm font-bold text-slate-200 tracking-tight">
                  Entregables premium, sin humo.
                </p>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  Landing pages cinematográficas, componentes interactivos, micro-interacciones y sistemas UI listos para escalar.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { label: "Velocidad", value: "A+" },
                    { label: "Diseño", value: "Premium" },
                    { label: "Motion", value: "Fluido" },
                    { label: "SEO", value: "Sólido" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                        {item.label}
                      </p>
                      <p className="mt-2 text-lg font-black text-slate-100">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
