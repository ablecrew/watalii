import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Search,
  X,
  ArrowRight,
  Heart,
  Share2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { cn } from "@/lib/utils";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  author: string;
  date: string;
  read_time: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The New Wave of Kenyan Storytelling",
    slug: "new-wave-kenyan-storytelling",
    excerpt: "How Gen Z creators are reshaping African narratives through podcasting and digital media.",
    content: "Kenya’s creative landscape is undergoing a quiet revolution. From intimate living-room recordings to stadium-level live shows, a new generation of storytellers is redefining what it means to be heard on the continent. At the heart of this movement is WATALII — a platform that gives voice to the unheard.\n\nIn this piece, we explore how young creators are blending traditional oral storytelling with modern audio production to create something entirely new.",
    cover_image: "https://images.unsplash.com/photo-1516321497677-de7c1852d2c1?w=1200&q=80",
    category: "Culture",
    author: "Amina Hassan",
    date: "June 12, 2026",
    read_time: "8 min",
    featured: true,
  },
  {
    id: 2,
    title: "Behind the Mic: Producing Season 4",
    slug: "behind-the-mic-season-4",
    excerpt: "A deep dive into the making of our most ambitious season yet — from guest bookings to live audience energy.",
    content: "Season 4 of WATALII was our most ambitious yet. With 18 episodes, 23 guests, and three live shows across Nairobi, the production team pushed boundaries in storytelling and sound design.\n\nFrom recording in a moving matatu to hosting a live conversation with over 400 people, here’s what really happened behind the scenes.",
    cover_image: "https://images.unsplash.com/photo-1590602847007-6f5f4235c2f3?w=1200&q=80",
    category: "Behind the Scenes",
    author: "James Kariuki",
    date: "June 5, 2026",
    read_time: "12 min",
  },
  {
    id: 3,
    title: "Mental Health in African Creative Spaces",
    slug: "mental-health-creative-spaces",
    excerpt: "Why creatives are burning out and what the industry can do to support them.",
    content: "The creative industry in Africa is booming, but behind the highlight reels lies a silent crisis. Many podcasters, musicians, and content creators are struggling with burnout, anxiety, and lack of support systems.\n\nIn this honest conversation, we speak with three creatives about their mental health journeys and how they’re creating safer spaces for others.",
    cover_image: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=1200&q=80",
    category: "Wellness",
    author: "Dr. Leila Okello",
    date: "May 28, 2026",
    read_time: "10 min",
  },
  {
    id: 4,
    title: "Why Youth Voices Matter More Than Ever",
    slug: "youth-voices-matter",
    excerpt: "Exploring the power of young Africans in shaping policy, culture, and the future of media.",
    content: "Young Africans are no longer waiting for permission to speak. From climate activism to political commentary, Gen Z is using podcasts, TikTok, and Instagram to demand accountability and create change.\n\nWATALII exists because we believe every young voice deserves to be heard.",
    cover_image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
    category: "Youth",
    author: "Brian Ochieng",
    date: "May 20, 2026",
    read_time: "7 min",
  },
  {
    id: 5,
    title: "The Art of the Long-Form Conversation",
    slug: "art-of-long-form-conversation",
    excerpt: "In a world of 30-second clips, why deep, uninterrupted conversations still matter.",
    content: "In the age of short-form content, long-form podcasting has become an act of resistance. It gives guests space to be vulnerable, to think out loud, and to tell stories that can’t be reduced to a tweet.\n\nHere’s why we remain committed to the long conversation at WATALII.",
    cover_image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&q=80",
    category: "Media",
    author: "Sarah Muthoni",
    date: "May 14, 2026",
    read_time: "9 min",
  },
];

