import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const PAGE_SIZE = 10;

export default async function PostList({ page }: { page: number }) {
  try {
    const skip = (page - 1) * PAGE_SIZE;

    const total = await prisma.post.count();
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGE_SIZE,
      select: { id: true, author: true, body: true, createdAt: true },
    });

    if (total === 0) {
      return <div className="mt-6 text-sm text-zinc-700">目前沒有留言，留一則試試看吧！</div>;
    }

    const from = `/?page=${page}`;

    return (
      <ul className="mt-6 space-y-3">
        {posts.map((p) => {
          const needsMore = p.body.includes("\n") || p.body.length > 60;

          return (
            <li key={p.id} className="rounded-lg bg-white/50 p-5">
              <div className="text-slate-700">
                <span className="font-bold">{p.author || "Anonymous"}</span>{" · "}
                {new Date(p.createdAt).toLocaleString("zh-TW")}
              </div>
              <div className="mt-1 text-slate-500 line-clamp-1 whitespace-pre-line break-words">
                {p.body}
              </div>
              {needsMore && (
                <div className="mt-2">
                  <Link className="text-sm text-blue-500 hover:underline" href={`/post/${p.id}?from=${encodeURIComponent(from)}`}>
                    查看完整內容
                  </Link>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  } catch (err: unknown) {                       {/* ✅ 用 unknown + 窄化 */}
    const message = err instanceof Error ? err.message : String(err);
    return (
      <pre className="mt-6 whitespace-pre-wrap rounded bg-red-50 p-3 text-sm text-red-700">
        伺服器端讀取資料時發生錯誤：{message}
      </pre>
    );
  }
}
