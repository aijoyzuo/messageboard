
import { PostItem } from "@/components/PostItem";
import supabase from "@/lib/supabase"; // 引入 Supabase 客戶端


export const PAGE_SIZE = 10;

export default async function PostList({ page }: { page: number }) {
  try {
    const skip = (page - 1) * PAGE_SIZE;

    const { count, error: countError } = await supabase
      .from("Post")
      .select("*", { count: "exact", head: true });

    if (countError) {
      console.error("Count error:", countError);
      throw countError;
    }

    const { data: posts, error: postsError } = await supabase
      .from("Post")
      .select("id, author, body, createdAt")
      .order("createdAt", { ascending: false })
      .range(skip, skip + PAGE_SIZE - 1);

    if (postsError) {
      console.error("Posts error:", postsError);
      throw postsError;
    }

    if (count === 0) {
      return <div className="mt-6 text-sm text-zinc-700">目前沒有留言，留一則試試看吧！</div>;
    }

    const from = `/?page=${page}`;

   return (
  <ul className="mt-6 space-y-3">
    {posts.map((p) => (
      <PostItem key={p.id} post={p} from={`/?page=${page}`} />
    ))}
  </ul>
);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : JSON.stringify(err, null, 2);
    return (
      <div className="mt-6 text-red-500">
        <p>資料載入時發生錯誤：{message}</p>
        <p>請稍後再試，或聯繫客服。</p>
      </div>
    );
  }
}
