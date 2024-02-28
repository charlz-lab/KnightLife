
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://kyfrlufkboevgjxjcpkv.supabase.co",
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5ZnJsdWZrYm9ldmdqeGpjcGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwOTA4MzYsImV4cCI6MjAyNDY2NjgzNn0.jXmTfftdt963tnMAvA_B0bvOE7ka0_49V-2gl3zYKK0'
)
export default supabase