import { useEffect, useState } from "react";
import { supabase, type Product } from "../lib/supabase";

export function useProducts(limit?: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const env = (import.meta as unknown as { env: Record<string, string> }).env;
        if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) {
          setProducts(getDemoProducts());
          return;
        }

        let query = supabase
          .from("products")
          .select("*, category:categories(*)")
          .eq("status", "active")
          .order("created_at", { ascending: false });

        if (limit) query = query.limit(limit);

        const { data, error } = await query;
        if (error) throw error;
        setProducts((data as Product[]) || []);
      } catch {
        setProducts(getDemoProducts());
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [limit]);

  return { products, loading };
}

function getDemoProducts(): Product[] {
  return [
    {
      id: "1",
      title: "Creator Starter Kit",
      slug: "creator-starter-kit",
      description: "Everything you need to start creating content.",
      short_description: "",
      price: 6000,
      compare_price: null,
      currency: "KES",
      images: null,
      cover_image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
      category_id: null,
      stock: 100,
      sku: null,
      status: "active",
      is_featured: true,
      seller_name: null,
      seller_info: null,
      tags: null,
      created_at: "",
      updated_at: "",
    },
    {
      id: "2",
      title: "Podcast Equipment Bundle",
      slug: "podcast-equipment-bundle",
      description: "Professional microphone, headphones, and accessories.",
      short_description: "",
      price: 11000,
      compare_price: null,
      currency: "KES",
      images: null,
      cover_image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&q=80",
      category_id: null,
      stock: 50,
      sku: null,
      status: "active",
      is_featured: true,
      seller_name: null,
      seller_info: null,
      tags: null,
      created_at: "",
      updated_at: "",
    },
    {
      id: "3",
      title: "Digital Media Course",
      slug: "digital-media-course",
      description: "Learn storytelling, editing, and distribution.",
      short_description: "",
      price: 3500,
      compare_price: null,
      currency: "KES",
      images: null,
      cover_image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
      category_id: null,
      stock: 1000,
      sku: null,
      status: "active",
      is_featured: false,
      seller_name: null,
      seller_info: null,
      tags: null,
      created_at: "",
      updated_at: "",
    },
  ];
}
