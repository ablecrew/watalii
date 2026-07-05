import { useEffect, useState } from "react";
import { supabase, type FoundationProgram } from "../lib/supabase";

export function useFoundation() {
  const [programs, setPrograms] = useState<FoundationProgram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const env = (import.meta as unknown as { env: Record<string, string> }).env;
        if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) {
          setPrograms(getDemoPrograms());
          return;
        }

        const { data, error } = await supabase
          .from("foundation_programs")
          .select("*")
          .eq("status", "active")
          .order("order_index", { ascending: true });

        if (error) throw error;
        setPrograms((data as FoundationProgram[]) || []);
      } catch {
        setPrograms(getDemoPrograms());
      } finally {
        setLoading(false);
      }
    }

    fetchPrograms();
  }, []);

  return { programs, loading };
}

function getDemoPrograms(): FoundationProgram[] {
  return [
    {
      id: "1",
      title: "Youth Media Training",
      slug: "youth-media-training",
      description: "Free workshops teaching storytelling, podcasting, and digital media skills to young creators.",
      short_description: "",
      image: null,
      impact_metric: "Youth Trained",
      impact_value: "1,200+",
      goal_amount: null,
      raised_amount: 0,
      beneficiaries_count: 1200,
      status: "active",
      is_featured: false,
      order_index: 0,
      created_at: "",
      updated_at: "",
    },
    {
      id: "2",
      title: "Community Storytelling",
      slug: "community-storytelling",
      description: "Recording and preserving local narratives that inspire connection and cultural pride.",
      short_description: "",
      image: null,
      impact_metric: "Stories Recorded",
      impact_value: "500+",
      goal_amount: null,
      raised_amount: 0,
      beneficiaries_count: 500,
      status: "active",
      is_featured: false,
      order_index: 1,
      created_at: "",
      updated_at: "",
    },
    {
      id: "3",
      title: "Sustainable Impact",
      slug: "sustainable-impact",
      description: "Partnering with communities on environmental and social projects through creative media.",
      short_description: "",
      image: null,
      impact_metric: "Projects",
      impact_value: "35",
      goal_amount: null,
      raised_amount: 0,
      beneficiaries_count: 35,
      status: "active",
      is_featured: false,
      order_index: 2,
      created_at: "",
      updated_at: "",
    },
    {
      id: "4",
      title: "Creator Fund",
      slug: "creator-fund",
      description: "Micro-grants and mentorship for emerging podcasters, photographers, and filmmakers.",
      short_description: "",
      image: null,
      impact_metric: "Creators Funded",
      impact_value: "85",
      goal_amount: null,
      raised_amount: 0,
      beneficiaries_count: 85,
      status: "active",
      is_featured: false,
      order_index: 3,
      created_at: "",
      updated_at: "",
    },
  ];
}
