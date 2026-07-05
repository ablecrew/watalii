import { motion } from "framer-motion";
import { Store, Shirt, Coffee, BookOpen, Headphones, ArrowRight, Loader2 } from "lucide-react";
import { useMerchandise } from "../hooks/useMerchandise";

const iconMap: Record<string, React.ElementType> = {
  Apparel: Shirt,
  Accessories: Coffee,
  Education: BookOpen,
  Audio: Headphones,
};

export function Shop() {
  const { items, loading } = useMerchandise(4);

  return (
    <section id="shop" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary dark:bg-primary/20">
            <Store className="h-4 w-4" />
            WATALII Shop
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-warm-900 dark:text-white sm:text-4xl lg:text-5xl">
            Wear the Story
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-warm-600 dark:text-white/60">
            Premium merchandise for creators, listeners, and changemakers.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => {
              const Icon = iconMap[item.tags?.[0] || ""] || Store;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group overflow-hidden rounded-3xl glass"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.cover_image || "https://via.placeholder.com/600"}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="p-5">
                    <div className="mb-3 flex items-center gap-2 text-primary">
                      <Icon className="h-5 w-5" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Merch</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-warm-900 dark:text-white">
                      {item.title}
                    </h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-heading text-xl font-bold text-primary">
                        KES{item.price}
                      </span>
                      <button className="rounded-full bg-primary/10 p-2 text-primary transition-colors hover:bg-primary hover:text-white dark:bg-primary/20">
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
