import Hero from "@/components/Hero";
import PostForm from "@/modules/posts/PostForm";
import PostList from "@/modules/posts/PostList";
import Pagination from "@/modules/posts/Pagination";

type Search = { page?: string };

export default async function Home({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp?.page ?? "1"));

  return (
    <main className="space-y-6 text-slate-600">
      <Hero
        title="士兵留聲機"
        subtitle="十月十四日為歷史上所載艾爾文的生日，歡迎留下您對他的祝福。"
        imageSrc="/images/bluesky6877.jpg"
        titleClass="text-white"
        subtitleClass="text-white/90"
      />
      <PostForm />
      <PostList page={page} />
      <Pagination page={page} />
    </main>
  );
}
