// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = 'https://xyzcompany.supabase.co'; // Replace with your Supabase URL
const supabaseKey: string = 'public-anon-key'; // Replace with your Supabase anon key

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
