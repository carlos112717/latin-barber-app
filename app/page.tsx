// archivo: app/page.tsx

// Paso 1: ¡Importamos el componente "Image" de Next.js!
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">

      <div className="text-center">

        {/* Paso 2: Añadimos el Logo. 
          Asegúrate de que el 'src' coincida con el nombre de tu archivo en la carpeta 'public'.
        */}
        <Image
          src="/logo-latin-barber.png"
          alt="Logo de Latin Barber"
          width={250} // Ajusta el ancho si es necesario
          height={250} // Ajusta el alto si es necesario
          priority // Le dice a Next.js que cargue esta imagen primero
          className="mx-auto" // Clase de Tailwind para centrar la imagen
        />

        <h1 className="mt-6 text-4xl font-bold text-brand-gold">
          Bienvenido a Latin Barber
        </h1>
        <p className="mt-2 text-lg text-brand-white">
          Tu barbería latina.
        </p>

        {/* Paso 3: Añadimos el botón (Llamado a la Acción).
          Es un enlace <a> estilizado como un botón.
        */}
        <a
          href="/reservar" // (Esta página aún no existe, la crearemos después)
          className="mt-8 inline-block rounded-lg bg-brand-gold px-8 py-3 font-bold text-brand-black transition-transform duration-200 hover:scale-105"
        >
          Reservar Cita
        </a>
      </div>

    </main>
  );
}