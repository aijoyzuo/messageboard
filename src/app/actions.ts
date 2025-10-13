"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addPost(formData: FormData) {
  const author = (formData.get("author") as string)?.trim() || "Anonymous";
  const body   = (formData.get("body") as string)?.trim() || "";
  if (!body) return { ok: false, error: "留言內容不可為空" };

  await prisma.post.create({ data: { author, body } });
  revalidatePath("/");

  return { ok: true };
}
