import { useEffect, useState } from "react";
import { supabase, type PodcastComment } from "../lib/supabase";

export function usePodcastComments(podcastId: string | undefined) {
  const [comments, setComments] = useState<PodcastComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      if (!podcastId) {
        setLoading(false);
        return;
      }

      try {
        const env = (import.meta as unknown as { env: Record<string, string> }).env;
        if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) {
          setComments(getDemoComments());
          return;
        }

        const { data, error } = await supabase
          .from("podcast_comments")
          .select("*")
          .eq("podcast_id", podcastId)
          .eq("status", "approved")
          .is("parent_id", null)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setComments((data as PodcastComment[]) || []);
      } catch {
        setComments(getDemoComments());
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, [podcastId]);

  const addComment = async (authorName: string, authorEmail: string, content: string) => {
    if (!podcastId) return null;

    const env = (import.meta as unknown as { env: Record<string, string> }).env;
    if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) {
      const newComment: PodcastComment = {
        id: Math.random().toString(36).slice(2),
        podcast_id: podcastId,
        parent_id: null,
        author_name: authorName,
        author_email: authorEmail,
        content,
        is_featured: false,
        likes_count: 0,
        status: "approved",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setComments((prev) => [newComment, ...prev]);
      return newComment;
    }

    const { data, error } = await supabase
      .from("podcast_comments")
      .insert({
        podcast_id: podcastId,
        author_name: authorName,
        author_email: authorEmail,
        content,
        status: "approved",
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding comment:", error);
      return null;
    }

    const comment = data as PodcastComment;
    setComments((prev) => [comment, ...prev]);
    return comment;
  };

  return { comments, loading, addComment };
}

function getDemoComments(): PodcastComment[] {
  return [
    {
      id: "1",
      podcast_id: "",
      parent_id: null,
      author_name: "Wanjiku M.",
      author_email: null,
      content: "This episode was so insightful! Loved the guest's perspective on Kenyan politics.",
      is_featured: true,
      likes_count: 12,
      status: "approved",
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "2",
      podcast_id: "",
      parent_id: null,
      author_name: "Brian Ochieng",
      author_email: null,
      content: "Can you bring back the guest for a part 2? There was so much more to discuss.",
      is_featured: false,
      likes_count: 5,
      status: "approved",
      created_at: new Date(Date.now() - 172800000).toISOString(),
      updated_at: new Date(Date.now() - 172800000).toISOString(),
    },
  ];
}
