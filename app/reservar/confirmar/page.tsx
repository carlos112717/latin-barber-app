// archivo: app/reservar/confirmar/page.tsx

// CAMBIO 1: ¡Convertimos en Componente de Cliente!
"use client";

// CAMBIO 2: Importamos el Hook
import { useSearchParams } from 'next/navigation';

// --- CAMBIO 3: Traemos nuestros datos mock para "traducir" los IDs ---
const servicios = [
  { id: 1, nombre: "Corte Premium (Fade + Barba)", duracion: "45 min", precio: "25€" },
  { id: 2, nombre: "Solo Corte (Fade)", duracion: "30 min", precio: "20€" },
  { id: 3, nombre: "Arreglo de Barba", duracion: "20 min", precio: "15€" },
  { id: 4, nombre: "Corte + Tinte", duracion: "60 min", precio: "40€" },
];

const barberos = [
  { id: 1, nombre: "Cualquiera disponible" },
  { id: 2, nombre: "David (El Dueño)" },
  { id: 3, nombre: "Andrés" },
];


export default function ConfirmarPage() {
  // CAMBIO 4: Leemos TODOS los parámetros de la URL
  const searchParams = useSearchParams();

  const servicioId = searchParams.get('servicio');
  const barberoId = searchParams.get('barbero');
  const fecha = searchParams.get('fecha'); // ej: "2025-11-05"
  const hora = searchParams.get('hora');   // ej: "15:45"

  // CAMBIO 5: Buscamos los nombres que coinciden con los IDs
  // (Usamos 'Number()' para convertir el texto de la URL en un número)
  const servicioSeleccionado = servicios.find(
    (s) => s.id === Number(servicioId)
  );

  const barberoSeleccionado = barberos.find(
    (b) => b.id === Number(barberoId)
  );

  return (
    <main className="flex min-h-screen flex-col items-center p-8">

      <h1 className="mt-12 text-4xl font-bold text-brand-gold">
        Confirma tu cita
      </h1>

      <p className="mt-2 text-lg text-brand-white">
        Paso 4 de 4 - ¡Ya casi!
      </p>

      <div className="mt-8 w-full max-w-lg space-y-6">

        {/* --- CAMBIO 6: Reemplazamos el texto estático por el dinámico --- */}
        <div className="rounded-lg bg-gray-800 p-6 shadow-md">
          <h3 className="text-xl font-bold text-brand-gold">Resumen de tu Reserva</h3>
          <div className="mt-4 space-y-2 text-brand-white">

            {/* Usamos '?' (optional chaining) por si algo no se encuentra */}
            <p><strong>Servicio:</strong> {servicioSeleccionado?.nombre || 'No seleccionado'}</p>
            <p><strong>Barbero:</strong> {barberoSeleccionado?.nombre || 'No seleccionado'}</p>
            <p><strong>Fecha:</strong> {fecha || 'No seleccionada'}</p>
            <p><strong>Hora:</strong> {hora || 'No seleccionada'}</p>
            <p className="pt-2 text-2xl font-bold">
              <strong>Total: {servicioSeleccionado?.precio || '0€'}</strong>
            </p>
          </div>
        </div>

        {/* 2. Formulario de Datos (Sigue igual) */}
        <div className="rounded-lg bg-gray-800 p-6 shadow-md">
          <h3 className="text-xl font-bold text-brand-gold">Introduce tus datos</h3>
          <form className="mt-4 space-y-4">
            {/* ... (Inputs de formulario se quedan igual) ... */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-brand-white">Nombre Completo</label>
              <input
                type="text"
                id="nombre"
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-3 text-brand-white shadow-sm focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50"
                placeholder="Tu nombre y apellido"
              />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-brand-white">Teléfono (WhatsApp)</label>
              <input
                type="tel"
                id="telefono"
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-3 text-brand-white shadow-sm focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50"
                placeholder="+34 600 123 456"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-white">Email (Opcional)</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-3 text-brand-white shadow-sm focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50"
                placeholder="tu@email.com"
              />
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="w-full rounded-lg bg-brand-gold px-8 py-3 font-bold text-brand-black transition-transform duration-200 hover:scale-105"
              >
                Confirmar Reserva
              </button>
            </div>
          </form>
        </div>

      </div>
    </main>
  );
}