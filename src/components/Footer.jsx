import React from 'react';
import { Github, Linkedin, Twitter, Instagram, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold font-outfit mb-2">
              Josue<span className="text-gradient">.</span>
            </h3>
            <p className="text-sm text-slate-500 font-medium">© {new Date().getFullYear()} Todos los derechos reservados.</p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-500 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
          >
            Volver arriba
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-neon-cyan/50 group-hover:bg-neon-cyan/10 transition-all">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.3em]">
            Diseñado y Desarrollado con React + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

