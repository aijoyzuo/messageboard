// src/app/api/posts/route.ts
import { NextResponse } from "next";
import supabase from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase.from("Post").select("*").limit(5);
    
    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
