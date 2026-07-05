import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Play,
  Clock,
  Mic2,
  Search,
  Filter,
  ArrowLeft,
  ArrowRight,
  Headphones,
  Calendar,
  Share2,
  Heart,
  Loader2,
  Radio,
  X,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { usePodcasts, usePodcastCategories, type PodcastView } from "../hooks/usePodcasts";
import { getYouTubeEmbedUrl } from "../lib/youtube";
import { cn } from "@/lib/utils";

export function PodcastsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const { podcasts, loading } = usePodcasts({ category, search });
  const categories = usePodcastCategories();

  const featured = podcasts[0];
  const episodes = featured ? podcasts.slice(1) : podcasts;

  return (
    <div className="min-h-screen pb-24">
      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
                <iframe
                  src={getYouTubeEmbedUrl(activeVideo) || ""}
                  title="WATALII Podcast"
                  className="h-full w-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Hero */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-primary/15 blur-[120px]" />
          <div className="absolute right-[5%] top-[20%] h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-white/50 px-4 py-2 text-sm font-medium text-warm-800 transition-colors hover:bg-white/70 dark:bg-white/10 dark:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary dark:bg-primary/20">
              <Radio className="h-4 w-4" />
              WATALII Podcast Network
            </span>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-warm-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Stories That Move People
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-warm-600 dark:text-white/70">
              Discover podcasts that amplify voices, spark conversations, and build
              communities across Africa and the diaspora.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {[
              { label: "Episodes", value: "250+" },
              { label: "Series", value: "12" },
              { label: "Listeners", value: "50K+" },
              { label: "Countries", value: "48" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl glass p-6 text-center">
                <p className="font-display text-2xl font-bold text-primary sm:text-3xl">
                  {stat.value}
                </p>
                <p className="text-sm text-warm-600 dark:text-white/60">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Episode */}
      {featured && !loading && (
        <section className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[2.5rem] bg-warm-900 shadow-2xl dark:bg-black/40"
          >
            <img
              src={featured.cover_image}
              alt={featured.title}
              className="absolute inset-0 h-full w-full object-cover opacity-40"
            />
            <div className="hero-overlay absolute inset-0" />
            <div className="relative grid items-center gap-8 p-8 lg:grid-cols-2 lg:p-12">
              <div className="order-2 lg:order-1">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  <Mic2 className="h-3 w-3" />
                  Latest Episode
                </span>
                <h2 className="mt-4 font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-lg text-white/80">{featured.description}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-1">
                    <Mic2 className="h-4 w-4" />
                    {featured.host}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featured.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(featured.published_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  {featured.video_url && (
                    <Button
                      variant="primary"
                      size="lg"
                      glow
                      className="group"
                      onClick={() => setActiveVideo(featured.video_url)}
                    >
                      <Play className="h-5 w-5 fill-current" />
                      Watch Episode
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  )}
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                    Share
                  </Button>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative mx-auto aspect-square max-w-sm overflow-hidden rounded-3xl shadow-2xl lg:ml-auto">
                  <img
                    src={featured.cover_image}
                    alt={featured.title}
                    className="h-full w-full object-cover"
                  />
                  {featured.video_url && (
                    <button
                      onClick={() => setActiveVideo(featured.video_url)}
                      className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-xl transition-transform hover:scale-110"
                    >
                      <Play className="h-8 w-8 fill-current" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Search & Filters */}
      <section className="sticky top-24 z-30 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-3xl glass-light p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-warm-500 dark:text-white/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search episodes, hosts, or topics..."
              className="w-full rounded-2xl border border-warm-200 bg-white/50 py-3 pl-12 pr-4 text-warm-900 outline-none transition-colors placeholder:text-warm-500 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Filter className="h-5 w-5 shrink-0 text-warm-500 dark:text-white/50" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all",
                  category === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-white/50 text-warm-700 hover:bg-white/70 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Episodes Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h3 className="font-display text-2xl font-bold text-warm-900 dark:text-white">
            {category === "All" ? "All Episodes" : `${category} Episodes`}
          </h3>
          <span className="text-sm text-warm-600 dark:text-white/60">
            {loading ? "Loading..." : `${episodes.length} episodes`}
          </span>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : episodes.length === 0 ? (
          <div className="rounded-3xl glass p-12 text-center">
            <Headphones className="mx-auto h-12 w-12 text-primary/50" />
            <h4 className="mt-4 font-display text-xl font-bold text-warm-900 dark:text-white">
              No episodes found
            </h4>
            <p className="mt-2 text-warm-600 dark:text-white/60">
              Try adjusting your search or filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {episodes.map((podcast, index) => (
              <EpisodeCard
                key={podcast.id}
                podcast={podcast}
                index={index}
                onPlay={() => podcast.video_url && setActiveVideo(podcast.video_url)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter / CTA */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-secondary p-8 text-center shadow-2xl lg:p-16">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative">
            <h3 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              Never Miss an Episode
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Subscribe to get new episodes, exclusive content, and behind-the-scenes
              updates delivered to your inbox.
            </p>
            <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border-0 bg-white/20 px-6 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button className="bg-white text-primary hover:bg-black/90" size="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function EpisodeCard({
  podcast,
  index,
  onPlay,
}: {
  podcast: PodcastView;
  index: number;
  onPlay: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-3xl glass"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={podcast.cover_image}
          alt={podcast.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {podcast.video_url && (
          <button
            onClick={onPlay}
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
          >
            <Play className="h-7 w-7 fill-current" />
          </button>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {podcast.category}
        </span>
        <button className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-white/20">
          <Heart className="h-4 w-4" />
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs font-medium text-white/70">
            Episode {podcast.episode_number}
          </p>
          <h4 className="font-display text-xl font-bold text-white line-clamp-2">
            {podcast.title}
          </h4>
        </div>
      </div>
      <div className="p-5">
        <p className="mb-4 line-clamp-2 text-sm text-warm-600 dark:text-white/60">
          {podcast.description}
        </p>
        <div className="mb-4 flex items-center justify-between text-sm text-warm-500 dark:text-white/50">
          <span className="flex items-center gap-1">
            <Mic2 className="h-4 w-4" />
            {podcast.host}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {podcast.duration}
          </span>
        </div>
        {podcast.video_url ? (
          <button
            onClick={onPlay}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            <Play className="h-4 w-4 fill-current" />
            Watch Now
          </button>
        ) : (
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
            <Play className="h-4 w-4 fill-current" />
            Listen Now
          </button>
        )}
      </div>
    </motion.article>
  );
}
