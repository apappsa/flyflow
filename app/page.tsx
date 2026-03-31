'use client';

import { useState } from 'react';
import { Plane, CalendarDays, PlusCircle, ArrowRight, Clock3, Luggage, CheckCircle } from 'lucide-react';

// --- MOCK DATA (Simulación de vuelos en BD) ---
// En el futuro, esto vendrá de Vercel Postgres
const initialFlights = [
  { id: 1, number: 'VY3912', date: '2023-10-27', origin: 'BCN', destination: 'ORY', status: 'In Flight', progress: 65 },
  { id: 2, number: 'IB3150', date: '2023-10-28', origin: 'MAD', destination: 'JFK', status: 'Scheduled', progress: 0 },
  { id: 3, number: 'UX1001', date: '2023-10-20', origin: 'BCN', destination: 'PMI', status: 'Landed', progress: 100 },
];

export default function FlyFlowHome() {
  const [flights, setFlights] = useState(initialFlights);
  const [flightNumber, setFlightNumber] = useState('');
  const [flightDate, setFlightDate] = useState('');

  const addFlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flightNumber || !flightDate) return;
    
    // AQUÍ: En el futuro, llamaremos a una Server Action que consulte FlightAware
    // y guarde en Vercel Postgres. Ahora simulamos añadir uno nuevo.
    const newFlight = {
      id: Date.now(),
      number: flightNumber.toUpperCase(),
      date: flightDate,
      origin: '???', // Datos de API
      destination: '???', // Datos de API
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
    <main className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] font-sans antialiased pb-10">
      {/* Header Estilo iOS */}
      <div className="bg-white px-6 pt-12 pb-6 border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <h1 className="text-4xl font-extrabold tracking-tight">Mis Vuelos</h1>
        <p className="text-gray-500 font-medium">Gestiona tus viajes</p>
      </div>

      <div className="p-4 space-y-8">
        {/* Formulario Añadir Vuelo (Tarjeta Estilo Flighty) */}
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
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-semibold placeholder:text-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
              />
            </div>
            <div className="relative">
              <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="date" 
                value={flightDate}
                onChange={(e) => setFlightDate(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-semibold text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
              />
            </div>
          </div>
          
          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-600 active:scale-[0.98] transition flex items-center justify-center gap-2">
            Seguir Vuelo Real <ArrowRight size={18} />
          </button>
        </form>

        {/* Lista Vuelos PENDIENTES */}
        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4 px-2">Próximos y En Aire</h3>
          <div className="space-y-4">
            {pendingFlights.map(flight => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </section>

        {/* Lista Vuelos HECHOS */}
        {pastFlights.length > 0 && (
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 px-2">Historial de Vuelos</h3>
            <div className="space-y-4 opacity-70">
              {pastFlights.map(flight => (
                <FlightCard key={flight.id} flight={flight} isPast />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

// --- COMPONENTE: Tarjeta de Vuelo (Estilo iOS/Flighty) ---
// Añadimos tipos básicos para que TypeScript no se queje
interface Flight {
  id: number;
  number: string;
  date: string;
  origin: string;
  destination: string;
  status: string;
  progress: number;
}

function FlightCard({ flight, isPast = false }: { flight: Flight; isPast?: boolean }) {
  const statusColors: Record<string, string> = {
    'In Flight': 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    'Scheduled': 'bg-gray-100 text-gray-600 border border-gray-200',
    'Landed': 'bg-blue-50 text-blue-500 border border-blue-100',
  };

  return (
    <div className={`bg-white rounded-3xl p-5 shadow-sm border border-gray-100 transition hover:border-blue-100 hover:shadow-md cursor-pointer ${isPast ? 'hover:bg-gray-50' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${statusColors[flight.status] || statusColors['Scheduled']}`}>
              {flight.status === 'In Flight' ? '🟢 En Aire' : flight.status === 'Landed' ? '🛬 Aterrizó' : '🕒 Programado'}
            </span>
            <span className="text-sm font-bold text-gray-900">{flight.number}</span>
          </div>
          <p className="text-xs text-gray-400 font-mono">{flight.date}</p>
        </div>
        <div className="flex items-center gap-3 text-lg font-bold">
          <span>{flight.origin}</span>
          <Plane size={16} className={`rotate-90 ${isPast ? 'text-gray-300' : 'text-blue-400'}`} />
          <span>{flight.destination}</span>
        </div>
      </div>

      {flight.status === 'In Flight' && (
        <div className="mt-4 pt-3 border-t border-gray-50">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-500 mb-1.5">
            <span>Progreso del Vuelo</span>
            <span className="font-mono text-blue-600">{flight.progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out shadow-inner"
              style={{ width: `${flight.progress}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5 text-center font-medium">Datos reales de Aviationstack</p>
        </div>
      )}
    </div>
  );

      {/* --- BARRA DE PROGRESO HORIZONTAL (FlightAware Data) --- */}
      {flight.status === 'In Flight' && (
        <div className="mt-4 pt-3 border-t border-gray-50">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-500 mb-1.5">
            <span>Progreso del Vuelo</span>
            <span className="font-mono text-blue-600">{flight.progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out shadow-inner"
              style={{ width: `${flight.progress}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5 text-center font-medium">Datos reales de FlightAware</p>
        </div>
      }
    </div>
  );
}
