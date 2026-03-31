'use client';

import React, { useState } from 'react';
import { Plane, CalendarDays, PlusCircle, ArrowRight } from 'lucide-react';

export default function FlyFlowHome() {
  const [flights, setFlights] = useState([
    { id: 1, number: 'VY3912', date: '2023-10-27', origin: 'BCN', destination: 'ORY', status: 'In Flight', progress: 65 },
    { id: 2, number: 'IB3150', date: '2023-10-28', origin: 'MAD', destination: 'JFK', status: 'Scheduled', progress: 0 },
    { id: 3, number: 'UX1001', date: '2023-10-20', origin: 'BCN', destination: 'PMI', status: 'Landed', progress: 100 },
  ]);
  const [flightNumber, setFlightNumber] = useState('');
  const [flightDate, setFlightDate] = useState('');

  const addFlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flightNumber || !flightDate) return;
    
    const newFlight = {
      id: Date.now(),
      number: flightNumber.toUpperCase(),
      date: flightDate,
      origin: '???',
      destination: '???',
      status: 'Scheduled',
      progress: 0
    };
    
    setFlights([newFlight, ...flights]);
    setFlightNumber('');
    setFlightDate('');
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] pb-10">
      <header className="bg-white px-6 pt-12 pb-6 border-b border-gray-200 sticky top-0 z-50">
        <h1 className="text-4xl font-extrabold tracking-tight">Mis Vuelos</h1>
        <p className="text-gray-500 font-medium">Gestiona tus viajes</p>
      </header>

      <main className="p-4 space-y-8">
        <form onSubmit={addFlight} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-50 p-3 rounded-2xl text-blue-500">
                <PlusCircle size={24} />
            </div>
            <h2 className="text-xl font-bold">Nuevo Vuelo</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-4 mb-6">
            <input 
              type="text" 
              placeholder="Ej: VY3912" 
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-semibold"
            />
            <input 
              type="date" 
              value={flightDate}
              onChange={(e) => setFlightDate(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-semibold"
            />
          </div>
          
          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-4 rounded-2xl hover:bg-blue-600 transition">
            Seguir Vuelo Real
          </button>
        </form>

        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 px-2">Vuelos Actuales</h3>
          {flights.map(flight => (
            <div key={flight.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-blue-600 block">{flight.status}</span>
                  <span className="text-lg font-bold">{flight.number}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold">{flight.origin} ✈️ {flight.destination}</span>
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
