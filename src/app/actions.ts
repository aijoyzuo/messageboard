// src/app/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
// ❌ 移除沒用到的 revalidatePath / redirect

export async function addPost(fd: FormData) {
  const author = (fd.get("author") as string)?.trim() || "Anonymous";
  const body = (fd.get("body") as string)?.trim();
  if (!body) return { ok: false, error: "內容必填" };

  await prisma.post.create({ data: { author, body } });
  return { ok: true }; // 由 client 呼叫 router.replace("/?page=1") 或 router.refresh()
}
