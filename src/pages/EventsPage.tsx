import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  X,
  CheckCircle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { cn } from "@/lib/utils";

interface Event {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  attendees: number;
  capacity: number;
  price: string;
  status: "upcoming" | "sold-out" | "past";
}

const events: Event[] = [
  {
    id: 1,
    title: "WATALII Live: Youth & Politics",
    type: "Live Recording",
    date: "July 18, 2026",
    time: "6:00 PM – 9:00 PM",
    location: "Goethe Institut, Nairobi",
    description: "A powerful live conversation with young political voices shaping Kenya’s future.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    attendees: 187,
    capacity: 250,
    price: "KES 1,500",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Podcast Production Masterclass",
    type: "Workshop",
    date: "July 22, 2026",
    time: "10:00 AM – 4:00 PM",
    location: "iHub, Nairobi",
    description: "Learn professional audio production, editing, and storytelling from industry experts.",
    image: "https://images.unsplash.com/photo-1590602847007-6f5f4235c2f3?w=800&q=80",
    attendees: 42,
    capacity: 50,
    price: "KES 4,500",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Community Listening Party – Season 4",
    type: "Social",
    date: "July 25, 2026",
    time: "7:30 PM – 11:00 PM",
    location: "The Alchemist, Westlands",
    description: "An intimate evening listening to highlights from Season 4 with the team and community.",
    image: "https://images.unsplash.com/photo-1514525253161-7a3b7d1fedc6?w=800&q=80",
    attendees: 118,
    capacity: 150,
    price: "Free",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Women in Media Summit",
    type: "Conference",
    date: "August 2, 2026",
    time: "9:00 AM – 5:00 PM",
    location: "Sarit Centre, Nairobi",
    description: "A full-day summit celebrating and empowering women in African media and storytelling.",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80",
    attendees: 312,
    capacity: 400,
    price: "KES 7,500",
    status: "upcoming",
  },
];

const filters = ["All", "Live Recording", "Workshop", "Social", "Conference"];

export function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registrationForm, setRegistrationForm] = useState({ name: "", email: "", tickets: 1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const filteredEvents = events.filter(
    (event) => activeFilter === "All" || event.type === activeFilter
  );

  const upcomingEvents = filteredEvents.filter((e) => e.status === "upcoming");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setRegistrationForm({ name: "", email: "", tickets: 1 });
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedEvent(null);
    }, 2200);
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
            <Calendar className="h-4 w-4" /> WATALII Events
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-warm-900 dark:text-white">
            Experience the Movement
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-warm-600 dark:text-white/70">
            Live shows, workshops, and community gatherings that bring our stories to life.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-full px-6 py-2 text-sm font-medium transition-all",
                activeFilter === filter
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white/60 text-warm-700 hover:bg-white dark:bg-white/5 dark:text-white/70"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedEvent(event)}
              className="group overflow-hidden rounded-3xl glass cursor-pointer flex flex-col"
            >
              <div className="relative h-56">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-medium">
                  {event.type}
                </div>
                <div className="absolute bottom-4 right-4 px-4 py-1 rounded-full bg-white/90 text-black text-sm font-semibold">
                  {event.price}
                </div>
              </div>
              <div className="p-7 flex-1 flex flex-col">
                <h3 className="font-display text-2xl font-bold text-warm-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <div className="space-y-2 text-sm text-warm-600 dark:text-white/70 flex-1">
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {event.date}</div>
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {event.time}</div>
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {event.location}</div>
                </div>
                <div className="mt-6 pt-6 border-t border-warm-200 dark:border-white/10 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-primary"><Users className="h-4 w-4" /> {event.attendees} attending</div>
                  <div className="text-warm-500 dark:text-white/60">{event.capacity - event.attendees} spots left</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {upcomingEvents.length === 0 && (
          <div className="text-center py-20 text-warm-500">No events found in this category.</div>
        )}

        {/* Past Events CTA */}
        <div className="mt-20 rounded-3xl glass p-12 text-center">
          <h3 className="font-display text-3xl font-bold text-warm-900 dark:text-white">Missed an event?</h3>
          <p className="mt-3 text-warm-600 dark:text-white/70 max-w-md mx-auto">Watch recordings of past live shows and workshops on our YouTube channel.</p>
          <Button className="mt-8" variant="secondary" size="lg">
            Watch Past Events <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 30 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white dark:bg-warm-900 max-h-[92vh] overflow-y-auto"
            >
              <button onClick={() => setSelectedEvent(null)} className="absolute right-6 top-6 z-10 rounded-full bg-black/70 p-3 text-white hover:bg-black">
                <X className="h-5 w-5" />
              </button>

              <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-80 object-cover" />

              <div className="p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">{selectedEvent.type}</span>
                  <span className="text-sm text-warm-500 dark:text-white/60">{selectedEvent.price}</span>
                </div>

                <h2 className="font-display text-4xl font-bold text-warm-900 dark:text-white mb-4">{selectedEvent.title}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-8">
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> {selectedEvent.date}</div>
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {selectedEvent.time}</div>
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {selectedEvent.location}</div>
                </div>

                <p className="text-lg text-warm-700 dark:text-white/80 mb-10">{selectedEvent.description}</p>

                <div className="mb-8 flex items-center gap-3 text-sm text-warm-600 dark:text-white/70">
                  <Users className="h-5 w-5 text-primary" /> {selectedEvent.attendees} people attending • {selectedEvent.capacity - selectedEvent.attendees} spots remaining
                </div>

                {/* Registration Form */}
                <div className="rounded-2xl glass p-8">
                  <h4 className="font-semibold text-xl mb-6 text-warm-900 dark:text-white">Reserve Your Spot</h4>
                  <form onSubmit={handleRegister} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <input
                        type="text"
                        placeholder="Full name"
                        value={registrationForm.name}
                        onChange={(e) => setRegistrationForm({ ...registrationForm, name: e.target.value })}
                        required
                        className="rounded-2xl border border-warm-200 bg-white/60 px-5 py-3 text-warm-900 focus:outline-none focus:border-primary dark:bg-white/5 dark:border-white/10"
                      />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={registrationForm.email}
                        onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                        required
                        className="rounded-2xl border border-warm-200 bg-white/60 px-5 py-3 text-warm-900 focus:outline-none focus:border-primary dark:bg-white/5 dark:border-white/10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-warm-700 dark:text-white/70">Number of Tickets</label>
                      <select
                        value={registrationForm.tickets}
                        onChange={(e) => setRegistrationForm({ ...registrationForm, tickets: parseInt(e.target.value) })}
                        className="rounded-2xl border border-warm-200 bg-white/60 px-5 py-3 text-warm-900 focus:outline-none focus:border-primary dark:bg-white/5 dark:border-white/10"
                      >
                        {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Processing..." : `Register Now — ${selectedEvent.price}`}
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
            <CheckCircle className="h-5 w-5" /> Registration successful! Check your email for confirmation.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
