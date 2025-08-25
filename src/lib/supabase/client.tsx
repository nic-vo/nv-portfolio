const anonKey = process.env.SUPABASE_ANON_KEY;
const url = process.env.SUPABASE_URL;

if (!anonKey || !url) throw new Error('Missing Supabase .env');
