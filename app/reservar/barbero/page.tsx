// archivo: app/reservar/barbero/page.tsx

import { supabase } from '@/lib/supabase'; // Importamos el conector

// Definimos el tipo para Barbero
export type Barbero = {
  id: number;
  created_at: string;
  nombre: string;
  especialidad: string;
}

// Esta es la forma moderna de leer searchParams en un Server Component
type BarberoPageProps = {
  searchParams: {
    servicio: string; // El ID del servicio de la URL
  }
}

// Hacemos la función "async"
export default async function BarberoPage({ searchParams }: BarberoPageProps) {
  
  // Obtenemos el ID del servicio de los props
  const servicioId = searchParams.servicio;

  // Pedimos los barberos a Supabase
  const { data: barberos, error } = await supabase
    .from('barberos')
    .select('*')
    .order('id', { ascending: true })
    .returns<Barbero[]>();

  if (error || !barberos) {
    return <main><p>Error al cargar los barberos.</p></main> // Manejo de error simple
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="mt-12 text-4xl font-bold text-brand-gold">¿Quién te atenderá?</h1>
      <p className="mt-2 text-lg text-brand-white">Paso 2 de 4</p>
      
      <div className="mt-8 w-full max-w-lg space-y-4">
        {/* ¡Mapeamos los barberos REALES de Supabase! */}
        {barberos.map((barbero, index) => (
          <a
            key={barbero.id}
            // Creamos la URL con AMBOS parámetros
            href={`/reservar/calendario?servicio=${servicioId}&barbero=${barbero.id}`}
            className={`
              flex items-center rounded-lg p-5 shadow-md transition-all duration-200
              ${
                index === 0
                  ? "bg-brand-gold text-brand-black" // Destacamos "Cualquiera"
                  : "bg-gray-800 text-brand-white hover:bg-gray-700"
              }
            `}
          >
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