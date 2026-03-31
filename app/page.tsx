'use client';

import { Plane, Clock, Shield, Luggage, CheckCircle2, Navigation, Bell, Info } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FlightyTheme() {
  const [currentTime, setCurrentTime] = useState('');

  // Efecto para el reloj en tiempo real
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { id: 1, title: "Salida al Aeropuerto", time: "11:15", status: "done", icon: <Navigation size={18}/> },
    { id: 2, title: "Check-in Online", time: "12:00", status: "done", icon: <CheckCircle2 size={18}/> },
    { id: 3, title: "Facturación de Equipaje", time: "13:10", status: "current", icon: <Luggage size={18}/>, info: "Mostradores 401-412" },
    { id: 4, title: "Control de Seguridad", time: "13:45", status: "next", icon: <Shield size={18}/> },
    { id: 5, title: "Puerta de Embarque", time: "14:15", status: "next", icon: <Plane size={18}/>, info: "Puerta B22" },
  ];

  return (
    <main className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] font-sans antialiased pb-10">
      {/* Barra de Estado Superior */}
      <div className="bg-white px-6 pt-12 pb-6 border-b border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">En Tiempo Real</span>
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
             <Clock size={14} className="text-gray-500" />
             <span className="text-sm font-semibold font-mono">{currentTime || '--:--'}</span>
          </div>
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight mb-1">Barcelona</h1>
        <div className="flex items-center gap-3 text-gray-400 font-medium">
          <span>BCN</span>
          <Plane size={16} className="text-blue-500 fill-blue-500 rotate-90" />
          <span>Paris ORY</span>
        </div>
      </div>

      {/* Tarjeta de Vuelo Estilo iOS */}
      <div className="p-4">
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Vuelo</p>
              <p className="text-xl font-bold">VY3912</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Terminal</p>
              <p className="text-xl font-bold text-blue-600">T1</p>
            </div>
          </div>
          
          <div className="h-[2px] w-full bg-gray-50 mb-6" />

          {/* Timeline */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex gap-4">
                {/* Conector Vertical */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-[17px] top-8 w-[2px] h-full bg-gray-100" />
                )}
                
                {/* Punto / Icono */}
                <div className={`z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  step.status === 'done' ? 'bg-blue-50 text-blue-500 border border-blue-100' :
                  step.status === 'current' ? 'bg-blue-500 text-white shadow-lg shadow-blue-200' : 
                  'bg-gray-50 text-gray-300 border border-gray-100'
                }`}>
                  {step.icon}
                </div>

                {/* Contenido */}
                <div className="flex-1 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-bold text-md ${step.status === 'next' ? 'text-gray-300' : 'text-gray-800'}`}>
                        {step.title}
                      </h3>
                      {step.info && (
                        <p className="text-xs font-semibold text-blue-500 mt-0.5 flex items-center gap-1">
                          <Info size={12} /> {step.info}
                        </p>
                      )}
                    </div>
                    <span className={`text-sm font-bold font-mono ${step.status === 'next' ? 'text-gray-200' : 'text-gray-400'}`}>
                      {step.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón de Notificaciones */}
        <button className="w-full bg-white border border-gray-200 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-sm active:scale-[0.98] transition-transform">
          <Bell size={20} className="text-blue-500" />
          <span className="font-bold text-gray-700">Configurar Alertas</span>
        </button>
      </div>
    </main>
  );
}
