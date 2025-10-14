import { createClient } from "@supabase/supabase-js";

// 從環境變數中讀取 URL 和 Anon Key
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

// 創建 Supabase 客戶端
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
