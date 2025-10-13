import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const count = await prisma.post.count();
    return new Response(JSON.stringify({ ok: true, count }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), { status: 500 });
  }
}
