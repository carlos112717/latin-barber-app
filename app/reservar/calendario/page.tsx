// archivo: app/reservar/calendario/page.tsx

// CAMBIO 1: Convertimos esto en un Componente de Cliente
"use client";

// CAMBIO 2: Importamos el Hook
import { useSearchParams } from 'next/navigation';

// --- Datos mock para el calendario ---
// (En un futuro, la fecha seleccionada cambiará esto)
const fechaSeleccionada = "2025-11-05"; 
const diaSemana = "Miércoles, 5";
const horas = ["10:00", "10:45", "11:30", "15:00", "15:45"];


export default function CalendarioPage() {
  // CAMBIO 3: Usamos el Hook para leer los parámetros
  const searchParams = useSearchParams();

  // Leemos los IDs que vienen de las páginas anteriores
  const servicioId = searchParams.get('servicio');
  const barberoId = searchParams.get('barbero');

  return (
    <main className="flex min-h-screen flex-col items-center p-8">

      <h1 className="mt-12 text-4xl font-bold text-brand-gold">
        Elige tu cita
      </h1>

      <p className="mt-2 text-lg text-brand-white">
        Paso 3 de 4
      </p>

      <div className="mt-8 w-full max-w-lg space-y-4">

        {/* 1. Cabecera del Mes */}
        <div className="flex items-center justify-between">
          <button className="font-bold text-brand-gold hover:text-brand-white">{"<"}</button>
          <h2 className="text-2xl font-bold text-brand-white">Noviembre 2025</h2>
          <button className="font-bold text-brand-gold hover:text-brand-white">{">"}</button>
        </div>

        {/* 2. Días de la semana (Boceto) */}
        <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-400">
          <span>LU</span> <span>MA</span> <span>MI</span> <span>JU</span> <span>VI</span> <span>SA</span> <span>DO</span>
        </div>

        {/* 3. Días del mes (Boceto) */}
        <div className="grid grid-cols-7 gap-2 text-center">
          <span className="p-2 text-gray-600">30</span>
          <span className="p-2 text-gray-600">31</span>
          <button className="rounded-lg p-2 font-bold hover:bg-gray-700">1</button>
          <button className="rounded-lg p-2 font-bold hover:bg-gray-700">2</button>
          <button className="rounded-lg p-2 font-bold hover:bg-gray-700">3</button>
          <button className="rounded-lg p-2 font-bold hover:bg-gray-700">4</button>
          <button className="rounded-lg bg-brand-gold p-2 font-bold text-brand-black">5</button>
          <button className="rounded-lg p-2 font-bold hover:bg-gray-700">6</button>
        </div>

        {/* 4. Horas Disponibles */}
        <div className="mt-8 border-t border-gray-700 pt-6">
          <h3 className="text-lg font-bold text-brand-white">Horas disponibles para el {diaSemana}</h3>
          <div className="mt-4 grid grid-cols-3 gap-3">

            {/* CAMBIO 4: Mapeamos las horas y creamos la URL completa */}
            {horas.map((hora) => (
              <a
                key={hora}
                href={`/reservar/confirmar?servicio=${servicioId}&barbero=${barberoId}&fecha=${fechaSeleccionada}&hora=${hora}`}
                className="rounded-lg bg-gray-800 p-3 text-center font-bold transition-colors hover:bg-brand-gold hover:text-brand-black"
              >
                {hora}
              </a>
            ))}

          </div>
        </div>

      </div>
    </main>
  );
}