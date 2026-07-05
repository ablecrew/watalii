import { useEffect, useState } from "react";
import {
  supabase,
  type Podcast,
  type PodcastGuest,
  type PodcastTranscript,
  type PodcastComment,
} from "../lib/supabase";

export interface PodcastDetail {
  podcast: Podcast | null;
  guests: PodcastGuest[];
  transcript: PodcastTranscript | null;
  comments: PodcastComment[];
  upNext: Podcast[];
}

export function usePodcastDetail(slug: string | undefined) {
  const [data, setData] = useState<PodcastDetail>({
    podcast: null,
    guests: [],
    transcript: null,
    comments: [],
    upNext: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDetail() {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const env = (import.meta as unknown as { env: Record<string, string> }).env;
        if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) {
          setData(getDemoDetail());
          return;
        }

        // Fetch podcast
        const { data: podcastData, error: podcastError } = await supabase
          .from("podcasts")
          .select(`*, category:categories(*), host:team_members(*), series:podcast_series(*)`)
          .eq("slug", slug)
          .eq("is_published", true)
          .single();

        if (podcastError) throw podcastError;
        const podcast = podcastData as Podcast;

        // Fetch guests, transcript, comments in parallel
        const [guestsRes, transcriptRes, commentsRes, upNextRes] = await Promise.all([
          supabase
            .from("podcast_guests")
            .select("*")
            .eq("podcast_id", podcast.id)
            .order("order_index", { ascending: true }),
          supabase.from("podcast_transcripts").select("*").eq("podcast_id", podcast.id).single(),
          supabase
            .from("podcast_comments")
            .select("*")
            .eq("podcast_id", podcast.id)
            .eq("status", "approved")
            .is("parent_id", null)
            .order("created_at", { ascending: false })
            .limit(20),
          supabase
            .from("podcasts")
            .select(`*, category:categories(*), host:team_members(*)`)
            .eq("is_published", true)
            .neq("id", podcast.id)
            .order("published_at", { ascending: false })
            .limit(4),
        ]);

        setData({
          podcast,
          guests: (guestsRes.data as PodcastGuest[]) || [],
          transcript: (transcriptRes.data as PodcastTranscript) || null,
          comments: (commentsRes.data as PodcastComment[]) || [],
          upNext: (upNextRes.data as Podcast[]) || [],
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load episode");
        setData(getDemoDetail());
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [slug]);

  return { ...data, loading, error };
}

function getDemoDetail(): PodcastDetail {
  // This will be replaced by real data; minimal fallback
  return {
    podcast: null,
    guests: [
      {
        id: "1",
        podcast_id: "",
        name: "Guest Name",
        role: "Featured Guest",
        bio: "Guest bio will appear here.",
        image: "https://via.placeholder.com/300",
        social_links: {},
        order_index: 0,
        created_at: "",
      },
    ],
    transcript: {
      id: "1",
      podcast_id: "",
      content: "Transcript will appear here once added to the database.",
      language: "en",
      is_auto_generated: false,
      created_at: "",
      updated_at: "",
    },
    comments: [],
    upNext: [],
  };
}
