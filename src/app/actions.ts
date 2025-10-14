// src/app/actions.ts
"use server";

import supabase from "@/lib/supabase"; // 引入 Supabase 客戶端

export async function addPost(fd: FormData) {
  const author = (fd.get("author") as string)?.trim() || "Anonymous";
  const body = (fd.get("body") as string)?.trim();
  if (!body) return { ok: false, error: "內容必填" };

  // 使用 Supabase 插入新的 Post 資料
  const { error } = await supabase
    .from("Post")
    .insert([
      { author, body }
    ]);

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true }; // 成功後，客戶端可以刷新頁面
}
