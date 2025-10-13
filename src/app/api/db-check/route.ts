import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const count = await prisma.post.count();
    return new Response(JSON.stringify({ ok: true, count }), { status: 200 });
  } catch (err: unknown) {                      // ✅ 用 unknown
    const message = err instanceof Error ? err.message : String(err); // ✅ 窄化
    return new Response(JSON.stringify({ ok: false, error: message }), { status: 500 });
  }
}
