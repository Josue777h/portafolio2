import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layout, Smartphone, Zap, Layers, Palette } from 'lucide-react';

const Skills = () => {
  const skills = [
    { name: "React / Next.js", icon: Code2, level: "95%" },
    { name: "JavaScript (ES6+)", icon: Zap, level: "90%" },
    { name: "Tailwind CSS", icon: Layout, level: "98%" },
    { name: "UI/UX Design", icon: Palette, level: "85%" },
    { name: "Mobile First", icon: Smartphone, level: "100%" },
    { name: "Framer Motion", icon: Layers, level: "80%" },
  ];

  return (
    <section id="skills" className="py-14 lg:py-20 relative">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.10),transparent_55%)]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-outfit tracking-tighter mb-3">
            Mis <span className="text-gradient">Habilidades</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Combinación de diseño creativo y desarrollo técnico robusto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="group glass p-5 rounded-2xl hover:bg-white/10 transition-all border-white/10 hover:border-neon-cyan/20"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-neon-cyan transition-all shrink-0 border border-white/10 bg-white/5 group-hover:border-neon-cyan/35">
                  <skill.icon size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold truncate">{skill.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">Nivel: {skill.level}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
