import { createClient } from '@supabase/supabase-js';

// 確保環境變數存在
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 檢查環境變數是否設置正確
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or anon key is missing.");
}

// 創建 Supabase 客戶端
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fetchPosts() {
  try {
    // 從 Post 表中選擇數據
    const { data, error } = await supabase.from("Post").select("*");

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      console.log("Fetched posts:", data);
    }
  } catch (error) {
    console.error("Error in fetchPosts:", error);
  }
}

// 呼叫函數以獲取數據
fetchPosts();

export default supabase;
