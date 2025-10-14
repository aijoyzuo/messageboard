import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET() {
  try {
    // 查詢 "Post" 資料表中的資料
    const { data, error } = await supabase.from("Post").select("*").limit(5);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    // 返回資料
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
