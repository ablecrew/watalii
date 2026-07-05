import { motion } from "framer-motion";
import { Heart, Globe, GraduationCap, Trees, HandHeart } from "lucide-react";
import { Button } from "../components/ui/button";
import { ImpactChart } from "../components/ImpactChart";

const initiatives = [
  {
    icon: GraduationCap,
    title: "Youth Media Training",
    description: "Free workshops teaching storytelling, podcasting, and digital media skills to young creators.",
  },
  {
    icon: Globe,
    title: "Community Storytelling",
    description: "Recording and preserving local narratives that inspire connection and cultural pride.",
  },
  {
    icon: Trees,
    title: "Sustainable Impact",
    description: "Partnering with communities on environmental and social projects through creative media.",
  },
  {
    icon: HandHeart,
    title: "Creator Fund",
    description: "Micro-grants and mentorship for emerging podcasters, photographers, and filmmakers.",
  },
];

export function Foundation() {
  return (
    <section id="foundation" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold text-secondary dark:bg-secondary/20">
              <Heart className="h-4 w-4" />
              WATALII Foundation
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-warm-900 dark:text-white sm:text-4xl lg:text-5xl">
              Creating Change Through Storytelling
            </h2>
            <p className="mt-6 text-lg text-warm-600 dark:text-white/70">
              Our foundation believes every community has stories worth telling. We
              invest in people, platforms, and programs that turn those stories into
              action.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="primary" size="lg" glow>
                Donate Now
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {initiatives.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="rounded-3xl glass p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary dark:bg-secondary/20">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-warm-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-warm-600 dark:text-white/60">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Impact Metrics Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16"
        >
          <div className="mb-6 text-center">
            <h3 className="font-display text-2xl font-bold text-warm-900 dark:text-white">
              Creators & Communities Supported
            </h3>
            <p className="mt-2 text-warm-600 dark:text-white/60">
              Year-over-year impact of WATALII Foundation programs
            </p>
          </div>
          <ImpactChart />
        </motion.div>
      </div>
    </section>
  );
}
