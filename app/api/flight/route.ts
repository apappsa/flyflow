import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const flightNumber = searchParams.get('number');
  const apiKey = process.env.AVIATIONSTACK_KEY;

  if (!flightNumber) {
    return NextResponse.json({ error: 'Falta el número de vuelo' }, { status: 400 });
  }

  try {
    // Usamos http porque el plan gratuito de Aviationstack a veces bloquea https
    const response = await fetch(
      `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightNumber}&limit=1`
    );
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return NextResponse.json({ error: 'Vuelo no encontrado' }, { status: 404 });
    }

    const flight = data.data[0];
    
    // Devolvemos solo lo que nos interesa para limpiar el componente
    return NextResponse.json({
      number: flight.flight.iata,
      origin: flight.departure.iata,
      destination: flight.arrival.iata,
      status: flight.flight_status === 'active' ? 'In Flight' : 'Scheduled',
      date: flight.flight_date,
      progress: flight.flight_status === 'landed' ? 100 : 0 // Aviationstack free no da progreso real exacto
    });

  } catch (error) {
    return NextResponse.json({ error: 'Error de conexión con la API' }, { status: 500 });
  }
}
