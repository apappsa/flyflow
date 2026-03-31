'use client';

import React, { useState } from 'react';
import { Plane, CalendarDays, PlusCircle } from 'lucide-react';

export default function FlyFlowHome() {
  const [flights, setFlights] = useState([]);
  const [flightNumber, setFlightNumber] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [loading, setLoading] = useState(false); // <--- Estado de carga

  const addFlight = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flightNumber) return;

    setLoading(true); // Empezamos a buscar

    try {
      // Llamamos a nuestra API interna que creamos en el paso anterior
      const res = await fetch(`/api/flight?number=${flightNumber.toUpperCase()}`);
      const data = await res.json();

      if (data.error) {
        alert("Vuelo no encontrado. Prueba con uno activo hoy (ej: IB6250)");
      } else {
        const newFlight = {
          id: Date.now(),
          number: data.number,
          date: data.date || flightDate,
          origin: data.origin,
          destination: data.destination,
          status: data.status,
          progress: data.progress
        };
        setFlights([newFlight, ...flights]);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error al conectar con la API");
    } finally {
      setLoading(false); // Terminamos de buscar
      setFlightNumber('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] pb-10">
      <header className="bg-white px-6 pt-12 pb-6 border-b border-gray-200 sticky top-0 z-50">
        <h1 className="text-4xl font-extrabold tracking-tight">Mis Vuelos</h1>
      </header>

      <main className="p-4 space-y-8">
        <form onSubmit={addFlight} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
          <input 
            type="text" 
            placeholder="Ej: IB6501" 
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-semibold mb-4"
          />
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full text-white font-bold py-4 rounded-2xl transition ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {loading ? 'Buscando en radar...' : 'Seguir Vuelo Real'}
          </button>
        </form>

        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 px-2">Vuelos Actuales</h3>
          {flights.map(flight => (
            <div key={flight.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase block">{flight.status}</span>
                  <span className="text-lg font-bold">{flight.number}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold">{flight.origin} <Plane size={14} className="inline mx-1 rotate-90 text-blue-400" /> {flight.destination}</span>
                  <p className="text-xs text-gray-400">{flight.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
