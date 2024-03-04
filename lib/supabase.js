import "react-native-url-polyfill/auto"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://kyfrlufkboevgjxjcpkv.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5ZnJsdWZrYm9ldmdqeGpjcGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwOTA4MzYsImV4cCI6MjAyNDY2NjgzNn0.jXmTfftdt963tnMAvA_B0bvOE7ka0_49V-2gl3zYKK0"

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Export for use in your application
export default supabase
