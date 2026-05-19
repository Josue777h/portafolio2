import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Sobre mí', href: '#about' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
      <div className="container mx-auto px-6">
        <div
          className={`flex items-center justify-between glass rounded-2xl px-6 py-3 transition-all duration-300 ${
            isScrolled ? 'bg-surface/70 shadow-2xl border-white/10' : 'bg-transparent border-transparent'
          }`}
        >
          <a href="#home" className="text-2xl font-bold font-outfit tracking-tighter">
            Josue<span className="text-gradient">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-2 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-neon-cyan after:via-neon-blue after:to-neon-purple after:transition-transform hover:after:scale-x-100"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 hover:border-neon-cyan/35 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-black/30"
            >
              <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.20),transparent_55%)]" />
              Hablemos
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen((v) => !v)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 glass rounded-2xl p-6 md:hidden z-40"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-slate-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-center text-white px-5 py-3 rounded-xl font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                Hablemos
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

