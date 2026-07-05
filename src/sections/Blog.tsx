import { motion } from "framer-motion";
import { Newspaper, Clock, ArrowRight, User, Loader2 } from "lucide-react";
import { useBlog } from "../hooks/useBlog";

export function Blog() {
  const { posts, loading } = useBlog(3);

  return (
    <section id="blog" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary dark:bg-primary/20">
            <Newspaper className="h-4 w-4" />
            From the Blog
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-warm-900 dark:text-white sm:text-4xl lg:text-5xl">
            Stories & Insights
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-warm-600 dark:text-white/60">
            Thoughts on creativity, community, and the future of media.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-3xl glass"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.cover_image || "https://via.placeholder.com/600"}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {post.category?.name || "Article"}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-warm-900 dark:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-warm-600 dark:text-white/60">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-warm-500 dark:text-white/50">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author?.name || "WATALII"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.read_time} min read
                    </span>
                  </div>
                  <button className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary transition-colors group-hover:gap-3">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
