import supabase from "@/lib/supabase"; // 引入 Supabase 客戶端

export async function GET() {
  try {
    // 使用 Supabase 查詢資料表中的記錄數量
    const { count, error } = await supabase
      .from("Post")
      .select("*", { count: "exact", head: true });

    if (error) throw error; // 如果有錯誤，拋出錯誤

    return new Response(JSON.stringify({ ok: true, count }), { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err); // ✅ 窄化
    return new Response(JSON.stringify({ ok: false, error: message }), { status: 500 });
  }
}
