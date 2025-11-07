// archivo: app/reservar/confirmar/page.tsx

import { supabase } from '@/lib/supabase'; // Importamos el conector
import type { Servicio } from '../page.tsx';
import type { Barbero } from '../barbero/page.tsx';

// Definimos los props que esta página recibe de la URL
type ConfirmarPageProps = {
  searchParams: {
    servicio: string;
    barbero: string;
    fecha: string;
    hora: string;
  }
}

// Función "async" para esperar los datos
export default async function ConfirmarPage({ searchParams }: ConfirmarPageProps) {
  
  // Obtenemos todos los IDs de la URL
  const { servicio: servicioId, barbero: barberoId, fecha, hora } = searchParams;

  // --- Hacemos DOS consultas a Supabase para "traducir" los IDs ---

  // 1. Buscar el servicio
const { data: servicioSeleccionado } = await supabase
  .from('servicios')
  .select('*')
  // AQUÍ ESTÁ EL ARREGLO:
  .eq('id', Number(servicioId)) // Convertimos el ID a número
  .returns<Servicio[]>()
  .single();

// 2. Buscar el barbero
const { data: barberoSeleccionado } = await supabase
  .from('barberos')
  .select('*')
  // Y AQUÍ TAMBIÉN:
  .eq('id', Number(barberoId)) // Convertimos el ID a número
  .returns<Barbero[]>()
  .single();

  // --- Fin de las consultas ---

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="mt-12 text-4xl font-bold text-brand-gold">Confirma tu cita</h1>
      <p className="mt-2 text-lg text-brand-white">Paso 4 de 4 - ¡Ya casi!</p>
      
      <div className="mt-8 w-full max-w-lg space-y-6">
        
        {/* Resumen de la Cita (¡Ahora con datos REALES!) */}
        <div className="rounded-lg bg-gray-800 p-6 shadow-md">
          <h3 className="text-xl font-bold text-brand-gold">Resumen de tu Reserva</h3>
          <div className="mt-4 space-y-2 text-brand-white">
            <p><strong>Servicio:</strong> {servicioSeleccionado?.nombre || 'Cargando...'}</p>
            <p><strong>Barbero:</strong> {barberoSeleccionado?.nombre || 'Cargando...'}</p>
            <p><strong>Fecha:</strong> {fecha || 'No seleccionada'}</p>
            <p><strong>Hora:</strong> {hora || 'No seleccionada'}</p>
            <p className="pt-2 text-2xl font-bold">
              <strong>Total: {servicioSeleccionado?.precio || '0€'}</strong>
            </p>
          </div>
        </div>

        {/* Formulario de Datos (Sigue igual) */}
        <div className="rounded-lg bg-gray-800 p-6 shadow-md">
          <h3 className="text-xl font-bold text-brand-gold">Introduce tus datos</h3>
          <form className="mt-4 space-y-4">
            {/* ... (Inputs del formulario) ... */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-brand-white">Nombre Completo</label>
              <input type="text" id="nombre" className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-3 text-brand-white shadow-sm focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50" placeholder="Tu nombre y apellido" />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-brand-white">Teléfono (WhatsApp)</label>
              <input type="tel" id="telefono" className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-3 text-brand-white shadow-sm focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50" placeholder="+34 600 123 456" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-white">Email (Opcional)</label>
              <input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-3 text-brand-white shadow-sm focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50" placeholder="tu@email.com" />
            </div>
            <div className="pt-4">
              <button type="submit" className="w-full rounded-lg bg-brand-gold px-8 py-3 font-bold text-brand-black transition-transform duration-200 hover:scale-105">
                Confirmar Reserva
              </button>
            </div>
          </form>
        </div>

      </div>
    </main>
  );
}