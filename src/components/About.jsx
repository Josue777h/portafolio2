import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import FuturisticHero3DDeferred from './FuturisticHero3DDeferred';

const About = () => {
  const highlights = [
    "Diseño de Interfaces Modernas",
    "Desarrollo Frontend React/Next.js",
    "Optimización de Rendimiento",
    "Enfoque en Experiencia de Usuario",
  ];

  return (
    <section id="about" className="section-padding relative">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_30%,rgba(34,211,238,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(168,85,247,0.08),transparent_55%)]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-1/2"
          >
            <div className="relative">
                <div className="w-full aspect-square rounded-[3rem] overflow-hidden p-[1px] bg-gradient-to-br from-neon-cyan/50 via-neon-blue/30 to-neon-purple/45">
                <div className="w-full h-full bg-primary rounded-[2.9rem] overflow-hidden">
                  <FuturisticHero3DDeferred className="w-full h-full" minHeight={320} rootMargin="150px" />
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 glass p-6 rounded-3xl shadow-2xl">
                <p className="text-4xl font-black font-outfit text-neon-cyan leading-none">4+</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Años de Exp.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-outfit tracking-tighter mb-8">
              Creando soluciones digitales con <span className="text-gradient">propósito y estilo</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Soy un desarrollador web apasionado por la intersección entre el diseño visual y el código funcional.
              Mi enfoque es simplificar problemas complejos para convertirlos en interfaces intuitivas que deleiten a
              los usuarios.
            </p>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
              He trabajado con diversas tecnologías del ecosistema web, especializándome en React para construir
              aplicaciones escalables y de alto rendimiento.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-neon-cyan" />
                  <span className="text-slate-200 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
