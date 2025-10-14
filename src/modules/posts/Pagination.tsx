import Link from "next/link";
import supabase from "@/lib/supabase"; // 引入 Supabase 客戶端
import { PAGE_SIZE } from "./PostList";

function getPaginationRange(totalPages: number, current: number, sibling = 1, boundary = 1) {
  const range = (s: number, e: number) => Array.from({ length: e - s + 1 }, (_, i) => s + i);
  const start = range(1, Math.min(boundary, totalPages));
  const end = range(Math.max(totalPages - boundary + 1, boundary + 1), totalPages);
  const left = Math.max(Math.min(current - sibling, totalPages - boundary - sibling * 2 - 1), boundary + 2);
  const right = Math.min(Math.max(current + sibling, boundary + sibling * 2 + 2), end.length ? end[0] - 2 : totalPages - 1);
  const middle = left <= right ? range(left, right) : [];
  const items: Array<number | "..."> = [];
  items.push(...start);
  if (middle.length) {
    if (middle[0] > start[start.length - 1] + 1) items.push("...");
    items.push(...middle);
    if (end.length && middle[middle.length - 1] < end[0] - 1) items.push("...");
  } else if (end.length && start[start.length - 1] < end[0] - 1) items.push("...");
  items.push(...end);
  return items.filter((v, i, a) => (i === 0 ? true : v !== a[i - 1]));
}

export default async function Pagination({ page }: { page: number }) {
  try {
    const { count, error: countError } = await supabase
      .from("Post")
      .select("*", { count: "exact", head: true });

    if (countError) {
      console.error("Count error:", countError);
      throw countError;  // 如果有錯誤，拋出錯誤
    }

    // 確保 count 不為 null，若為 null 則設置為 0
    const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));
    if (totalPages <= 1) return null;

    const prev = Math.max(1, page - 1);
    const next = Math.min(totalPages, page + 1);
    const items = getPaginationRange(totalPages, page, 1, 1);

    return (
      <nav
        className="mt-6 flex items-center justify-center gap-2 text-slate-700"
        aria-label="Pagination"
      >
        {/* 上一頁 */}
        <Link
          href={`/?page=${prev}`}
          aria-disabled={page <= 1}
          className={`px-3 py-2 rounded text-sm
                      hover:text-blue-300 font-bold
                      ${page <= 1 ? "opacity-40 pointer-events-none" : ""}`}
        >
          上一頁
        </Link>

        {/* 中間頁碼 */}
        <ul className="flex items-center gap-1">
          {items.map((it, idx) =>
            it === "..." ? (
              <li key={`dots-${idx}`} className="px-2 text-slate-400 select-none">…</li>
            ) : it === page ? (
              // 目前頁：深底白字
              <li key={it}>
                <span
                  aria-current="page"
                  className="px-3 py-2 rounded text-sm font-medium
                             bg-slate-900 text-white"
                >
                  {it}
                </span>
              </li>
            ) : (
              <li key={it}>
                <Link
                  href={`/?page=${it}`}
                  className="px-3 py-2 rounded text-sm
                              hover:bg-blue-300 hover:text-blue-100" 
                >
                  {it}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* 下一頁 */}
        <Link
          href={`/?page=${next}`}
          aria-disabled={page >= totalPages}
          className={`px-3 py-2 rounded text-sm
                      hover:text-blue-300 font-bold
                      ${page >= totalPages ? "opacity-40 pointer-events-none" : ""}`}
        >
          下一頁
        </Link>
      </nav>
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : JSON.stringify(err, null, 2);
    return (
      <pre>分頁元件讀取資料時發生錯誤：{message}</pre>
    );
  }
}
