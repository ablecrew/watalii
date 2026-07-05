import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, Clock, Mic2, TrendingUp, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { usePodcasts } from "../hooks/usePodcasts";

export function Podcasts() {
  const { podcasts, loading } = usePodcasts({ category: "All" });
  const displayPodcasts = podcasts.slice(0, 4);
  const featured = displayPodcasts[0];
  const others = displayPodcasts.slice(1);

  return (
    <section id="podcasts" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary dark:bg-primary/20">
            <Mic2 className="h-4 w-4" />
            Featured Episodes
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-warm-900 dark:text-white sm:text-4xl lg:text-5xl">
            Listen to Stories That Matter
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-warm-600 dark:text-white/60">
            From intimate conversations to bold interviews, our podcasts amplify
            voices shaping culture, business, and social change.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {featured && (
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-3xl glass md:col-span-2 lg:row-span-2"
                >
                  <div className="relative h-full min-h-[400px] overflow-hidden">
                    <img
                      src={featured.cover_image}
                      alt={featured.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <a
                      href={featured.video_url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform group-hover:scale-110"
                    >
                      <Play className="h-5 w-5 fill-current" />
                    </a>
                    <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-secondary/90 px-3 py-1 text-xs font-semibold text-white">
                      <TrendingUp className="h-3 w-3" />
                      Featured
                    </span>
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {featured.category}
                      </span>
                      <h3 className="font-heading text-2xl font-bold text-white">
                        {featured.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/80 line-clamp-2">
                        {featured.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              )}

              {others.map((podcast, index) => (
                <motion.article
                  key={podcast.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group overflow-hidden rounded-3xl glass"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={podcast.cover_image}
                      alt={podcast.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <a
                      href={podcast.video_url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform group-hover:scale-110"
                    >
                      <Play className="h-4 w-4 fill-current" />
                    </a>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="mb-1 inline-block rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                        {podcast.category}
                      </span>
                      <h3 className="font-heading text-lg font-bold text-white">
                        {podcast.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-3 flex items-center justify-between text-xs text-warm-600 dark:text-white/60">
                      <span className="flex items-center gap-1">
                        <Mic2 className="h-3 w-3" />
                        {podcast.host}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {podcast.duration}
                      </span>
                    </div>
                    <a
                      href={podcast.video_url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                    >
                      <Play className="h-4 w-4 fill-current" />
                      Watch on YouTube
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link to="/podcasts">
                <Button variant="outline" size="lg" className="bg-white/60 text-warm-800 hover:bg-white/80 dark:bg-white/10 dark:text-white">
                  <TrendingUp className="h-5 w-5" />
                  Browse All Episodes
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