const categories = ["All", "Culture", "Behind the Scenes", "Wellness", "Youth", "Media"];

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured);

  const toggleLike = (id: number) => {
    setLikedPosts((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const sharePost = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href + "#" + post.slug,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen pb-24 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-white/50 px-4 py-2 text-sm font-medium text-warm-800 transition-colors hover:bg-white/70 dark:bg-white/10 dark:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
            <Calendar className="h-4 w-4" /> The WATALII Journal
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-warm-900 dark:text-white">
            Stories That Matter
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-warm-600 dark:text-white/70">
            Deep conversations, behind-the-scenes insights, and powerful African narratives.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-4 text-warm-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-warm-200 bg-white/60 pl-12 py-4 text-warm-900 placeholder:text-warm-400 focus:outline-none focus:border-primary dark:bg-white/5 dark:border-white/10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all",
                  activeCategory === cat
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white/60 text-warm-700 hover:bg-white dark:bg-white/5 dark:text-white/70"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && activeCategory === "All" && !searchTerm && (
          <div className="mb-16">
            <div className="text-xs tracking-[2px] text-primary font-medium mb-3">FEATURED</div>
            <div
              onClick={() => setSelectedPost(featuredPost)}
              className="group relative overflow-hidden rounded-3xl cursor-pointer h-[420px] flex items-end"
            >
              <img
                src={featuredPost.cover_image}
                alt={featuredPost.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="relative p-10 text-white max-w-3xl">
                <div className="inline-block px-4 py-1 rounded-full bg-white/20 text-sm mb-4">
                  {featuredPost.category}
                </div>
                <h2 className="font-display text-4xl font-bold leading-tight mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-white/80 text-lg mb-6 line-clamp-2">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-white/70">
                  <div className="flex items-center gap-2"><User className="h-4 w-4" /> {featuredPost.author}</div>
                  <div>{featuredPost.date}</div>
                  <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> {featuredPost.read_time}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer overflow-hidden rounded-3xl glass flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-medium">
                  {post.category}
                </div>
              </div>
              <div className="p-7 flex-1 flex flex-col">
                <h3 className="font-display text-2xl font-bold text-warm-900 dark:text-white leading-tight mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-warm-600 dark:text-white/70 line-clamp-3 flex-1">{post.excerpt}</p>

                <div className="flex items-center justify-between mt-6 pt-6 border-t border-warm-200 dark:border-white/10 text-sm text-warm-500 dark:text-white/50">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" /> {post.author}
                  </div>
                  <div>{post.read_time}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-warm-500">No articles found matching your search.</div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-24 rounded-3xl bg-gradient-to-br from-primary to-secondary p-12 text-center text-white">
          <h3 className="font-display text-3xl font-bold">Stay in the conversation</h3>
          <p className="mt-3 max-w-md mx-auto text-white/80">Get our best stories and exclusive behind-the-scenes content delivered to your inbox.</p>
          <div className="mt-8 flex justify-center">
            <Button className="bg-white text-primary hover:bg-white/90" size="lg">
              Subscribe to the Newsletter
            </Button>
          </div>
        </div>
      </div>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 30 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white dark:bg-warm-900 max-h-[92vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute right-6 top-6 z-10 rounded-full bg-black/70 p-3 text-white hover:bg-black"
              >
                <X className="h-5 w-5" />
              </button>

              <img
                src={selectedPost.cover_image}
                alt={selectedPost.title}
                className="w-full h-80 object-cover"
              />

              <div className="p-10">
                <div className="flex items-center gap-3 text-sm text-primary mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10">{selectedPost.category}</span>
                  <span>{selectedPost.date}</span>
                  <span>• {selectedPost.read_time}</span>
                </div>

                <h1 className="font-display text-4xl font-bold text-warm-900 dark:text-white leading-tight mb-6">
                  {selectedPost.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-warm-500 dark:text-white/60 mb-10">
                  <div className="flex items-center gap-2"><User className="h-4 w-4" /> {selectedPost.author}</div>
                  <button onClick={() => toggleLike(selectedPost.id)} className="flex items-center gap-1.5 hover:text-primary">
                    <Heart className={cn("h-4 w-4", likedPosts.includes(selectedPost.id) && "fill-current text-red-500")} />
                    {likedPosts.includes(selectedPost.id) ? "Saved" : "Save"}
                  </button>
                  <button onClick={() => sharePost(selectedPost)} className="flex items-center gap-1.5 hover:text-primary">
                    <Share2 className="h-4 w-4" /> Share
                  </button>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none text-warm-700 dark:text-white/80 whitespace-pre-line">
                  {selectedPost.content}
                </div>

                <div className="mt-12 pt-8 border-t border-warm-200 dark:border-white/10 flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => setSelectedPost(null)} variant="secondary" size="lg">
                    Close Article
                  </Button>
                  <Button size="lg" className="flex-1">
                    Read Next Article <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
