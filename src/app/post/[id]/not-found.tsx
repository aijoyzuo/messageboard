import Link from "next/link";

export default function NotFound() {
  return (
    <main className="space-y-4">
      <h1 className="text-xl font-semibold">找不到這則留言</h1>
      <p className="text-slate-700">這筆資料可能已被移除或 ID 有誤。</p>
      <Link href="/" className="rounded border border-white/20 px-3 py-2 hover:bg-white/10">
        回首頁
      </Link>
    </main>
  );
}
