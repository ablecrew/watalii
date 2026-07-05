import { createClient } from "@supabase/supabase-js";

const env = (import.meta as unknown as { env: Record<string, string> }).env;
export const supabaseUrl = env.VITE_SUPABASE_URL || "";
export const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// =====================================================
// Merchandise Interface
// =====================================================
export interface Merchandise {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number;
  compare_price: number | null;
  currency: string;
  images: string[] | null;
  cover_image: string | null;
  sizes: string[] | null;
  colors: { name: string; hex: string }[] | null;
  stock: number;
  sku: string | null;
  status: string;
  is_featured: boolean;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  is_tshirt?: boolean;
  color_images?: Record<string, string>;
  category?: string;
  rating?: number;
  reviews?: number;
}

// =====================================================
// Merchandise fetch helper (for Shop)
// =====================================================
export async function fetchMerchandise(): Promise<Merchandise[]> {
  // Simulated data with your Cloudinary images
  const merchandiseData: Merchandise[] = [
    {
      id: "prod-001",
      title: "WATALII iPhone Case",
      slug: "watalii-iphone-case",
      description: "Premium protective case featuring the iconic WATALII branding. Slim design with raised edges for screen and camera protection.",
      short_description: "Premium WATALII iPhone case",
      price: 2499,
      compare_price: 3499,
      currency: "KES",
      images: ["https://res.cloudinary.com/ddeihyhm5/image/upload/v1783178957/iphone-case-watalii_1_fpdvkv.png"],
      cover_image: "https://res.cloudinary.com/ddeihyhm5/image/upload/v1783178957/iphone-case-watalii_1_fpdvkv.png",
      sizes: ["iPhone 14", "iPhone 15", "iPhone 16"],
      colors: [{ name: "Black", hex: "#1a1a1a" }, { name: "Clear", hex: "#f5f5f5" }],
      stock: 45,
      sku: "IPH-001",
      status: "active",
      is_featured: true,
      tags: ["Accessories"],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: "Accessories",
      rating: 4.9,
      reviews: 234,
    },
    {
      id: "prod-002",
      title: "WATALII Signature T-Shirt",
      slug: "watalii-signature-t-shirt",
      description: "Premium cotton tee with the bold WATALII logo. Ultra-soft, breathable fabric perfect for everyday wear.",
      short_description: "Signature WATALII cotton t-shirt",
      price: 1899,
      compare_price: 2499,
      currency: "KES",
      images: ["https://res.cloudinary.com/ddeihyhm5/image/upload/v1783178831/WhatsApp_Image_2026-06-06_at_11.17.44_PM_jrbs9w.jpg"],
      cover_image: "https://res.cloudinary.com/ddeihyhm5/image/upload/v1783178831/WhatsApp_Image_2026-06-06_at_11.17.44_PM_jrbs9w.jpg",
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "Red", hex: "#C8102E" },
        { name: "Grey", hex: "#4A5568" },
        { name: "Yellow", hex: "#E8A04C" },
        { name: "Black", hex: "#1a1a1a" },
        { name: "White", hex: "#F7FAFC" },
      ],
      stock: 120,
      sku: "TSH-002",
      status: "active",
      is_featured: true,
      tags: ["Apparel"],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_tshirt: true,
      color_images: {
        Red: "https://res.cloudinary.com/ddeihyhm5/image/upload/v1783178831/WhatsApp_Image_2026-06-06_at_11.17.44_PM_jrbs9w.jpg",
        Grey: "https://res.cloudinary.com/ddeihyhm5/image/upload/v1783178831/WhatsApp_Image_2026-06-06_at_1.17.47_PM_vhyyxk.jpg",
        Yellow: "https://res.cloudinary.com/ddeihyhm5/image/upload/v1783178831/WhatsApp_Image_2026-06-06_at_11.17.43_M_kppvry.jpg",
        Black: "https://res.cloudinary.com/ddeihyhm5/image/upload/v1783178830/WhatsApp_Image_2026-06-06_at_11.16.44_PM_tcncqv.jpg",
        White: "https://res.cloudinary.com/ddeihyhm5/image/upload/v1783178830/WhatsApp_Image_2026-06-06_at_11.17.6_PM_ndhsj1.jpg",
      },
      category: "Apparel",
      rating: 4.8,
      reviews: 512,
    },
    {
      id: "prod-003",
      title: "WATALII Ceramic Plate",
      slug: "watalii-ceramic-plate",
      description: "Elegant ceramic dinner plate with the distinctive WATALII design. Dishwasher and microwave safe.",
      short_description: "WATALII ceramic dinner plate",
      price: 1299,
      compare_price: 1799,
      currency: "KES",
      images: ["https://res.cloudinary.com/ddeihyhm5/image/upload/v1783177915/plate-watalii_cdtpai.png"],
      cover_image: "https://res.cloudinary.com/ddeihyhm5/image/upload/v1783177915/plate-watalii_cdtpai.png",
      sizes: ["Standard"],
      colors: [{ name: "White", hex: "#FFFFFF" }],
      stock: 30,
      sku: "PLT-003",
      status: "active",
      is_featured: false,
      tags: ["Accessories"],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: "Accessories",
      rating: 4.7,
      reviews: 89,
    },
    {
      id: "prod-004",
      title: "WATALII Tote Bag",
      slug: "watalii-tote-bag",
      description: "Durable canvas shopping bag with premium WATALII embroidery. Perfect for daily errands and market runs.",
      short_description: "WATALII canvas tote bag",
      price: 999,
      compare_price: 1499,
      currency: "KES",
      images: ["https://res.cloudinary.com/ddeihyhm5/image/upload/v1783177893/shopping-bag-watalii_vjhcnc.png"],
      cover_image: "https://res.cloudinary.com/ddeihyhm5/image/upload/v1783177893/shopping-bag-watalii_vjhcnc.png",
      sizes: ["One Size"],
      colors: [{ name: "Natural", hex: "#F5F0E6" }],
      stock: 65,
      sku: "BAG-004",
      status: "active",
      is_featured: false,
      tags: ["Accessories"],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: "Accessories",
      rating: 4.9,
      reviews: 167,
    },
    {
      id: "prod-005",
      title: "WATALII Hardcover Journal",
      slug: "watalii-hardcover-journal",
      description: "Premium hardcover notebook with 200 pages of high-quality paper. Perfect for notes, ideas, and reflections.",
      short_description: "WATALII hardcover journal",
      price: 1599,
      compare_price: 2199,
      currency: "KES",
      images: ["https://res.cloudinary.com/ddeihyhm5/image/upload/v1783177890/hardcover-book-watalii_fmbrhd.png"],
      cover_image: "https://res.cloudinary.com/ddeihyhm5/image/upload/v1783177890/hardcover-book-watalii_fmbrhd.png",
      sizes: ["A5"],
      colors: [{ name: "Black", hex: "#1a1a1a" }],
      stock: 55,
      sku: "JRN-005",
      status: "active",
      is_featured: true,
      tags: ["Education"],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: "Education",
      rating: 4.8,
      reviews: 143,
    },
    {
      id: "prod-006",
      title: "WATALII Food Container",
      slug: "watalii-food-container",
      description: "Eco-friendly reusable food container with secure lock lid. Ideal for lunch and meal prep.",
      short_description: "WATALII reusable food container",
      price: 799,
      compare_price: 1199,
      currency: "KES",
      images: ["https://res.cloudinary.com/ddeihyhm5/image/upload/v1783177886/plastic-food-container-watalii_rotklw.png"],
      cover_image: "https://res.cloudinary.com/ddeihyhm5/image/upload/v1783177886/plastic-food-container-watalii_rotklw.png",
      sizes: ["500ml", "750ml"],
      colors: [{ name: "Black", hex: "#1a1a1a" }],
      stock: 80,
      sku: "CON-006",
      status: "active",
      is_featured: false,
      tags: ["Accessories"],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: "Accessories",
      rating: 4.6,
      reviews: 78,
    },
    {
      id: "prod-007",
      title: "WATALII Coffee Bag",
      slug: "watalii-coffee-bag",
      description: "Premium single-origin Kenyan coffee beans. 250g resealable bag with rich, bold flavor notes.",
      short_description: "WATALII Kenyan coffee beans",
      price: 1199,
      compare_price: 1599,
      currency: "KES",
      images: ["https://res.cloudinary.com/ddeihyhm5/image/upload/v1783177884/coffee-bag-mockup_wlublv.png"],
      cover_image: "https://res.cloudinary.com/ddeihyhm5/image/upload/v1783177884/coffee-bag-mockup_wlublv.png",
      sizes: ["250g"],
      colors: [{ name: "Brown", hex: "#8B5E3C" }],
      stock: 95,
      sku: "COF-007",
      status: "active",
      is_featured: true,
      tags: ["Accessories"],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: "Accessories",
      rating: 4.9,
      reviews: 201,
    },
  ];

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase not configured. Using local demo data.");
    return merchandiseData;
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching from Supabase, falling back to demo data:", error);
      return merchandiseData;
    }

    return (data as Merchandise[]) || merchandiseData;
  } catch (err) {
    console.error("Supabase fetch failed, using demo data:", err);
    return merchandiseData;
  }
}