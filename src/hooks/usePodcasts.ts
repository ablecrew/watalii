import { useEffect, useState } from "react";
import { supabase, type Podcast, type Category } from "../lib/supabase";

export interface PodcastFilters {
  category?: string;
  search?: string;
}

// Simplified podcast shape used by UI components
export interface PodcastView {
  id: string;
  title: string;
  description: string;
  host: string;
  duration: string;
  cover_image: string;
  video_url: string | null;
  category: string;
  published_at: string;
  episode_number: number;
}

export function usePodcasts(filters?: PodcastFilters) {
  const [podcasts, setPodcasts] = useState<PodcastView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPodcasts() {
      try {
        setLoading(true);
        setError(null);

        const env = (import.meta as unknown as { env: Record<string, string> }).env;
        if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) {
          setPodcasts(filterPodcasts(getDemoPodcasts(), filters));
          return;
        }

        const { data, error: sbError } = await supabase
          .from("podcasts")
          .select(`*, category:categories(*), host:team_members(*), series:podcast_series(*)`)
          .eq("is_published", true)
          .order("published_at", { ascending: false });

        if (sbError) throw sbError;

        const mapped = ((data as Podcast[]) || []).map(mapPodcastToView);
        setPodcasts(filterPodcasts(mapped, filters));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load podcasts");
        setPodcasts(filterPodcasts(getDemoPodcasts(), filters));
      } finally {
        setLoading(false);
      }
    }

    fetchPodcasts();
  }, [filters?.category, filters?.search]);

  return { podcasts, loading, error };
}

function mapPodcastToView(podcast: Podcast): PodcastView {
  return {
    id: podcast.id,
    title: podcast.title,
    description: podcast.description || "",
    host: podcast.host?.name || "WATALII Team",
    duration: podcast.duration || "",
    cover_image: podcast.cover_image || `https://img.youtube.com/vi/${getVideoId(podcast.video_url)}/maxresdefault.jpg`,
    video_url: podcast.video_url || null,
    category: podcast.category?.name || "Culture",
    published_at: podcast.published_at || podcast.created_at,
    episode_number: podcast.episode_number,
  };
}

