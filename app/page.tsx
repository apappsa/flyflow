'use client';

import { useState } from 'react';
import { Plane, CalendarDays, PlusCircle, ArrowRight } from 'lucide-react';

// --- TIPOS ---
interface Flight {
  id: number;
  number: string;
  date: string;
  origin: string;
  destination: string;
  status: string;
  progress: number;
}

// --- MOCK DATA ---
const initialFlights: Flight[] = [
  { id: 1, number: 'VY3912', date: '2023-10-27', origin: 'BCN', destination: 'ORY', status: 'In Flight', progress: 65 },
  { id: 2, number: 'IB3150', date: '2023-10-28', origin: 'MAD', destination: 'JFK', status: 'Scheduled', progress: 0 },
  { id: 3, number: 'UX1001', date: '2023-10-20', origin: 'BCN', destination: 'PMI', status: 'Landed', progress: 100 },
];

export default function FlyFlowHome() {
  const [flights, setFlights] = useState<Flight[]>(initialFlights);
  const [flightNumber, setFlightNumber] = useState('');
  const [flightDate, setFlightDate] = useState('');

  const addFlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flightNumber || !flightDate) return;
    
    const newFlight: Flight = {
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

  const pendingFlights = flights.filter(f => f.status !== 'Landed');
  const pastFlights = flights.filter(f => f.status === 'Landed');

  return (
    <main className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] pb-10">
      <div className="bg-white px-6 pt-12 pb-6 border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <h1 className="text-4xl font-extrabold tracking-tight">Mis Vuelos</h1>
        <p className="text-gray-500 font-medium">Gestiona tus viajes</p>
      </div>

      <div className="p-4 space-y-8">
        <form onSubmit={addFlight} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-50 p-3 rounded-2xl text-blue-500 border border-blue-100">
                <PlusCircle size={24} />
            </div>
            <h2 className="text-xl font-bold">Añadir Nuevo Vuelo</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Plane className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Ej: VY3912" 
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-semibold focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>
            <div className="relative">
              <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="date" 
                value={flightDate}
                onChange={(e) => setFlightDate(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-semibold text-gray-700 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>
          </div>
          
          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-blue-600 transition flex items-center justify-center gap-2">
            Seguir Vuelo Real <ArrowRight size={18} />
          </button>
        </form>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4 px-2">Próximos y En Aire</h3>
          <div className="space-y-4">
            {pendingFlights.map(flight => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
