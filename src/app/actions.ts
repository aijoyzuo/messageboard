"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";   // ✅ revalidatePath 這裡！
import { redirect } from "next/navigation";    // ✅ redirect 才是 navigation

export async function addPost(fd: FormData) {
  const author = (fd.get("author") as string)?.trim() || "Anonymous";
  const body = (fd.get("body") as string)?.trim();
  if (!body) return { ok: false, error: "內容必填" };

  await prisma.post.create({ data: { author, body } });

  // 做法一：回傳結果，讓 client 決定 refresh/redirect（你現在採用這個）
  return { ok: true };

  // 做法二（改用伺服器端導回並 revalidate 首頁）：
  // revalidatePath("/");
  // redirect("/?page=1");
}
