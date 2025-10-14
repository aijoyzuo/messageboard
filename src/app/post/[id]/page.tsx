import Link from "next/link";
import { notFound } from "next/navigation";
import supabase from "@/lib/supabase"; // 引入 Supabase 客戶端

type Search = { from?: string };

export default async function PostDetail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;     // ✅ params 是 Promise
  searchParams: Promise<Search>;
}) {
  const { id } = await params;         // ✅ 先 await 拿到 id
  const sp = await searchParams;
  const backHref = sp?.from || "/";

  // 使用 Supabase 查詢單一文章
  const { data: post, error: postError } = await supabase
    .from("Post")
    .select("id, author, body, createdAt")
    .eq("id", id)
    .single(); // .single() 用來保證只返回一條資料

  // 處理資料錯誤或無資料情況
  if (postError || !post) return notFound();

  // 查詢比該文章新的文章（創建時間晚於該文章）
  const { data: newer, error: newerError } = await supabase
    .from("Post")
    .select("id")
    .gt("createdAt", post.createdAt)
    .order("createdAt", { ascending: true })
    .limit(1)
    .single();

  // 查詢比該文章舊的文章（創建時間早於該文章）
  const { data: older, error: olderError } = await supabase
    .from("Post")
    .select("id")
    .lt("createdAt", post.createdAt)
    .order("createdAt", { ascending: false })
    .limit(1)
    .single();

  // 處理查詢錯誤
  if (newerError) {
    console.error("Newer post error:", newerError);
  }

  if (olderError) {
    console.error("Older post error:", olderError);
  }

  // 計算導覽連結
  const newerHref = newer ? `/post/${newer.id}?from=${encodeURIComponent(backHref)}` : "#";
  const olderHref = older ? `/post/${older.id}?from=${encodeURIComponent(backHref)}` : "#";

  return (
    <main className="space-y-4 text-slate-700">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">
          {post.author || "Anonymous"} 的留聲內容
        </h1>
        <Link
          href={backHref}
          className="text-sm rounded px-3 py-1 text-white bg-slate-700 hover:bg-slate-800"
        >
          返回
        </Link>
      </div>

      <article className="rounded-lg bg-white/60 p-5">
        <div className="text-sm text-slate-500 text-right">
          {new Date(post.createdAt).toLocaleString("zh-Taiwan", {
            timeZone: "Asia/Taipei",  // 強制使用台灣時區
          })}
        </div>

        <div className="mt-3 mb-5 whitespace-pre-wrap break-words leading-relaxed text-slate-800">
          {post.body}
        </div>
      </article>

      {/* 上一則 / 下一則 導覽 */}
      <div className="mt-4 flex items-center justify-between">
        {newer ? (
          <Link
            href={newerHref}
            className="rounded px-3 py-1 text-sm text-white bg-slate-700/80 hover:text-white/90 hover:bg-slate-700"
          >
            上一則
          </Link>
        ) : (
          <span aria-disabled className="rounded px-3 py-1 text-sm opacity-40 cursor-not-allowed">
            上一則
          </span>
        )}

        {older ? (
          <Link
            href={olderHref}
            className="rounded px-3 py-1 text-sm text-white bg-slate-700/80 hover:text-white/90 hover:bg-slate-700"
          >
            下一則
          </Link>
        ) : (
          <span aria-disabled className="rounded px-3 py-1 text-sm opacity-40 cursor-not-allowed">
            下一則
          </span>
        )}
      </div>
    </main>
  );
}
