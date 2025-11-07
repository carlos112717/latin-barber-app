// archivo: app/reservar/page.tsx

// --- PASO 1: Nuestros datos de servicios (mock data) ---
// Más adelante, esto vendrá de una base de datos.
const servicios = [
  {
    id: 1,
    nombre: "Corte Premium (Fade + Barba)",
    duracion: "45 min",
    precio: "25€",
  },
  {
    id: 2,
    nombre: "Solo Corte (Fade)",
    duracion: "30 min",
    precio: "20€",
  },
  {
    id: 3,
    nombre: "Arreglo de Barba",
    duracion: "20 min",
    precio: "15€",
  },
  {
    id: 4,
    nombre: "Corte + Tinte",
    duracion: "60 min",
    precio: "40€",
  },
];


export default function ReservarPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      
      <h1 className="mt-12 text-4xl font-bold text-brand-gold">
        Elige tu Servicio
      </h1>

      <p className="mt-2 text-lg text-brand-white">
        Paso 1 de 4
      </p>
      
      {/* --- PASO 2: Contenedor de la lista --- */}
      {/* w-full: Ocupa el 100% del ancho disponible
        max-w-lg: Pero como máximo, 512px (lg) para que no se estire demasiado en pantallas grandes
        space-y-4: Añade un espacio vertical de 4 unidades ENTRE cada tarjeta de servicio
      */}
      <div className="mt-8 w-full max-w-lg space-y-4">

        {/* --- PASO 3: Mapeamos (recorremos) el array de servicios --- */}
        {servicios.map((servicio) => (
          
          // Cada servicio será un enlace <a> (que por ahora no va a ningún lado)
          // Lo estiliza mos como una "tarjeta"
          <a
            key={servicio.id}
            href={`/reservar/barbero?servicio=${servicio.id}`}
            className="flex items-center justify-between rounded-lg bg-gray-800 p-5 shadow-md transition-all duration-200 hover:bg-brand-gold hover:text-brand-black"
          >
            {/* Contenedor para el nombre y duración */}
            <div>
              <h3 className="text-xl font-bold">{servicio.nombre}</h3>
              <p className="text-sm opacity-70">{servicio.duracion}</p>
            </div>
            {/* Precio */}
            <div className="text-xl font-bold">
              {servicio.precio}
            </div>
          </a>

        ))}

      </div>

    </main>
  );
}