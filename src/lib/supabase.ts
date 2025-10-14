import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSupabase() {
  const { data, error } = await supabase.from("Post").select("*").limit(5);
  
  if (error) {
    console.error("Supabase error:", error);
  } else {
    console.log("Fetched data:", data);
  }
}

testSupabase();

export default supabase;
