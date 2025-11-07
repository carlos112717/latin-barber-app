// archivo: app/reservar/page.tsx

import { supabase } from '@/lib/supabase'; // Importamos el conector

// Definimos un "tipo" para nuestros datos
export type Servicio = {
  id: number;
  created_at: string;
  nombre: string;
  duracion: string;
  precio: string;
}

// Convertimos la función en "async" para esperar a Supabase
export default async function ReservarPage() {

  // ¡Hacemos la consulta a Supabase!
  const { data: servicios, error } = await supabase
    .from('servicios')
    .select('*')
    .order('id', { ascending: true })
    .returns<Servicio[]>(); 

  if (error || !servicios || servicios.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center p-8">
        <h1 className="mt-12 text-4xl font-bold text-brand-gold">Elige tu Servicio</h1>
        <p className="mt-4 text-brand-white">No hay servicios disponibles en este momento.</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="mt-12 text-4xl font-bold text-brand-gold">Elige tu Servicio</h1>
      <p className="mt-2 text-lg text-brand-white">Paso 1 de 4</p>
      
      <div className="mt-8 w-full max-w-lg space-y-4">
        {/* ¡Esto ahora usa los datos REALES de Supabase! */}
        {servicios.map((servicio) => (
          <a
            key={servicio.id}
            href={`/reservar/barbero?servicio=${servicio.id}`}
            className="flex items-center justify-between rounded-lg bg-gray-800 p-5 shadow-md transition-all duration-200 hover:bg-brand-gold hover:text-brand-black"
          >
            <div>
              <h3 className="text-xl font-bold">{servicio.nombre}</h3>
              <p className="text-sm opacity-70">{servicio.duracion}</p>
            </div>
            <div className="text-xl font-bold">
              {servicio.precio}
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}