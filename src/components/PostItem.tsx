'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ✅ 定義 Post 型別
export interface Post {
  id: number;
  author: string | null;
  body: string;
  createdAt: string; // 從 Supabase 取出來通常是 ISO 字串
}

export function PostItem({ post, from }: { post: Post; from: string }) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [isClamped, setIsClamped] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  // 直接在 useEffect 之外處理，確保初始顯示時間不依賴於 useEffect
  useEffect(() => {
    if (post.createdAt) {
      const date = new Date(post.createdAt);
      const formatted = date.toLocaleString("zh-TW", {
        timeZone: "Asia/Taipei",
        hour12: false, 
      });
      setFormattedDate(formatted);
    }
    const el = bodyRef.current;
    if (el) {
      // 比較 scrollHeight > clientHeight 判斷是否被截斷
      setIsClamped(el.scrollHeight > el.clientHeight);
    }
  }, [post.createdAt]);  // 依賴於 post.createdAt，確保只在數據變更時更新

  return (
    <li className="rounded-lg bg-white/50 p-5">
      <div className="text-slate-700">
        <span className="font-bold">{post.author || "Anonymous"}</span> ·{" "}
        {formattedDate}
      </div>
      <div
        ref={bodyRef}
        className="mt-1 text-slate-500 line-clamp-2 whitespace-pre-line break-words"
      >
        {post.body}
      </div>
      {isClamped && (
        <div className="mt-2">
          <Link
            className="text-sm text-blue-500 hover:underline"
            href={`/post/${post.id}?from=${encodeURIComponent(from)}`}
          >
            查看完整內容
          </Link>
        </div>
      )}
    </li>
  );
}
