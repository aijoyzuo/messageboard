import Link from "next/link";
import supabase from "@/lib/supabase"; // 引入 Supabase 客戶端

export const PAGE_SIZE = 10;

export default async function PostList({ page }: { page: number }) {
  try {
    const skip = (page - 1) * PAGE_SIZE;

    const { count, error: countError } = await supabase
      .from("Post")
      .select("*", { count: "exact", head: true });

    if (countError) {
      console.error("Count error:", countError);  // 打印完整的錯誤物件
      throw countError;  // 如果有錯誤，拋出錯誤
    }

    const { data: posts, error: postsError } = await supabase
      .from("Post")
      .select("id, author, body, createdAt")
      .order("createdAt", { ascending: false })
      .range(skip, skip + PAGE_SIZE - 1);

    if (postsError) {
      console.error("Posts error:", postsError);  // 打印完整的錯誤物件
      throw postsError;  // 如果有錯誤，拋出錯誤
    }

    if (count === 0) {
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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : JSON.stringify(err, null, 2);
    return (
      <pre className="mt-6 whitespace-pre-wrap rounded bg-red-50 p-3 text-sm text-red-700">
        伺服器端讀取資料時發生錯誤：{message}
      </pre>
    );
  }
}
