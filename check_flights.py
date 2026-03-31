import requests
import json

# --- CONFIGURACIÓN ---
API_KEY = '3057d84c0a30676120d809256adc53e9'
AIRPORT_IATA = 'BCN'  # Cambia por el código de tu aeropuerto (BCN, MEX, JFK, etc.)
BASE_URL = 'http://api.aviationstack.com/v1/flights' # Usamos http para el plan gratuito

def get_flight_data():
    params = {
        'access_key': API_KEY,
        'dep_iata': AIRPORT_IATA,
        'limit': 10
    }

    try:
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status() # Lanza error si la API falla
        data = response.json()

        if 'data' in data:
            print(f"--- Vuelos saliendo de {AIRPORT_IATA} ---")
            for flight in data['data']:
                flight_no = flight['flight']['iata'] or "N/A"
                airline = flight['airline']['name']
                status = flight['flight_status']
                destination = flight['arrival']['iata']
                
                print(f"✈️ {flight_no} | {airline} -> {destination} ({status})")
        else:
            print("No se encontraron datos o la Key es inválida.")

    except Exception as e:
        print(f"Error al conectar con la API: {e}")

if __name__ == "__main__":
    get_flight_data()
