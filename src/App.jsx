import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';

function App() {
  return (
    <div className="relative overflow-hidden bg-primary text-white">
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute top-[-18%] right-[-18%] w-[520px] h-[520px] bg-neon-blue/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-18%] left-[-18%] w-[520px] h-[520px] bg-neon-cyan/12 rounded-full blur-[180px]" />
        <div className="absolute top-[10%] left-[30%] w-[520px] h-[520px] bg-neon-purple/10 rounded-full blur-[200px]" />
        <div className="absolute inset-0 noise-overlay" />
      </div>
      <CursorGlow />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
