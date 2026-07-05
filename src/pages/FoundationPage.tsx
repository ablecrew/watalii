import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Target,
  ArrowRight,
  X,
  CheckCircle,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { cn } from "@/lib/utils";

interface Program {
  id: number;
  title: string;
  description: string;
  impact: string;
  image: string;
  beneficiaries: number;
}

interface Story {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

const programs: Program[] = [
  {
    id: 1,
    title: "Youth Media Fellowship",
    description: "A 6-month immersive program training young Africans in podcasting, journalism, and digital storytelling.",
    impact: "87 young creators trained since 2023",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    beneficiaries: 87,
  },
  {
    id: 2,
    title: "Community Radio Initiative",
    description: "Equipping underserved communities with tools and training to launch their own radio and podcast platforms.",
    impact: "12 community stations launched",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
    beneficiaries: 1240,
  },
  {
    id: 3,
    title: "Mental Health Storytelling",
    description: "Creating safe spaces for honest conversations around mental health through audio and live events.",
    impact: "Over 40,000 listeners reached",
    image: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800&q=80",
    beneficiaries: 40000,
  },
];

const stories: Story[] = [
  {
    id: 1,
    name: "Faith Wanjiku",
    role: "Fellow, 2024",
    quote: "The fellowship changed my life. I went from being a listener to hosting my own show with 50,000 monthly listeners.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    id: 2,
    name: "Samuel Ochieng",
    role: "Community Radio Founder",
    quote: "With WATALII’s support, we launched the first podcast station in our village. Our stories are finally being heard.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
];

const impactStats = [
  { number: "52,300+", label: "Lives Impacted" },
  { number: "KES 18.4M", label: "Funds Raised" },
  { number: "27", label: "Programs Run" },
  { number: "94%", label: "Program Completion Rate" },
];

export function FoundationPage() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [donationAmount, setDonationAmount] = useState(2500);
  const [donationForm, setDonationForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const presetAmounts = [1000, 2500, 5000, 10000];

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1100));
    setIsSubmitting(false);
    setIsSuccess(true);
    setDonationForm({ name: "", email: "", message: "" });
    setTimeout(() => setIsSuccess(false), 3000);
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
            <Heart className="h-4 w-4" /> WATALII Foundation
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-warm-900 dark:text-white">
            Stories That Change Lives
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-warm-600 dark:text-white/70">
            We empower young Africans to tell their stories, build media platforms, and create lasting social impact.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {impactStats.map((stat, i) => (
            <div key={i} className="rounded-3xl glass p-8 text-center">
              <div className="font-display text-4xl font-bold text-primary">{stat.number}</div>
              <div className="mt-2 text-sm text-warm-600 dark:text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Programs */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs tracking-[2px] text-primary font-medium">OUR WORK</div>
              <h2 className="font-display text-4xl font-bold text-warm-900 dark:text-white">Programs & Initiatives</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedProgram(program)}
                className="group overflow-hidden rounded-3xl glass cursor-pointer flex flex-col"
              >
                <div className="relative h-56">
                  <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-medium">
                    {program.beneficiaries.toLocaleString()}+ reached
                  </div>
                </div>
                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="font-display text-2xl font-bold text-warm-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-warm-600 dark:text-white/70 text-sm flex-1">{program.description}</p>
                  <div className="mt-6 pt-6 border-t border-warm-200 dark:border-white/10 text-sm font-semibold text-primary">
                    {program.impact}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Impact Stories */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[2px] text-primary font-medium">REAL STORIES</div>
            <h2 className="font-display text-4xl font-bold text-warm-900 dark:text-white mt-2">Voices We’ve Amplified</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {stories.map((story, index) => (
              <div key={index} className="rounded-3xl glass p-10 flex flex-col md:flex-row gap-8 items-center">
                <img src={story.image} alt={story.name} className="w-28 h-28 rounded-2xl object-cover flex-shrink-0" />
                <div>
                  <p className="text-lg italic text-warm-700 dark:text-white/80">“{story.quote}”</p>
                  <div className="mt-6">
                    <div className="font-semibold text-warm-900 dark:text-white">{story.name}</div>
                    <div className="text-sm text-primary">{story.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Donate Section */}
        <div className="rounded-3xl bg-gradient-to-br from-primary to-secondary p-12 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <Target className="mx-auto h-12 w-12 text-white/80 mb-4" />
            <h2 className="font-display text-4xl font-bold">Support the Movement</h2>
            <p className="mt-3 text-white/80">Your donation helps us train the next generation of African storytellers.</p>

            <div className="flex flex-wrap justify-center gap-3 mt-8 mb-6">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setDonationAmount(amt)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-all",
                    donationAmount === amt ? "bg-white text-primary" : "bg-white/20 hover:bg-white/30"
                  )}
                >
                  KES {amt.toLocaleString()}
                </button>
              ))}
            </div>

            <form onSubmit={handleDonate} className="max-w-md mx-auto mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Full name"
                  value={donationForm.name}
                  onChange={(e) => setDonationForm({ ...donationForm, name: e.target.value })}
                  required
                  className="rounded-2xl bg-white/10 px-5 py-4 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={donationForm.email}
                  onChange={(e) => setDonationForm({ ...donationForm, email: e.target.value })}
                  required
                  className="rounded-2xl bg-white/10 px-5 py-4 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20"
                />
              </div>
              <textarea
                placeholder="Leave a message (optional)"
                value={donationForm.message}
                onChange={(e) => setDonationForm({ ...donationForm, message: e.target.value })}
                className="w-full rounded-2xl bg-white/10 px-5 py-4 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 mb-6"
                rows={3}
              />
              <Button type="submit" size="lg" className="w-full bg-white text-primary hover:bg-white/90" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : `Donate KES ${donationAmount.toLocaleString()}`}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Program Detail Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 30 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white dark:bg-warm-900"
            >
              <button onClick={() => setSelectedProgram(null)} className="absolute right-6 top-6 z-10 rounded-full bg-black/70 p-3 text-white hover:bg-black">
                <X className="h-5 w-5" />
              </button>

              <img src={selectedProgram.image} alt={selectedProgram.title} className="w-full h-72 object-cover" />

              <div className="p-10">
                <div className="text-primary text-sm font-semibold tracking-widest">FOUNDATION PROGRAM</div>
                <h2 className="font-display text-4xl font-bold text-warm-900 dark:text-white mt-2">{selectedProgram.title}</h2>

                <p className="mt-6 text-lg text-warm-700 dark:text-white/80">{selectedProgram.description}</p>

                <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-2xl glass p-5">
                    <div className="text-primary font-semibold">Impact</div>
                    <div className="text-warm-900 dark:text-white mt-1">{selectedProgram.impact}</div>
                  </div>
                  <div className="rounded-2xl glass p-5">
                    <div className="text-primary font-semibold">Beneficiaries</div>
                    <div className="text-warm-900 dark:text-white mt-1">{selectedProgram.beneficiaries.toLocaleString()}+</div>
                  </div>
                </div>

                <Button className="mt-8 w-full" size="lg" onClick={() => setSelectedProgram(null)}>
                  Support This Program <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
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
            <CheckCircle className="h-5 w-5" /> Thank you! Your donation will make a real difference.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
