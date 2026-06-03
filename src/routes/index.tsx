import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Sidebar } from "@/components/site/Sidebar";
import { HeroBanner } from "@/components/site/HeroBanner";
import { TrendingTopics } from "@/components/site/TrendingTopics";
import { LatestArticles } from "@/components/site/LatestArticles";
import { RightRail } from "@/components/site/RightRail";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HN-global — منصة المعرفة والإبداع العالمية" },
      { name: "description", content: "انضم لمجتمع عالمي من المبدعين والخبراء — مقالات، فيديوهات، مناقشات، أسئلة وأجوبة بلغات متعددة." },
      { property: "og:title", content: "HN-global" },
      { property: "og:description", content: "منصة عالمية للمعرفة والإبداع" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div dir="rtl" className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-3 order-2 lg:order-1">
            <Sidebar />
          </div>
          <div className="col-span-12 lg:col-span-6 order-1 lg:order-2 space-y-5">
            <HeroBanner />
            <TrendingTopics />
            <LatestArticles />
          </div>
          <div className="col-span-12 lg:col-span-3 order-3">
            <RightRail />
          </div>
        </div>
      </main>
    </div>
  );
}
