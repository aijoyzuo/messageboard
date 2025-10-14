import { NextResponse } from "next/server";
import supabase from "@/lib/supabase"; // 引入 Supabase 客戶端

export async function POST(request: Request) {
  // 解析前端送來的 JSON 格式資料
  const { author = "Anonymous", body } = await request.json(); // 設定預設值

  // 驗證 body 是否存在
  if (!body) {
    return NextResponse.json({ error: "內容必填" }, { status: 400 });
  }

  try {
    // 使用 Supabase 插入新的 Post 資料
    const { data, error } = await supabase
      .from("Post")
      .insert([{ author, body }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 插入成功，返回狀態碼 200 和插入的資料
    return NextResponse.json({ message: "Post created successfully", data }, { status: 200 });

  } catch (error) {
    // 捕獲其他錯誤並返回狀態碼 500
    console.error("Server error:", error);
    return NextResponse.json({ error: "伺服器內部錯誤" }, { status: 500 });
  }
}
