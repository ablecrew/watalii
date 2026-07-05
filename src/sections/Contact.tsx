import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary dark:bg-primary/20">
              <Mail className="h-4 w-4" />
              Get in Touch
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-warm-900 dark:text-white sm:text-4xl lg:text-5xl">
              Let's Create Something Meaningful
            </h2>
            <p className="mt-6 text-lg text-warm-600 dark:text-white/70">
              Whether you want to collaborate, sponsor, or share your story, we'd
              love to hear from you.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4 rounded-2xl glass p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-warm-500 dark:text-white/50">Email</p>
                  <p className="font-medium text-warm-900 dark:text-white">wataliipodcast01@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl glass p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-warm-500 dark:text-white/50">Phone</p>
                  <p className="font-medium text-warm-900 dark:text-white">+254 725 513280</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl glass p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-warm-500 dark:text-white/50">Location</p>
                  <p className="font-medium text-warm-900 dark:text-white">Nairobi, Kenya</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl glass p-6 sm:p-8"
          >
            {submitted ? (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Send className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-warm-900 dark:text-white">
                  Message Sent!
                </h3>
                <p className="mt-2 text-warm-600 dark:text-white/60">
                  We'll get back to you within 24 hours.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-warm-700 dark:text-white/80">
                      First Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded-xl border border-warm-200 bg-white/50 px-4 py-3 text-warm-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-warm-700 dark:text-white/80">
                      Last Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full rounded-xl border border-warm-200 bg-white/50 px-4 py-3 text-warm-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-warm-700 dark:text-white/80">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full rounded-xl border border-warm-200 bg-white/50 px-4 py-3 text-warm-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-warm-700 dark:text-white/80">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full rounded-xl border border-warm-200 bg-white/50 px-4 py-3 text-warm-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    placeholder="Tell us about your project or question..."
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                  glow
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
