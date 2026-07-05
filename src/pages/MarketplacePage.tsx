import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  X,
  Star,
  MapPin,
  Clock,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { cn } from "@/lib/utils";

interface MarketplaceListing {
  id: number;
  title: string;
  category: string;
  description: string;
  price: string;
  duration: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  provider: string;
  featured?: boolean;
}

const listings: MarketplaceListing[] = [
  {
    id: 1,
    title: "Professional Podcast Editing",
    category: "Audio Production",
    description: "Clean, broadcast-quality editing with noise reduction, music integration, and mastering.",
    price: "KES 8,500",
    duration: "Per episode",
    location: "Remote",
    rating: 4.9,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1590602847007-6f5f4235c2f3?w=800&q=80",
    provider: "SoundForge Studios",
    featured: true,
  },
  {
    id: 2,
    title: "Voice Over Artist – English & Swahili",
    category: "Voice Over",
    description: "Warm, professional voice for commercials, podcasts, e-learning, and brand storytelling.",
    price: "KES 12,000",
    duration: "Per project",
    location: "Nairobi",
    rating: 4.8,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
    provider: "Amina Voice",
  },
  {
    id: 3,
    title: "Live Event Production & Streaming",
    category: "Live Production",
    description: "Full live production setup including cameras, lighting, streaming, and on-site audio.",
    price: "KES 45,000",
    duration: "Per event",
    location: "Nationwide",
    rating: 5.0,
    reviews: 29,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    provider: "Lumina Productions",
    featured: true,
  },
  {
    id: 4,
    title: "Podcast Strategy & Show Development",
    category: "Consulting",
    description: "One-on-one sessions to help you launch or scale your podcast with the right strategy.",
    price: "KES 15,000",
    duration: "2-hour session",
    location: "Remote",
    rating: 4.7,
    reviews: 41,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    provider: "WATALII Academy",
  },
  {
    id: 5,
    title: "Social Media Content Creation",
    category: "Content Creation",
    description: "Monthly content packages for Instagram, TikTok, and YouTube tailored for creators.",
    price: "KES 25,000",
    duration: "Per month",
    location: "Nairobi",
    rating: 4.6,
    reviews: 53,
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    provider: "Vibe House",
  },
  {
    id: 6,
    title: "Audio Branding & Custom Music",
    category: "Audio Production",
    description: "Signature sound design, intro/outro themes, and original music for your show.",
    price: "KES 35,000",
    duration: "Per package",
    location: "Remote",
    rating: 4.9,
    reviews: 37,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d1795bf?w=800&q=80",
    provider: "Echo Collective",
  },
];

const categories = ["All", "Audio Production", "Voice Over", "Live Production", "Consulting", "Content Creation"];

