import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  MapPin,
  Calendar,
  Award,
  Heart,
  ArrowRight,
  X,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { cn } from "@/lib/utils";

interface Chapter {
  id: number;
  name: string;
  city: string;
  country: string;
  members: number;
  description: string;
  image: string;
  coordinator: string;
  nextEvent: string;
}

interface CommunityMember {
  id: number;
  name: string;
  role: string;
  chapter: string;
  image: string;
  quote: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  spots: number;
}

const chapters: Chapter[] = [
  {
    id: 1,
    name: "Nairobi Chapter",
    city: "Nairobi",
    country: "Kenya",
    members: 1240,
    description: "The heartbeat of WATALII. Monthly meetups, live recordings, and creative workshops.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    coordinator: "Amina Hassan",
    nextEvent: "July 18 • Podcast Live Recording",
  },
  {
    id: 2,
    name: "Lagos Chapter",
    city: "Lagos",
    country: "Nigeria",
    members: 890,
    description: "A vibrant community of storytellers, journalists, and content creators.",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    coordinator: "Chinedu Okoro",
    nextEvent: "July 22 • Youth Media Workshop",
  },
  {
    id: 3,
    name: "Accra Chapter",
    city: "Accra",
    country: "Ghana",
    members: 620,
    description: "Focused on amplifying West African voices through audio and community.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    coordinator: "Efia Boateng",
    nextEvent: "July 25 • Community Listening Party",
  },
];

const members: CommunityMember[] = [
  {
    id: 1,
    name: "Zainab Yusuf",
    role: "Podcast Host",
    chapter: "Nairobi",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    quote: "WATALII gave me the courage to tell my story.",
  },
  {
    id: 2,
    name: "Michael Adebayo",
    role: "Producer",
    chapter: "Lagos",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    quote: "The community here feels like family.",
  },
  {
    id: 3,
    name: "Nana Ama Serwaa",
    role: "Journalist",
    chapter: "Accra",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    quote: "I found my voice and my people.",
  },
];

const upcomingEvents: Event[] = [
  { id: 1, title: "Live Podcast Recording", date: "July 18", time: "6:00 PM", location: "Nairobi", type: "Live", spots: 42 },
  { id: 2, title: "Youth Media Workshop", date: "July 22", time: "10:00 AM", location: "Lagos", type: "Workshop", spots: 28 },
  { id: 3, title: "Community Listening Party", date: "July 25", time: "7:30 PM", location: "Accra", type: "Social", spots: 65 },
];

