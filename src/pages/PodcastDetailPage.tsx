import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import {
  Play,
  Clock,
  Mic2,
  Calendar,
  ArrowLeft,
  Share2,
  Heart,
  MessageSquare,
  Users,
  FileText,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { usePodcastDetail } from "../hooks/usePodcastDetail";
import { GuestCard } from "../components/GuestCard";
import { CommentSection } from "../components/CommentSection";
import { getYouTubeEmbedUrl } from "../lib/youtube";

export function PodcastDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { podcast, guests, transcript, comments, upNext, loading, error } =
    usePodcastDetail(slug);
  const [showTranscript, setShowTranscript] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !podcast) {
    return (
      <div className="mx-auto max-w-4xl px-4 pt-32 text-center">
        <h1 className="font-heading text-3xl font-bold text-warm-900 dark:text-white">
          Episode not found
        </h1>
        <p className="mt-4 text-warm-600 dark:text-white/60">
          The podcast episode you're looking for doesn't exist.
        </p>
        <Link to="/podcasts">
          <Button variant="primary" className="mt-6">
            Browse Episodes
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link
            to="/podcasts"
            className="inline-flex items-center gap-2 rounded-full bg-white/50 px-4 py-2 text-sm font-medium text-warm-800 transition-colors hover:bg-white/70 dark:bg-white/10 dark:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Episodes
          </Link>
        </motion.div>

        {/* Main Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 overflow-hidden rounded-3xl bg-black shadow-2xl"
        >
          {podcast.video_url ? (
            <div className="aspect-video">
              <iframe
                src={getYouTubeEmbedUrl(podcast.video_url) || ""}
                title={podcast.title}
                className="h-full w-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center bg-warm-900">
              <p className="text-white/60">No video available</p>
            </div>
          )}
        </motion.div>

        {/* Episode Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary dark:bg-primary/20">
            {podcast.category?.name || "Culture"}
          </span>
          <h1 className="font-heading text-3xl font-bold text-warm-900 dark:text-white sm:text-4xl lg:text-5xl">
            {podcast.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-warm-600 dark:text-white/70">
            {podcast.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-warm-500 dark:text-white/50">
            <span className="flex items-center gap-1">
              <Mic2 className="h-4 w-4 text-primary" />
              {podcast.host?.name || "WATALII Team"}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-primary" />
              {podcast.duration || "45 min"}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-primary" />
              {new Date(podcast.published_at || podcast.created_at).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4 text-primary" />
              {comments.length} comments
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {podcast.video_url && (
              <a href={podcast.video_url} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" glow className="gap-2">
                  <Play className="h-4 w-4 fill-current" />
                  Watch on YouTube
                </Button>
              </a>
            )}
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" className="gap-2">
              <Heart className="h-4 w-4" />
              Like
            </Button>
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Guests */}
            {guests.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl glass p-6 sm:p-8"
              >
                <div className="mb-6 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-2xl font-bold text-warm-900 dark:text-white">
                    Featured Guests
                  </h2>
                </div>
                <div className="space-y-4">
                  {guests.map((guest, index) => (
                    <GuestCard key={guest.id} guest={guest} index={index} />
                  ))}
                </div>
              </motion.section>
            )}

            {/* Transcript */}
            {transcript && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl glass p-6 sm:p-8"
              >
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="flex w-full items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-2xl font-bold text-warm-900 dark:text-white">
                      Episode Transcript
                    </h2>
                  </div>
                  {showTranscript ? (
                    <ChevronUp className="h-5 w-5 text-warm-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-warm-500" />
                  )}
                </button>
                {showTranscript && (
                  <div className="mt-4 max-h-96 overflow-y-auto rounded-2xl bg-white/40 p-4 text-warm-800 dark:bg-white/5 dark:text-white/80">
                    {transcript.content.split("\n").map((paragraph, i) => (
                      <p key={i} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </motion.section>
            )}

            {/* Comments */}
            <CommentSection podcastId={podcast.id} />
          </div>

          {/* Right Column: Up Next */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="sticky top-28 rounded-3xl glass p-6">
              <h2 className="mb-6 font-display text-xl font-bold text-warm-900 dark:text-white">
                Up Next
              </h2>
              <div className="space-y-4">
                {upNext.length === 0 ? (
                  <p className="text-sm text-warm-500 dark:text-white/50">
                    More episodes coming soon.
                  </p>
                ) : (
                  upNext.map((episode) => (
                    <Link
                      key={episode.id}
                      to={`/podcasts/${episode.slug}`}
                      className="group flex gap-3 rounded-2xl p-2 transition-colors hover:bg-white/50 dark:hover:bg-white/5"
                    >
                      <img
                        src={episode.cover_image || "https://via.placeholder.com/120"}
                        alt={episode.title}
                        className="h-20 w-20 rounded-xl object-cover"
                      />
                      <div>
                        <p className="text-xs text-primary">Episode {episode.episode_number}</p>
                        <h4 className="font-medium text-warm-900 line-clamp-2 dark:text-white group-hover:text-primary">
                          {episode.title}
                        </h4>
                        <p className="text-xs text-warm-500 dark:text-white/50">
                          {episode.duration || "45 min"}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}