export function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const filteredListings = listings.filter((listing) => {
    const matchesCategory = activeCategory === "All" || listing.category === activeCategory;
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.provider.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredListings = filteredListings.filter((l) => l.featured);
  const regularListings = filteredListings.filter((l) => !l.featured);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);
    setIsSuccess(true);
    setContactForm({ name: "", email: "", message: "" });
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedListing(null);
    }, 1800);
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
            <Users className="h-4 w-4" /> WATALII Marketplace
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-warm-900 dark:text-white">
            Creative Talent Marketplace
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-warm-600 dark:text-white/70">
            Connect with Kenya’s best creators, producers, and storytellers.
          </p>
        </div>

        {/* Trust Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Award, label: "Verified Creators" },
            { icon: Clock, label: "Fast Turnaround" },
            { icon: Users, label: "2,400+ Projects" },
            { icon: Star, label: "4.8 Average Rating" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 rounded-2xl glass p-5">
              <div className="rounded-full bg-primary/10 p-3"><item.icon className="h-5 w-5 text-primary" /></div>
              <div className="font-semibold text-warm-900 dark:text-white">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-4 text-warm-400" />
            <input
              type="text"
              placeholder="Search services or creators..."
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

        {/* Featured Listings */}
        {featuredListings.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs tracking-[2px] text-primary font-medium">FEATURED</div>
                <h3 className="font-display text-3xl font-bold text-warm-900 dark:text-white">Top Picks</h3>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredListings.map((listing) => (
                <div
                  key={listing.id}
                  onClick={() => setSelectedListing(listing)}
                  className="group relative overflow-hidden rounded-3xl cursor-pointer h-[340px] flex items-end"
                >
                  <img src={listing.image} alt={listing.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                  <div className="relative p-8 text-white">
                    <div className="text-xs tracking-widest bg-white/20 px-3 py-1 rounded-full inline-block mb-3">{listing.category}</div>
                    <h3 className="font-display text-3xl font-bold leading-tight mb-2">{listing.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-white/80">
                      <span>{listing.provider}</span>
                      <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-current" /> {listing.rating}</span>
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 bg-white/90 text-black px-4 py-1 rounded-full text-sm font-semibold">
                    {listing.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Listings */}
        <div className="mb-8">
          <h3 className="font-display text-3xl font-bold text-warm-900 dark:text-white mb-8">Browse All Services</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => setSelectedListing(listing)}
                className="group overflow-hidden rounded-3xl glass cursor-pointer flex flex-col"
              >
                <div className="relative h-52">
                  <img src={listing.image} alt={listing.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-medium">
                    {listing.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className="font-display text-xl font-bold text-warm-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {listing.title}
                  </h4>
                  <p className="text-warm-600 dark:text-white/70 text-sm line-clamp-2 flex-1">{listing.description}</p>

                  <div className="mt-6 pt-6 border-t border-warm-200 dark:border-white/10 flex items-center justify-between text-sm">
                    <div className="font-semibold text-primary">{listing.price}</div>
                    <div className="flex items-center gap-1 text-warm-500 dark:text-white/60">
                      <Star className="h-4 w-4 fill-current text-primary" /> {listing.rating} ({listing.reviews})
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-3xl bg-gradient-to-br from-primary to-secondary p-12 text-center text-white">
          <h3 className="font-display text-3xl font-bold">Want to offer your services?</h3>
          <p className="mt-3 max-w-md mx-auto text-white/80">Join the WATALII Marketplace and connect with thousands of creators across Africa.</p>
          <Button className="mt-8 bg-white text-primary hover:bg-white/90" size="lg">
            Apply as a Creator <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedListing && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 30 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white dark:bg-warm-900 max-h-[92vh] overflow-y-auto"
            >
              <button onClick={() => setSelectedListing(null)} className="absolute right-6 top-6 z-10 rounded-full bg-black/70 p-3 text-white hover:bg-black">
                <X className="h-5 w-5" />
              </button>

              <img src={selectedListing.image} alt={selectedListing.title} className="w-full h-72 object-cover" />

              <div className="p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">{selectedListing.category}</span>
                  <span className="text-sm text-warm-500 dark:text-white/60 flex items-center gap-1"><MapPin className="h-4 w-4" /> {selectedListing.location}</span>
                </div>

                <h2 className="font-display text-4xl font-bold text-warm-900 dark:text-white mb-4">{selectedListing.title}</h2>
                <div className="flex items-center gap-6 text-sm mb-8">
                  <div className="font-semibold text-primary text-2xl">{selectedListing.price}</div>
                  <div className="text-warm-500 dark:text-white/60">• {selectedListing.duration}</div>
                  <div className="flex items-center gap-1 text-warm-500 dark:text-white/60">
                    <Star className="h-4 w-4 fill-current text-primary" /> {selectedListing.rating} ({selectedListing.reviews} reviews)
                  </div>
                </div>

                <p className="text-lg text-warm-700 dark:text-white/80 leading-relaxed mb-10">{selectedListing.description}</p>

                <div className="mb-8">
                  <div className="text-sm font-semibold mb-3 text-warm-900 dark:text-white">Provided by</div>
                  <div className="font-display text-2xl font-bold text-warm-900 dark:text-white">{selectedListing.provider}</div>
                </div>

                {/* Contact Form */}
                <div className="rounded-2xl glass p-8">
                  <h4 className="font-semibold text-xl mb-6 text-warm-900 dark:text-white">Interested? Send a message</h4>
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                        className="rounded-2xl border border-warm-200 bg-white/60 px-5 py-3 text-warm-900 focus:outline-none focus:border-primary dark:bg-white/5 dark:border-white/10"
                      />
                      <input
                        type="email"
                        placeholder="Your email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                        className="rounded-2xl border border-warm-200 bg-white/60 px-5 py-3 text-warm-900 focus:outline-none focus:border-primary dark:bg-white/5 dark:border-white/10"
                      />
                    </div>
                    <textarea
                      placeholder="Tell us about your project..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                      rows={4}
                      className="w-full rounded-2xl border border-warm-200 bg-white/60 px-5 py-4 text-warm-900 focus:outline-none focus:border-primary dark:bg-white/5 dark:border-white/10"
                    />
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Inquiry"}
                    </Button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-2xl bg-primary px-8 py-4 text-white shadow-2xl flex items-center gap-3"
          >
            Inquiry sent successfully! They’ll get back to you soon.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
