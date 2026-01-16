/**
 * Configuración del Cliente de Supabase
 * 
 * Este archivo inicializa y exporta el cliente de Supabase que se utilizará
 * en toda la aplicación para interactuar con la base de datos y servicios de autenticación.
 * 
 * IMPORTANTE: Este cliente usa la ANON KEY que es segura para usar en el frontend.
 * La ANON KEY respeta las políticas de Row Level Security (RLS) configuradas en Supabase.
 */

import { createClient } from '@supabase/supabase-js';

// Obtener las variables de entorno configuradas en .env o .env.local
// Vite requiere el prefijo VITE_ para exponer variables al cliente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validar que las variables de entorno estén configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '❌ Error: Las variables de entorno de Supabase no están configuradas.\n' +
    'Por favor, verifica que .env contenga:\n' +
    '- VITE_SUPABASE_URL\n' +
    '- VITE_SUPABASE_ANON_KEY'
  );
}

/**
 * Cliente de Supabase configurado y listo para usar
 * 
 * Este cliente permite:
 * - Autenticación de usuarios (sign up, sign in, sign out)
 * - Operaciones CRUD en tablas (respetando RLS)
 * - Storage de archivos
 * - Realtime subscriptions
 * 
 * Ejemplo de uso:
 * ```typescript
 * import { supabase } from '@/database/supabase';
 * 
 * // Autenticación
 * const { data, error } = await supabase.auth.signUp({ email, password });
 * 
 * // Consultas a tablas
 * const { data, error } = await supabase.from('users').select('*');
 * ```
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Configuración de autenticación
    autoRefreshToken: true, // Refrescar tokens automáticamente
    persistSession: true,  // Persistir sesión en localStorage
    detectSessionInUrl: true, // Detectar sesión en la URL (para callbacks OAuth)
  },
});