export function CommunityPage() {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [joinForm, setJoinForm] = useState({ name: "", email: "", city: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);
    setIsSuccess(true);
    setJoinForm({ name: "", email: "", city: "" });
    setTimeout(() => setIsSuccess(false), 2500);
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
            <Users className="h-4 w-4" /> WATALII Community
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-warm-900 dark:text-white">
            A Movement of Voices
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-warm-600 dark:text-white/70">
            Join thousands of storytellers, creators, and changemakers across Africa and the diaspora.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { number: "2,750+", label: "Community Members" },
            { number: "12", label: "Active Chapters" },
            { number: "48", label: "Events This Year" },
            { number: "4.9", label: "Average Rating" },
          ].map((stat, i) => (
            <div key={i} className="rounded-3xl glass p-8 text-center">
              <div className="font-display text-4xl font-bold text-primary">{stat.number}</div>
              <div className="mt-2 text-sm text-warm-600 dark:text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Chapters */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs tracking-[2px] text-primary font-medium">CHAPTERS</div>
              <h2 className="font-display text-4xl font-bold text-warm-900 dark:text-white">Find Your People</h2>
            </div>
            <Button variant="secondary" size="sm" onClick={() => window.scrollTo({ top: 1200, behavior: "smooth" })}>
              Join a Chapter
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedChapter(chapter)}
                className="group overflow-hidden rounded-3xl glass cursor-pointer"
              >
                <div className="relative h-48">
                  <img src={chapter.image} alt={chapter.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-5 left-5 text-white">
                    <div className="text-sm opacity-80">{chapter.country}</div>
                    <div className="font-display text-3xl font-bold">{chapter.city}</div>
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Users className="h-4 w-4" /> <span className="font-semibold">{chapter.members}</span>
                    </div>
                    <div className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">Active</div>
                  </div>
                  <p className="text-warm-600 dark:text-white/70 text-sm line-clamp-2">{chapter.description}</p>
                  <div className="mt-6 text-xs text-warm-500 dark:text-white/60 flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" /> {chapter.nextEvent}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured Members */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[2px] text-primary font-medium">COMMUNITY VOICES</div>
            <h2 className="font-display text-4xl font-bold text-warm-900 dark:text-white mt-2">Meet Our Members</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <div key={index} className="rounded-3xl glass p-8 text-center">
                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-primary/20" />
                <div className="mt-6">
                  <div className="font-display text-2xl font-bold text-warm-900 dark:text-white">{member.name}</div>
                  <div className="text-primary text-sm font-medium mt-1">{member.role} • {member.chapter}</div>
                  <p className="mt-5 text-warm-600 dark:text-white/80 italic">“{member.quote}”</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-20">
          <h2 className="font-display text-4xl font-bold text-warm-900 dark:text-white mb-8 text-center">Upcoming Events</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="rounded-3xl glass p-8">
                <div className="text-primary text-sm font-semibold tracking-wider">{event.type.toUpperCase()}</div>
                <h3 className="font-display text-2xl font-bold mt-2 text-warm-900 dark:text-white">{event.title}</h3>
                <div className="mt-6 space-y-3 text-sm text-warm-600 dark:text-white/70">
                  <div className="flex items-center gap-3"><Calendar className="h-4 w-4" /> {event.date} • {event.time}</div>
                  <div className="flex items-center gap-3"><MapPin className="h-4 w-4" /> {event.location}</div>
                  <div className="flex items-center gap-3"><Users className="h-4 w-4" /> {event.spots} spots left</div>
                </div>
                <Button className="mt-8 w-full" variant="primary">Reserve Your Spot</Button>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div className="rounded-3xl bg-gradient-to-br from-primary to-secondary p-12 text-center text-white">
          <Award className="mx-auto h-12 w-12 text-white/80 mb-4" />
          <h2 className="font-display text-4xl font-bold">Ready to belong?</h2>
          <p className="mt-3 max-w-md mx-auto text-white/80">Become part of a growing movement of African storytellers and changemakers.</p>

          <form onSubmit={handleJoinSubmit} className="mt-10 max-w-md mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Full name"
                value={joinForm.name}
                onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                required
                className="rounded-2xl bg-white/10 px-5 py-4 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20"
              />
              <input
                type="email"
                placeholder="Email address"
                value={joinForm.email}
                onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                required
                className="rounded-2xl bg-white/10 px-5 py-4 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20"
              />
            </div>
            <input
              type="text"
              placeholder="City / Chapter"
              value={joinForm.city}
              onChange={(e) => setJoinForm({ ...joinForm, city: e.target.value })}
              required
              className="w-full mb-6 rounded-2xl bg-white/10 px-5 py-4 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20"
            />
            <Button type="submit" size="lg" className="w-full bg-white text-primary hover:bg-white/90" disabled={isSubmitting}>
              {isSubmitting ? "Joining..." : "Join the Community"}
            </Button>
          </form>
        </div>
      </div>

      {/* Chapter Detail Modal */}
      <AnimatePresence>
        {selectedChapter && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 30 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white dark:bg-warm-900"
            >
              <button onClick={() => setSelectedChapter(null)} className="absolute right-6 top-6 z-10 rounded-full bg-black/70 p-3 text-white hover:bg-black">
                <X className="h-5 w-5" />
              </button>

              <img src={selectedChapter.image} alt={selectedChapter.name} className="w-full h-64 object-cover" />

              <div className="p-10">
                <div className="text-primary text-sm font-semibold tracking-widest">{selectedChapter.country}</div>
                <h2 className="font-display text-4xl font-bold text-warm-900 dark:text-white mt-1">{selectedChapter.name}</h2>

                <div className="flex items-center gap-4 mt-4 text-sm text-warm-500 dark:text-white/60">
                  <div className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {selectedChapter.members} members</div>
                  <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {selectedChapter.city}</div>
                </div>

                <p className="mt-6 text-lg text-warm-700 dark:text-white/80">{selectedChapter.description}</p>

                <div className="mt-8 pt-8 border-t border-warm-200 dark:border-white/10">
                  <div className="text-sm font-semibold text-warm-900 dark:text-white mb-2">Chapter Coordinator</div>
                  <div className="font-display text-2xl font-bold">{selectedChapter.coordinator}</div>
                </div>

                <Button className="mt-8 w-full" size="lg" onClick={() => setSelectedChapter(null)}>
                  Join This Chapter <ArrowRight className="h-4 w-4 ml-2" />
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
            Welcome to the family! Check your email for next steps.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
