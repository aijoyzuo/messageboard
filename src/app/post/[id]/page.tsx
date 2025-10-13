import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

type Search = { from?: string };

export default async function PostDetail({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const backHref = sp?.from || "/";

  // 讀單筆
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    select: { id: true, author: true, body: true, createdAt: true },
  });
  if (!post) return notFound();

  // 找「上一則（更新）」：createdAt > current，取最接近的一筆
  const newer = await prisma.post.findFirst({
    where: { createdAt: { gt: post.createdAt } },
    orderBy: { createdAt: "asc" }, // 由舊到新，最接近 current 的第一筆就是「上一則」
    select: { id: true },
  });

  // 找「下一則（更舊）」：createdAt < current，取最接近的一筆
  const older = await prisma.post.findFirst({
    where: { createdAt: { lt: post.createdAt } },
    orderBy: { createdAt: "desc" }, // 由新到舊，最接近 current 的第一筆就是「下一則」
    select: { id: true },
  });

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
          {new Date(post.createdAt).toLocaleString("zh-TW")}
        </div>

        <div className="mt-3 mb-5 whitespace-pre-wrap break-words leading-relaxed text-slate-800">
          {post.body}
        </div>
       
      </article>
       {/* 上一則 / 下一則 導覽 */}
        <div className="mt-4 flex items-center justify-between">
          {/* 上一則（更新） */}
          {newer ? (
            <Link
              href={newerHref}
              className="rounded px-3 py-1 text-sm text-white bg-slate-700/40 hover:text-white/90 hover:bg-slate-700"
            >
              上一則
            </Link>
          ) : (
            <span
              aria-disabled
              className="rounded px-3 py-2 text-sm opacity-40 cursor-not-allowed"
            >
              上一則
            </span>
          )}

          {/* 下一則（更舊） */}
          {older ? (
            <Link
              href={olderHref}
              className="rounded px-3 py-1 text-sm text-white bg-slate-700/40 hover:text-white/90 hover:bg-slate-700"
            >
              下一則
            </Link>
          ) : (
            <span
              aria-disabled
              className="rounded px-3 py-1 text-sm opacity-40 cursor-not-allowed"
            >
              下一則
            </span>
          )}
        </div>
    </main>
  );
}
