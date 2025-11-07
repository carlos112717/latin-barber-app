// archivo: lib/supabase.ts

import { createClient } from '@supabase/supabase-js';

// Usamos las variables que pusimos en nuestro archivo .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Creamos y exportamos el cliente de Supabase
// Este "supabase" será nuestro único punto de contacto con la base de datos
export const supabase = createClient(supabaseUrl, supabaseAnonKey);