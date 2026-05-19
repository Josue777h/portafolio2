import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

import proyecto1 from '../img/proyecto1.webp';
import proyecto2 from '../img/proyecto2.webp';
import proyecto3 from '../img/proyecto3.webp';
import proyecto4 from '../img/proyecto4.webp';
import proyecto5 from '../img/proyecto5.webp';
import proyecto6 from '../img/proyecto6.webp';

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const rafRef = useRef(0);
  const lastRef = useRef({ x: 50, y: 50 });

  const onMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    lastRef.current.x = ((event.clientX - r.left) / r.width) * 100;
    lastRef.current.y = ((event.clientY - r.top) / r.height) * 100;

    if (rafRef.current) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = 0;
      el.style.setProperty("--x", `${lastRef.current.x}%`);
      el.style.setProperty("--y", `${lastRef.current.y}%`);
    });
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onTouchMove={(e) => {
        const t = e.touches?.[0];
        if (!t) return;
        onMove({ clientX: t.clientX, clientY: t.clientY });
      }}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-[2rem] overflow-hidden glass border-white/10 hover:border-neon-cyan/25 transition-all"
      style={{
        background:
          "radial-gradient(520px circle at var(--x, 50%) var(--y, 50%), rgba(34,211,238,0.10), transparent 55%), radial-gradient(520px circle at calc(var(--x, 50%) + 18%) calc(var(--y, 50%) - 12%), rgba(168,85,247,0.08), transparent 58%), rgba(17,17,17,0.55)",
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(99,102,241,0.12),transparent_60%)]" />
      </div>

      <div className="aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/70 to-transparent pointer-events-none" />
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-slate-300 uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold mb-2 tracking-tight group-hover:text-neon-cyan transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 mb-5 line-clamp-2 text-sm leading-relaxed">{project.description}</p>

        <div className="flex gap-4">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="flex-1 relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 hover:border-neon-cyan/35 text-white py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.18),transparent_55%)]" />
            Demo <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "ACCESORIOS DE LUJO",
      description: "E-commerce especializado en accesorios de lujo para vehículos con diseño premium y pasarela de pagos.",
      image: proyecto1,
      tags: ["React", "E-commerce", "Stripe"],
      link: "https://aichure.co/",
      github: "#",
    },
    {
      title: "VENTA DE TRANSFORMADORES",
      description: "Plataforma industrial para la comercialización de transformadores de alta tensión con catálogo dinámico.",
      image: proyecto2,
      tags: ["Next.js", "Industrial", "SEO"],
      link: "https://www.transformadorescdm.com/",
      github: "#",
    },
    {
      title: "SITEWEB DE COMIDA SALUDABLE",
      description: "Sistema de pedidos online integrado con Ola Click para la gestión eficiente de domicilios.",
      image: proyecto3,
      tags: ["Web App", "Ola Click", "Delivery"],
      link: "https://sabor-tropical-2.ola.click/products",
      github: "#",
    },
    {
      title: "SISTEMA DE VENTA POR WHATSAPP",
      description: "Plataforma moderna y práctica diseñada para gestionar pedidos y ventas directamente desde WhatsApp de forma rápida y sencilla.",
      image: proyecto4,
      tags: ["Saas", "WhatsApp", "react"],
      link: "https://benevolent-chimera-f8e360.netlify.app/",
      github: "#",
    },
    {
      title: "VENTA DE SOFTWARE GIMNASIOS",
      description: "Landing page de alta conversión para software de gestión administrativa de centros deportivos.",
      image: proyecto5,
      tags: ["SaaS", "Marketing", "React"],
      link: "https://systemnecs.com/",
      github: "#",
    },
    {
      title: "CARBONOR",
      description: "Sitio web corporativo moderno desarrollado para una empresa de carbón, enfocado en mostrar sus servicios, productos y presencia empresarial de forma profesional y confiable.",
      image: proyecto6,
      tags: ["Saas", "WhatsApp", "react"],
      link: "https://carbonor.com.co/",
      github: "#",
    },
  ];

  return (
    <section id="projects" className="section-padding relative">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(34,211,238,0.08),transparent_60%)]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-outfit tracking-tighter mb-4">
              <span className="text-gradient">Proyectos</span> Destacados
            </h2>
            <p className="text-slate-400 max-w-lg">Experiencias modernas con motion, performance y detalle.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
