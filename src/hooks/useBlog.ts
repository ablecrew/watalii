import { useEffect, useState } from "react";
import { supabase, type BlogPost } from "../lib/supabase";

export function useBlog(limit?: number) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const env = (import.meta as unknown as { env: Record<string, string> }).env;
        if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) {
          setPosts(getDemoPosts());
          return;
        }

        let query = supabase
          .from("blog_posts")
          .select("*, author:blog_authors(*), category:categories(*)")
          .eq("status", "published")
          .order("published_at", { ascending: false });

        if (limit) query = query.limit(limit);

        const { data, error } = await query;
        if (error) throw error;
        setPosts((data as BlogPost[]) || []);
      } catch {
        setPosts(getDemoPosts());
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [limit]);

  return { posts, loading };
}

function getDemoPosts(): BlogPost[] {
  return [
    {
      id: "1",
      title: "The Future of African Podcasting",
      slug: "future-of-african-podcasting",
      excerpt: "How independent creators are reshaping narratives across the continent.",
      content: "",
      cover_image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&q=80",
      author_id: null,
      category_id: null,
      tags: null,
      status: "published",
      is_featured: false,
      published_at: "2026-01-10T10:00:00Z",
      read_time: 5,
      view_count: 0,
      meta_title: null,
      meta_description: null,
      created_at: "",
      updated_at: "",
    },
    {
      id: "2",
      title: "5 Ways to Build Community Through Media",
      slug: "build-community-through-media",
      excerpt: "Practical strategies for creators looking to grow engaged audiences.",
      content: "",
      cover_image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80",
      author_id: null,
      category_id: null,
      tags: null,
      status: "published",
      is_featured: false,
      published_at: "2026-01-05T10:00:00Z",
      read_time: 4,
      view_count: 0,
      meta_title: null,
      meta_description: null,
      created_at: "",
      updated_at: "",
    },
    {
      id: "3",
      title: "Behind the Scenes: Our Latest Documentary",
      slug: "behind-the-scenes-documentary",
      excerpt: "A look at the stories, challenges, and triumphs of our newest film.",
      content: "",
      cover_image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
      author_id: null,
      category_id: null,
      tags: null,
      status: "published",
      is_featured: false,
      published_at: "2025-12-28T10:00:00Z",
      read_time: 6,
      view_count: 0,
      meta_title: null,
      meta_description: null,
      created_at: "",
      updated_at: "",
    },
  ];
}
