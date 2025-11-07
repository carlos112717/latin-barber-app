// archivo: app/reservar/page.tsx

// CAMBIO 1: Importamos nuestro "conector" de Supabase
// (Usamos '@/' gracias a la configuración de tu tsconfig.json)
import { supabase } from '@/lib/supabase';

// CAMBIO 2: Definimos un "tipo" para nuestros datos (¡buena práctica!)
// Esto le dice a TypeScript cómo se ven nuestros datos de la base de datos.
export type Servicio = {
  id: number;       // int8
  created_at: string; // timestamptz
  nombre: string;     // text
  duracion: string;   // text
  precio: string;     // text
}

// CAMBIO 3: ¡Eliminamos el array "const servicios = [...]" de aquí!
// Ya no lo necesitamos, ahora lo leeremos de la base de datos.


// CAMBIO 4: Convertimos la función en "async" (asíncrona)
// Esto nos permite usar "await" para esperar la respuesta de la base de datos
export default async function ReservarPage() {

  // CAMBIO 5: ¡Hacemos la consulta a Supabase!
  const { data: servicios, error } = await supabase
    .from('servicios') // Desde la tabla "servicios"
    .select('*')       // Selecciona todas las columnas
    .order('id', { ascending: true }) // Opcional: ordena por ID
    .returns<Servicio[]>(); // Le dice a Supabase que los datos se verán como nuestro "tipo"

  // Un pequeño manejo de errores
  if (error) {
    console.error('Error al cargar servicios:', error);
    // Podríamos mostrar un mensaje de error aquí
  }

  // Si no hay servicios, mostramos un mensaje
  if (!servicios || servicios.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center p-8">
        <h1 className="mt-12 text-4xl font-bold text-brand-gold">
          Elige tu Servicio
        </h1>
        <p className="mt-4 text-brand-white">No hay servicios disponibles en este momento.</p>
      </main>
    );
  }

  // CAMBIO 6: El resto del código (el "return") sigue igual.
  // ¡El .map() ahora usará los datos reales de la base de datos!
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      
      <h1 className="mt-12 text-4xl font-bold text-brand-gold">
        Elige tu Servicio
      </h1>

      <p className="mt-2 text-lg text-brand-white">
        Paso 1 de 4
      </p>
      
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