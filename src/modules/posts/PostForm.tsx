"use client";

import { useRef, useState, FormEvent, KeyboardEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import supabase from "@/lib/supabase"; // 引入 Supabase 客戶端

export default function PostForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter(); // 初始化 router
  const currentPage = Number(searchParams.get("page") ?? "1");
  const from = `/?page=${currentPage || 1}`;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPending(true);
    const fd = new FormData(formRef.current!);
    fd.set("from", from);
    
    try {
      // 提交資料到 Supabase
      const { author, body } = Object.fromEntries(fd.entries());
      
      const { data, error } = await supabase
        .from("Post")
        .insert([
          { author: author || "Anonymous", body },
        ]);

      if (error) {
        alert(error.message ?? "送出失敗");
        return;
      }

      formRef.current?.reset(); // 清空表單
      router.replace("/?page=1"); // 回到第一頁

    } catch (error) {
      console.error(error);
      alert("送出失敗");
    } finally {
      setPending(false);
    }
  };

  const preventEnterSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
    // 整塊預設為 slate-700（把「白色字」全部換成這個色系）
    <form ref={formRef} onSubmit={onSubmit} className="space-y-3 text-slate-700">
      {/* 名字 */}
      <input
        name="author"
        placeholder="你的名字"
        autoComplete="name"
        required
        onKeyDown={preventEnterSubmit}
        disabled={pending}
        className="w-full rounded-md border border-slate-300 bg-slate-100 text-slate-700 placeholder-slate-400
                   px-3 py-2 outline-none transition
                   focus:ring-2 focus:ring-slate-300 focus:border-slate-400
                   hover:bg-slate-50 disabled:opacity-60"
      />

      {/* 內容（可換行） */}
      <textarea
        name="body"
        placeholder="想說的話（按 Enter 可換行）"
        required
        rows={4}
        disabled={pending}
        className="w-full rounded-md border border-slate-300 bg-slate-100 text-slate-700 placeholder-slate-400
                   px-3 py-2 outline-none transition
                   focus:ring-2 focus:ring-slate-300 focus:border-slate-400
                   hover:bg-slate-50 resize-y disabled:opacity-60"
      />

      {/* 隱藏欄位 */}
      <input type="hidden" name="from" value={from} />

      <button
        type="submit"
        disabled={pending}
        className="rounded-md px-4 py-2
                   bg-slate-800 text-white hover:bg-slate-900
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "送出中..." : "送出留言"}
      </button>
    </form>
  );
}
