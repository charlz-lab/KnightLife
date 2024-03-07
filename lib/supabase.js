import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://dtfxsobdxejzzasfiiwe.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0Znhzb2JkeGVqenphc2ZpaXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2OTg4MTYsImV4cCI6MjAyNTI3NDgxNn0.cLZb2fuzeV7SI4LGppBkC2GXl3qhzMIXTe_v1W2CxRU"

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://dtfxsobdxejzzasfiiwe.supabase.co",
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0Znhzb2JkeGVqenphc2ZpaXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2OTg4MTYsImV4cCI6MjAyNTI3NDgxNn0.cLZb2fuzeV7SI4LGppBkC2GXl3qhzMIXTe_v1W2CxRU', {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: false,
    persistSession: true,
    detectSessionInUrl: false,
  },
}
)

export default supabase
