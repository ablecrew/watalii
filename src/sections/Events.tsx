import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Ticket, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { useEvents } from "../hooks/useEvents";

export function Events() {
  const { events, loading } = useEvents(3);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section id="events" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center justify-between gap-6 lg:flex-row"
        >
          <div className="max-w-2xl text-center lg:text-left">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary dark:bg-primary/20">
              <Calendar className="h-4 w-4" />
              Upcoming Events
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-warm-900 dark:text-white sm:text-4xl lg:text-5xl">
              Join Us Live
            </h2>
            <p className="mt-4 text-warm-600 dark:text-white/60">
              From summits to workshops, experience the WATALII community in person.
            </p>
          </div>
          <Button variant="outline">
            View All Events
            <ArrowRight className="h-5 w-5" />
          </Button>
        </motion.div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="group flex flex-col gap-6 overflow-hidden rounded-3xl glass p-4 sm:flex-row sm:items-center"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-2xl sm:h-32 sm:w-48">
                  <img
                    src={event.image || "https://via.placeholder.com/600"}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                    {event.category?.name || "Event"}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-warm-900 dark:text-white sm:text-2xl">
                    {event.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-warm-600 dark:text-white/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      {formatDate(event.start_date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-primary" />
                      {new Date(event.start_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-primary" />
                      {event.location}
                    </span>
                  </div>
                </div>
                <Button variant="primary" className="sm:mr-4">
                  <Ticket className="h-4 w-4" />
                  Get Tickets
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
