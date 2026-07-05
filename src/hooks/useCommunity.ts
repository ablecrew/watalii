import { useEffect, useState } from "react";
import { supabase, type CommunityChapter } from "../lib/supabase";

export function useCommunity() {
  const [chapters, setChapters] = useState<CommunityChapter[]>([]);
  const [stats, setStats] = useState({
    members: "15K+",
    chapters: "120+",
    countries: "48",
    events: "300+",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChapters() {
      try {
        const env = (import.meta as unknown as { env: Record<string, string> }).env;
        if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) {
          setChapters(getDemoChapters());
          return;
        }

        const { data, error } = await supabase
          .from("community_chapters")
          .select("*")
          .eq("status", "active")
          .order("member_count", { ascending: false });

        if (error) throw error;
        const activeChapters = (data as CommunityChapter[]) || [];
        setChapters(activeChapters);

        // Calculate stats from real data
        if (activeChapters.length > 0) {
          const totalMembers = activeChapters.reduce((sum, c) => sum + (c.member_count || 0), 0);
          const uniqueCountries = new Set(activeChapters.map((c) => c.country)).size;
          setStats({
            members: totalMembers > 1000 ? `${Math.round(totalMembers / 1000)}K+` : `${totalMembers}+`,
            chapters: `${activeChapters.length}+`,
            countries: `${uniqueCountries}`,
            events: "300+", // Could be fetched from events table
          });
        }
      } catch {
        setChapters(getDemoChapters());
      } finally {
        setLoading(false);
      }
    }

    fetchChapters();
  }, []);

  return { chapters, stats, loading };
}

function getDemoChapters(): CommunityChapter[] {
  return [
    {
      id: "1",
      name: "Nairobi Hub",
      city: "Nairobi",
      country: "Kenya",
      coordinator_name: "Amina Diallo",
      coordinator_email: "nairobi@watalii.org",
      coordinator_phone: null,
      member_count: 2500,
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
      latitude: null,
      longitude: null,
      description: "",
      social_links: {},
      status: "active",
      created_at: "",
    },
  ];
}
