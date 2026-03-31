import { Plane, MapPin, Clock, Shield, Luggage, CheckCircle2, Navigation } from 'lucide-react';

export default function FlyFlow() {
  const steps = [
    { id: 1, title: "Salida al Aeropuerto", time: "11:15", status: "done", icon: <Navigation size={20}/> },
    { id: 2, title: "Check-in Online", time: "12:00", status: "done", icon: <CheckCircle2 size={20}/> },
    { id: 3, title: "Facturación de Equipaje", time: "13:10", status: "current", icon: <Luggage size={20}/>, info: "Mostradores 401-412" },
    { id: 4, title: "Control de Seguridad", time: "13:45", status: "next", icon: <Shield size={20}/> },
    { id: 5, title: "Puerta de Embarque", time: "14:15", status: "next", icon: <Plane size={20}/>, info: "Puerta B22" },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 font-sans">
      {/* Header Estilo Glassmorphism */}
      <div className="mb-10 pt-4">
        <h1 className="text-4xl font-extrabold tracking-tighter bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          FlyFlow
        </h1>
        <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
          <div className="flex justify-between items-center uppercase tracking-widest text-xs text-slate-400">
            <span>Barcelona (BCN)</span>
            <Plane size={16} className="rotate-90 text-blue-400"/>
            <span>Paris (ORY)</span>
          </div>
          <div className="flex justify-between text-2xl font-mono mt-2">
            <span>14:30</span>
            <span className="text-blue-400 underline decoration-dotted underline-offset-4">VY3912</span>
            <span>16:15</span>
          </div>
        </div>
      </div>

      {/* Timeline Step-by-Step */}
      <div className="relative space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex gap-4">
            {/* Línea conectora */}
            {index !== steps.length - 1 && (
              <div className="absolute left-[22px] top-10 w-[2px] h-full bg-gradient-to-b from-white/10 to-transparent" />
            )}
            
            {/* Icono con estado */}
            <div className={`z-10 w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
              step.status === 'done' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' :
              step.status === 'current' ? 'bg-blue-600 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 
              'bg-white/5 border-white/10 text-white/30'
            }`}>
              {step.icon}
            </div>

            {/* Texto del paso */}
            <div className={`flex-1 pb-8 transition-opacity ${step.status === 'next' ? 'opacity-40' : 'opacity-100'}`}>
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">{step.title}</h3>
                <span className="font-mono text-sm bg-white/10 px-2 py-1 rounded-lg">{step.time}</span>
              </div>
              {step.info && (
                <p className="text-blue-300 text-sm mt-1 font-medium">{step.info}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
