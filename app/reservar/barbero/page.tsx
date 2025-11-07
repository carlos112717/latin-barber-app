// archivo: app/reservar/barbero/page.tsx

// CAMBIO 1: ¡Convertimos esto en un Componente de Cliente!
"use client";

// CAMBIO 2: Importamos el Hook para leer los parámetros de la URL
import { useSearchParams } from 'next/navigation';

// --- Datos mock de los barberos ---
const barberos = [
  {
    id: 1,
    nombre: "Cualquiera disponible",
    especialidad: "Te asignaremos al primer barbero libre.",
  },
  {
    id: 2,
    nombre: "David (El Dueño)",
    especialidad: "Experto en Fades y Clásicos",
  },
  {
    id: 3,
    nombre: "Andrés",
    especialidad: "Diseños y Color",
  },
];

export default function BarberoPage() {
  // CAMBIO 3: Usamos el Hook para leer los parámetros de la URL
  const searchParams = useSearchParams();
  
  // Leemos el ID del servicio que pasamos desde la página anterior
  const servicioId = searchParams.get('servicio');

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      
      <h1 className="mt-12 text-4xl font-bold text-brand-gold">
        ¿Quién te atenderá?
      </h1>

      <p className="mt-2 text-lg text-brand-white">
        Paso 2 de 4
      </p>
      
      <div className="mt-8 w-full max-w-lg space-y-4">

        {/* --- Mapeamos el array de barberos --- */}
        {barberos.map((barbero, index) => (
          
          <a
            key={barbero.id}
            // CAMBIO 4: ¡Creamos la nueva URL con AMBOS parámetros!
            href={`/reservar/calendario?servicio=${servicioId}&barbero=${barbero.id}`}
            className={`
              flex items-center rounded-lg p-5 shadow-md transition-all duration-200
              ${
                // Esto es un truco: la primera opción (Cualquiera) la destacamos en dorado
                index === 0
                  ? "bg-brand-gold text-brand-black"
                  : "bg-gray-800 text-brand-white hover:bg-gray-700"
              }
            `}
          >
            {/* Contenedor para el nombre y especialidad */}
            <div>
              <h3 className="text-xl font-bold">{barbero.nombre}</h3>
              <p className="text-sm opacity-70">{barbero.especialidad}</p>
            </div>
          </a>

        ))}

      </div>
    </main>
  );
}