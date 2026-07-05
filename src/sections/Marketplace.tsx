import { motion } from "framer-motion";
import { ShoppingBag, Star, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useProducts } from "../hooks/useProducts";

export function Marketplace() {
  const { products, loading } = useProducts(3);

  return (
    <section id="marketplace" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center justify-between gap-6 lg:flex-row"
        >
          <div className="max-w-2xl text-center lg:text-left">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary dark:bg-primary/20">
              <ShoppingBag className="h-4 w-4" />
              Marketplace
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-warm-900 dark:text-white sm:text-4xl lg:text-5xl">
              Support Creators, Shop Purpose
            </h2>
            <p className="mt-4 text-warm-600 dark:text-white/60">
              Every purchase directly supports independent creators and community
              programs across the continent.
            </p>
          </div>
          <Button variant="primary" glow>
            Visit Marketplace
            <ArrowRight className="h-5 w-5" />
          </Button>
        </motion.div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-3xl glass"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.cover_image || "https://via.placeholder.com/600"}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                    {product.category?.name || "Product"}
                  </span>
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center gap-1 text-sm text-primary">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-semibold">4.9</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-warm-900 dark:text-white">
                    {product.title}
                  </h3>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-heading text-2xl font-bold text-primary">
                      KES{product.price}
                    </span>
                    <Button variant="secondary" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
