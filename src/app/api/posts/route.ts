import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";  // 引入 Supabase 客戶端

export async function GET() {
  try {
    // 從 Supabase 資料庫中選取資料
    const { data, error } = await supabase.from("Post").select("*").limit(1);

    // 處理 Supabase 查詢錯誤
    if (error) {
      console.error("Error fetching data:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    // 確保 data 不為 null 或空陣列
    if (!data || data.length === 0) {
      return NextResponse.json({ ok: false, error: "No data found" }, { status: 404 });
    }

    // 返回第一條資料
    return NextResponse.json(data[0]);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
