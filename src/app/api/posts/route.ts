// src/app/api/posts/route.ts
import { NextResponse } from "next/server";
import supabase from "@/lib/supabase"; // 引入 Supabase 客戶端

export async function POST(request: Request) {
  const { author, body } = await request.json(); // 假設前端發送的是 JSON 格式的資料

  if (!body) {
    return NextResponse.json({ error: "內容必填" }, { status: 400 });
  }

  // 使用 Supabase 插入新的 Post 資料
  const { data, error } = await supabase
    .from("Post")
    .insert([{ author, body }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Post created successfully", data }, { status: 200 });
}
