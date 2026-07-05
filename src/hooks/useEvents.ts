import { useEffect, useState } from "react";
import { supabase, type Event } from "../lib/supabase";

export function useEvents(limit?: number) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const env = (import.meta as unknown as { env: Record<string, string> }).env;
        if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) {
          setEvents(getDemoEvents());
          return;
        }

        let query = supabase
          .from("events")
          .select("*, category:categories(*)")
          .in("status", ["upcoming", "ongoing"])
          .order("start_date", { ascending: true });

        if (limit) query = query.limit(limit);

        const { data, error } = await query;
        if (error) throw error;
        setEvents((data as Event[]) || []);
      } catch {
        setEvents(getDemoEvents());
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [limit]);

  return { events, loading };
}

function getDemoEvents(): Event[] {
  return [
    {
      id: "1",
      title: "WATALII Creators Summit",
      slug: "creators-summit",
      description: "A full-day summit bringing together creators, storytellers, and community leaders.",
      short_description: "",
      banner_image: null,
      address: null,
      venue_name: null,
      ticket_url: null,
      capacity: null,
      start_date: "2026-03-15T10:00:00Z",
      end_date: "2026-03-15T18:00:00Z",
      timezone: "Africa/Nairobi",
      location: "Nairobi, Kenya",
      city: "Nairobi",
      country: "Kenya",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
      category_id: null,
      price: 0,
      currency: "USD",
      registered_count: 0,
      status: "upcoming",
      is_featured: true,
      created_at: "",
      updated_at: "",
    },
    {
      id: "2",
      title: "Storytellers Open Mic",
      slug: "storytellers-open-mic",
      description: "Live open mic night featuring emerging voices from the Lagos creative scene.",
      short_description: "",
      banner_image: null,
      address: null,
      venue_name: null,
      ticket_url: null,
      capacity: null,
      start_date: "2026-04-02T18:00:00Z",
      end_date: "2026-04-02T21:00:00Z",
      timezone: "Africa/Lagos",
      location: "Lagos, Nigeria",
      city: "Lagos",
      country: "Nigeria",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
      category_id: null,
      price: 0,
      currency: "USD",
      registered_count: 0,
      status: "upcoming",
      is_featured: false,
      created_at: "",
      updated_at: "",
    },
    {
      id: "3",
      title: "Community Media Workshop",
      slug: "community-media-workshop",
      description: "Hands-on training in podcasting, photography, and digital storytelling.",
      short_description: "",
      banner_image: null,
      address: null,
      venue_name: null,
      ticket_url: null,
      capacity: null,
      start_date: "2026-04-18T09:00:00Z",
      end_date: "2026-04-18T16:00:00Z",
      timezone: "Africa/Accra",
      location: "Accra, Ghana",
      city: "Accra",
      country: "Ghana",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80",
      category_id: null,
      price: 0,
      currency: "USD",
      registered_count: 0,
      status: "upcoming",
      is_featured: false,
      created_at: "",
      updated_at: "",
    },
  ];
}
