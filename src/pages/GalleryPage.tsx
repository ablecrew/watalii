import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, X, Camera } from "lucide-react";
import { fetchGalleryImages, type GalleryImage } from "../lib/supabase";

export function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [images, setImages] = useState<GalleryImage[]>([]);

  const categories = ["All", "Events", "Production", "Behind the Scenes"];

  useEffect(() => {
    const loadImages = async () => {
      const data = await fetchGalleryImages();
      setImages(data);
    };
    loadImages();
  }, []);

  const filteredImages = activeCategory === "All"
    ? images
    : images.filter((img: GalleryImage) => img.category === activeCategory);

  return (
    <div className="min-h-screen pb-24 pt-24 bg-[#f8f4eb] dark:bg-[#1a1209]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-warm-600 hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
            <Camera className="h-4 w-4" /> Visual Stories
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-warm-900 dark:text-white">
            WATALII Gallery
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-warm-600 dark:text-white/70">
            Moments that capture the spirit of our movement.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white/60 text-warm-700 hover:bg-white dark:bg-white/5 dark:text-white/70"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image: GalleryImage, index: number) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedImage(image)}
              className="group relative overflow-hidden rounded-3xl cursor-pointer aspect-[4/3] bg-black"
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 text-white rounded-full mb-3">
                  {image.category}
                </span>
                <p className="text-white text-lg font-semibold leading-tight">{image.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20 text-warm-500">No images found in this category.</div>
        )}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 p-4" onClick={() => setSelectedImage(null)}>
            <button onClick={() => setSelectedImage(null)} className="absolute top-6 right-6 text-white/70 hover:text-white z-10">
              <X className="h-8 w-8" />
            </button>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
              <img src={selectedImage.url} alt={selectedImage.caption} className="w-full max-h-[80vh] object-contain rounded-2xl" />
              <div className="mt-6 text-center">
                <p className="text-white text-xl font-medium">{selectedImage.caption}</p>
                <span className="text-white/60 text-sm mt-1 block">{selectedImage.category}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
