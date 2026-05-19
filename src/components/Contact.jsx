import React from 'react';
import { Mail, MessageCircle, Send, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_60%,rgba(168,85,247,0.10),transparent_55%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="glass rounded-[3rem] p-6 sm:p-8 md:p-16 lg:p-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-neon-blue/10 blur-[120px] -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit tracking-tighter mb-8 leading-tight">
                ¿Tienes un proyecto en mente? <br />
                <span className="text-gradient">Hablemos ahora.</span>
              </h2>
              <p className="text-lg text-slate-400 mb-12">
                Estoy disponible para nuevos proyectos y colaboraciones. Si buscas elevar tu presencia digital, estás
                en el lugar correcto.
              </p>

              <div className="space-y-6">
                {[
                  { label: "Email", value: "josuesepulvedassj@gmail.com", icon: Mail },
                  { label: "Teléfono", value: "+57 311 293 6388", icon: Phone },
                  { label: "Ubicación", value: "Cúcuta, Colombia", icon: MapPin },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-neon-cyan transition-all border border-white/10 bg-white/5 group-hover:border-neon-cyan/35 shrink-0 mt-1">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
                      {item.label === "Email" ? (
                        <a
                          href={`mailto:${item.value}`}
                          className="text-lg font-bold break-all hover:text-neon-cyan transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-lg font-bold break-words">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 p-6 sm:p-8 rounded-[2rem] border border-white/10 relative overflow-hidden lg:col-span-7">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-neon-purple/10 blur-3xl" />
              <form className="space-y-6 relative">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nombre</label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full bg-primary/60 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-neon-cyan/50 transition-colors font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                  <input
                    type="email"
                    placeholder="email@ejemplo.com"
                    className="w-full bg-primary/60 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-neon-cyan/50 transition-colors font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Mensaje</label>
                  <textarea
                    rows="4"
                    placeholder="Cuéntame sobre tu proyecto..."
                    className="w-full bg-primary/60 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-neon-cyan/50 transition-colors font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 hover:border-neon-cyan/35 text-white py-4 rounded-xl font-bold transition-all shadow-xl shadow-black/30 flex items-center justify-center gap-2 group"
                >
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.20),transparent_55%)]" />
                  Enviar Mensaje
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-center gap-6 relative">
                <a
                  href="https://wa.me/573112936388"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-neon-cyan transition-colors"
                >
                  <MessageCircle size={28} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
