import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Anon Key:", supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or anon key is missing.");
}
console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("Supabase Anon Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const { data, error } = await supabase.from("Post").select("*");

if (error) {
  console.error("Error fetching posts:", error);
} else {
  console.log("Fetched posts:", data);
}

export default supabase;
