'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function PostItem({ post, from }: { post: any; from: string }) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) {
      // 比較 scrollHeight > clientHeight 代表有被裁切
      setIsClamped(el.scrollHeight > el.clientHeight);
    }
  }, []);

  return (
    <li className="rounded-lg bg-white/50 p-5">
      <div className="text-slate-700">
        <span className="font-bold">{post.author || "Anonymous"}</span> ·{" "}
        {new Date(post.createdAt).toLocaleString("zh-TW", {
          timeZone: "Asia/Taipei",
        })}
      </div>
      <div
        ref={bodyRef}
        className="mt-1 text-slate-500 line-clamp-3 whitespace-pre-line break-words"
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
