import { useEffect } from "react";
import supabase from "@/lib/supabase";  // 引入 Supabase 客戶端

export default function TestSupabase() {
  useEffect(() => {
    const fetchData = async () => {
      // 測試從 "Post" 資料表中獲取一條資料
      const { data, error } = await supabase
        .from("Post")
        .select("*")
        .limit(1);  // 只查詢一條資料來測試

      if (error) {
        console.error("Supabase error:", error);  // 如果有錯誤，打印錯誤
      } else {
        console.log("Supabase data:", data);  // 打印從 Supabase 返回的資料
      }
    };

    fetchData();
  }, []);

  return <div>Check console for Supabase test result.</div>;
}