function getVideoId(url: string | null): string {
  if (!url) return "";
  const match = url.match(/(?:youtu\.be\/|v=)([^#&?]+)/);
  return match?.[1] || "";
}

function filterPodcasts(podcasts: PodcastView[], filters?: PodcastFilters): PodcastView[] {
  if (!filters) return podcasts;

  return podcasts.filter((p) => {
    const matchesCategory =
      !filters.category || filters.category === "All" || p.category === filters.category;
    const matchesSearch =
      !filters.search ||
      p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.host.toLowerCase().includes(filters.search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

function getDemoPodcasts(): PodcastView[] {
  return [
    {
      id: "1",
      title: "Ma Caro wa KaNairo: Episode 01",
      description: "Episode 01 of Ma Caro wa KaNairo.",
      host: "WATALII",
      duration: "45 min",
      cover_image: "https://img.youtube.com/vi/Yde1r8UUD70/maxresdefault.jpg",
      video_url: "https://youtu.be/Yde1r8UUD70?si=99CrLYa8TY20HtSz",
      category: "Culture",
      published_at: "2026-01-15T10:00:00Z",
      episode_number: 1,
    },
    {
      id: "2",
      title: "U Gen Z wa Taifa: Episode 02",
      description: "Episode 02 of U Gen Z wa Taifa.",
      host: "WATALII",
      duration: "45 min",
      cover_image: "https://img.youtube.com/vi/kzmwEffUW1E/maxresdefault.jpg",
      video_url: "https://youtu.be/kzmwEffUW1E?si=eg_cZdglpm5bSSR0",
      category: "Culture",
      published_at: "2026-01-14T10:00:00Z",
      episode_number: 2,
    },
    {
      id: "3",
      title: "Campus Love: Episode 03",
      description: "Episode 03 of Campus Love.",
      host: "WATALII",
      duration: "45 min",
      cover_image: "https://img.youtube.com/vi/N0Wac4Uf9PU/maxresdefault.jpg",
      video_url: "https://youtu.be/N0Wac4Uf9PU?si=LEyqrVd1ceCoNC68",
      category: "Culture",
      published_at: "2026-01-13T10:00:00Z",
      episode_number: 3,
    },
    {
      id: "4",
      title: "Content Creator Talk: Episode 07",
      description: "Episode 07 of Content Creator Talk.",
      host: "WATALII",
      duration: "45 min",
      cover_image: "https://img.youtube.com/vi/veHk-ZU_cfM/maxresdefault.jpg",
      video_url: "https://youtu.be/veHk-ZU_cfM?si=0nOxJ30nWZDt3lMN",
      category: "Culture",
      published_at: "2026-01-12T10:00:00Z",
      episode_number: 7,
    },
    {
      id: "5",
      title: "Period Talk Unfiltered: Episode 11",
      description: "Episode 11 of Period Talk Unfiltered.",
      host: "WATALII",
      duration: "45 min",
      cover_image: "https://img.youtube.com/vi/1u_zEWsskzU/maxresdefault.jpg",
      video_url: "https://youtu.be/1u_zEWsskzU?si=1m2Jk_RHWQ2fUZIK",
      category: "Culture",
      published_at: "2026-01-11T10:00:00Z",
      episode_number: 11,
    },
    {
      id: "6",
      title: "Africa the Heart of Politics: Episode 14",
      description: "Episode 14 of Africa the Heart of Politics.",
      host: "WATALII",
      duration: "45 min",
      cover_image: "https://img.youtube.com/vi/vIAGtljZCcE/maxresdefault.jpg",
      video_url: "https://youtu.be/vIAGtljZCcE?si=yrWJ-f20EJV4SNwJ",
      category: "Culture",
      published_at: "2026-01-10T10:00:00Z",
      episode_number: 14,
    },
    {
      id: "7",
      title: "The Purple Movement; END GVB: Episode 15",
      description: "Episode 15 of The Purple Movement; END GVB.",
      host: "WATALII",
      duration: "45 min",
      cover_image: "https://img.youtube.com/vi/fUUN7Y_YA7k/maxresdefault.jpg",
      video_url: "https://youtu.be/fUUN7Y_YA7k?si=V3hwZXmb8bZZW71W",
      category: "Culture",
      published_at: "2026-01-09T10:00:00Z",
      episode_number: 15,
    },
    {
      id: "8",
      title: "The Kenyan Creative Wave: Episode 17",
      description: "Episode 17 of The Kenyan Creative Wave.",
      host: "WATALII",
      duration: "45 min",
      cover_image: "https://img.youtube.com/vi/Uw3Z36dahTM/maxresdefault.jpg",
      video_url: "https://youtu.be/Uw3Z36dahTM?si=RjP37BSn1tqTbzP0",
      category: "Culture",
      published_at: "2026-01-08T10:00:00Z",
      episode_number: 17,
    },
    {
      id: "9",
      title: "Na hiyo Uliskia Wapi?: Episode 20",
      description: "Episode 20 of Na hiyo Uliskia Wapi?.",
      host: "WATALII",
      duration: "45 min",
      cover_image: "https://img.youtube.com/vi/SbaOhfGMLbA/maxresdefault.jpg",
      video_url: "https://youtu.be/SbaOhfGMLbA?si=qFUHGY7PMCkZFz91",
      category: "Culture",
      published_at: "2026-01-07T10:00:00Z",
      episode_number: 20,
    },
    {
      id: "10",
      title: "Anakonda Regime: Episode 21",
      description: "Episode 21 of Anakonda Regime.",
      host: "WATALII",
      duration: "45 min",
      cover_image: "https://img.youtube.com/vi/nnhox_XerM4/maxresdefault.jpg",
      video_url: "https://youtu.be/nnhox_XerM4?si=Go6fWvMggko9us1Y",
      category: "Culture",
      published_at: "2026-01-06T10:00:00Z",
      episode_number: 21,
    },
    {
      id: "11",
      title: "What Pressure??!: Episode 22",
      description: "Episode 22 of What Pressure??!.",
      host: "WATALII",
      duration: "45 min",
      cover_image: "https://img.youtube.com/vi/ze5uB4Cb6L4/maxresdefault.jpg",
      video_url: "https://youtu.be/ze5uB4Cb6L4?si=2L4HWHoKrVbnrqfw",
      category: "Culture",
      published_at: "2026-01-05T10:00:00Z",
      episode_number: 22,
    },
    {
      id: "12",
      title: "The Enduring Legacy of Raila Odinga: Kenya's Political Rebel",
      description: "A deep dive into the political journey and legacy of Raila Odinga.",
      host: "WATALII",
      duration: "45 min",
      cover_image: "https://img.youtube.com/vi/j0VLvta7WTQ/maxresdefault.jpg",
      video_url: "https://youtu.be/j0VLvta7WTQ?si=LZf0spAbDUAHkU-R",
      category: "Culture",
      published_at: "2026-01-04T10:00:00Z",
      episode_number: 23,
    },
    {
      id: "13",
      title: "Money In The $oil: Episode 02",
      description: "Episode 02 of Money In The $oil.",
      host: "WATALII",
      duration: "45 min",
      cover_image: "https://img.youtube.com/vi/xbGcHA5QQ4U/maxresdefault.jpg",
      video_url: "https://youtu.be/xbGcHA5QQ4U?si=nCT_Gsi6l-R-R8N-",
      category: "Culture",
      published_at: "2026-01-03T10:00:00Z",
      episode_number: 24,
    },
    {
      id: "14",
      title: "The Mental Health Crisis YouTube Won't Talk About",
      description: "An honest conversation about mental health in the creator economy.",
      host: "WATALII",
      duration: "45 min",
      cover_image: "https://img.youtube.com/vi/8SSnBaU2C08/maxresdefault.jpg",
      video_url: "https://youtu.be/8SSnBaU2C08?si=4ceCz8jUU9C2GLY4",
      category: "Culture",
      published_at: "2026-01-02T10:00:00Z",
      episode_number: 25,
    },
  ];
}

export function usePodcastCategories() {
  const [categories, setCategories] = useState<string[]>([
    "All",
    "Culture",
    "Impact",
    "Business",
    "Media",
    "Community",
    "Foundation",
  ]);

  useEffect(() => {
    async function fetchCategories() {
      const env = (import.meta as unknown as { env: Record<string, string> }).env;
      if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) return;

      const { data } = await supabase
        .from("categories")
        .select("name")
        .eq("type", "podcast")
        .eq("is_active", true)
        .order("order_index", { ascending: true })
        .returns<Pick<Category, "name">[]>();

      if (data && data.length > 0) {
        setCategories(["All", ...data.map((c) => c.name)]);
      }
    }

    fetchCategories();
  }, []);

  return categories;
}
