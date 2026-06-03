import { supabase } from "@/integrations/supabase/client";
import { queryOptions } from "@tanstack/react-query";

export type ArticleRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_url: string | null;
  reads: number;
  reading_minutes: number;
  status: string;
  published_at: string | null;
  created_at: string;
  author_id: string;
  category_id: string | null;
  profiles?: { display_name: string | null; username: string | null; avatar_url: string | null } | null;
  categories?: { slug: string; name_ar: string; emoji: string | null; color: string | null } | null;
};

const SELECT = `
  id, slug, title, excerpt, content, cover_url, reads, reading_minutes,
  status, published_at, created_at, author_id, category_id,
  profiles:profiles!articles_author_id_fkey(display_name, username, avatar_url),
  categories:categories!articles_category_id_fkey(slug, name_ar, emoji, color)
`;

export async function fetchArticles(limit = 30): Promise<ArticleRow[]> {
  const { data, error } = await supabase
    .from("articles")
    .select(SELECT)
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as unknown as ArticleRow[];
}

export async function fetchArticleBySlug(slug: string): Promise<ArticleRow | null> {
  const { data, error } = await supabase
    .from("articles")
    .select(SELECT)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data as unknown as ArticleRow | null;
}

export async function fetchCategoriesForArticles() {
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, name_ar, emoji, parent_id")
    .order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export const articlesListQuery = (limit = 30) =>
  queryOptions({
    queryKey: ["articles", "list", limit],
    queryFn: () => fetchArticles(limit),
  });

export const articleBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["articles", "slug", slug],
    queryFn: () => fetchArticleBySlug(slug),
  });

export const categoriesQuery = queryOptions({
  queryKey: ["categories", "all"],
  queryFn: fetchCategoriesForArticles,
});

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\s\u0600-\u06FF]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || `post-${Date.now()}`;
}

export async function createArticle(input: {
  title: string;
  excerpt: string;
  content: string;
  category_id: string | null;
  cover_url?: string | null;
  publish: boolean;
}) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("يجب تسجيل الدخول");

  const slug = `${slugify(input.title)}-${Math.random().toString(36).slice(2, 6)}`;
  const reading = Math.max(1, Math.round(input.content.split(/\s+/).length / 200));

  const { data, error } = await supabase
    .from("articles")
    .insert({
      author_id: user.id,
      title: input.title,
      excerpt: input.excerpt || null,
      content: input.content,
      slug,
      category_id: input.category_id,
      cover_url: input.cover_url ?? null,
      reading_minutes: reading,
      status: input.publish ? "published" : "draft",
      published_at: input.publish ? new Date().toISOString() : null,
    })
    .select("slug")
    .single();
  if (error) throw error;
  return data;
}

export function categoryGradient(color?: string | null) {
  // Map category color hex to a Tailwind gradient fallback
  return "from-indigo-600 to-blue-700";
}

export function authorInitial(a: ArticleRow): string {
  const n = a.profiles?.display_name || a.profiles?.username || "؟";
  return n.charAt(0).toUpperCase();
}

export function authorName(a: ArticleRow): string {
  return a.profiles?.display_name || a.profiles?.username || "كاتب";
}

export function timeAgo(iso: string | null): string {
  if (!iso) return "";
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "الآن";
  if (diff < 3600) return `منذ ${Math.floor(diff / 60)} د`;
  if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} س`;
  if (diff < 604800) return `منذ ${Math.floor(diff / 86400)} ي`;
  return new Date(iso).toLocaleDateString("ar");
}
