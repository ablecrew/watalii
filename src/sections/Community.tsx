import { motion } from "framer-motion";
import { Users, MessageCircle, MapPin, Loader2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useCommunity } from "../hooks/useCommunity";

export function Community() {
  const { stats, loading } = useCommunity();

  const communityStats = [
    { value: stats.members, label: "Active Members" },
    { value: stats.chapters, label: "Local Chapters" },
    { value: stats.countries, label: "Countries" },
    { value: stats.events, label: "Events Yearly" },
  ];

  return (
    <section id="community" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80"
                alt="Community gathering"
                className="rounded-3xl object-cover h-64 w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80"
                alt="Event crowd"
                className="rounded-3xl object-cover h-64 w-full mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600&q=80"
                alt="Workshop session"
                className="rounded-3xl object-cover h-64 w-full -mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80"
                alt="Team collaboration"
                className="rounded-3xl object-cover h-64 w-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary dark:bg-primary/20">
              <Users className="h-4 w-4" />
              Our Community
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-warm-900 dark:text-white sm:text-4xl lg:text-5xl">
              A Global Network of Storytellers
            </h2>
            <p className="mt-6 text-lg text-warm-600 dark:text-white/70">
              Join creators, listeners, changemakers, and dreamers who believe in the
              power of stories to connect and transform communities.
            </p>

            {loading ? (
              <div className="mt-8 flex h-24 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {communityStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-display text-2xl font-bold text-primary sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="text-sm text-warm-600 dark:text-white/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="primary" size="lg" glow>
                <MessageCircle className="h-5 w-5" />
                Join the Conversation
              </Button>
              <Button variant="outline" size="lg">
                <MapPin className="h-5 w-5" />
                Find a Chapter
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
