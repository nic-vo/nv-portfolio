import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from './types';

const anonKey = process.env.SUPABASE_ANON_KEY;
const url = process.env.SUPABASE_URL;

if (!anonKey || !url) throw new Error('Missing Supabase .env');

const supabase = new SupabaseClient<Database>(url, anonKey);

export default supabase;
