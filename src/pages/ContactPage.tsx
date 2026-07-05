import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Users,
  Mic,
} from "lucide-react";
import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { Button } from "../components/ui/button";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const faqs = [
  {
    q: "How can I be a guest on the show?",
    a: "We welcome storytellers, creators, and change-makers. Send us a pitch via the form with your topic and background.",
  },
  {
    q: "Do you offer brand partnerships?",
    a: "Yes. We collaborate with brands that align with our values. Email partnerships@watalii.com for media kits.",
  },
  {
    q: "Can I submit a story or topic?",
    a: "Absolutely. Use the contact form and select “Story Pitch”. Our editorial team reviews every submission.",
  },
  {
    q: "Where can I listen to episodes?",
    a: "All episodes are available on YouTube, Spotify, Apple Podcasts, and our website.",
  },
];

export function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // =====================================================
      // EMAILJS CONFIGURATION
      // =====================================================
      // 1. Go to https://www.emailjs.com and create an account
      // 2. Create a Gmail service connected to wataliipodcast01@gmail.com
      // 3. Create TWO templates:
      //    - One for the team (wataliipodcast01@gmail.com)
      //    - One for auto-reply to the sender
      // =====================================================

     const SERVICE_ID = "service_2ez7gok";           // ← Replace with your EmailJS Service ID
     const TEAM_TEMPLATE_ID = "template_y5gfdnh";    // ← Template that sends to wataliipodcast01@gmail.com
     const AUTOREPLY_TEMPLATE_ID = "template_gaff1qc"; // ← Auto-reply template
     const PUBLIC_KEY = "0AaKo_Q-XIUkyMkEj";            // ← Your EmailJS Public Key

      // 1. Send message to WATALII team
      await emailjs.send(
        SERVICE_ID,
        TEAM_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: "wataliipodcast01@gmail.com",
        },
        PUBLIC_KEY
      );

      // 2. Send auto-reply confirmation to the user
      await emailjs.send(
        SERVICE_ID,
        AUTOREPLY_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        PUBLIC_KEY
      );

      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Failed to send email:", error);
      alert(
        "Something went wrong. Please try again or email us directly at wataliipodcast01@gmail.com"
      );
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSuccess(false), 4000);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
            <Users className="h-4 w-4" /> Let's Connect
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-warm-900 dark:text-white">
            Get In Touch
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-lg text-warm-600 dark:text-white/70">
            Whether you're a listener, creator, or brand — we'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl glass p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-primary/10"><Phone className="h-6 w-6 text-primary" /></div>
                <div>
                  <div className="text-sm text-warm-500 dark:text-white/50">Call Us</div>
                  <a href="tel:+254725513280" className="text-xl font-semibold text-warm-900 dark:text-white hover:text-primary transition">
                    +254 725 513280
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-primary/10"><Mail className="h-6 w-6 text-primary" /></div>
                <div>
                  <div className="text-sm text-warm-500 dark:text-white/50">Email Us</div>
                  <a href="mailto:wataliipodcast01@gmail.com" className="text-xl font-semibold text-warm-900 dark:text-white hover:text-primary transition">
                    wataliipodcast01@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary/10"><MapPin className="h-6 w-6 text-primary" /></div>
                <div>
                  <div className="text-sm text-warm-500 dark:text-white/50">Visit Us</div>
                  <div className="text-xl font-semibold text-warm-900 dark:text-white">Nairobi, Kenya</div>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="rounded-3xl glass p-8">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-semibold text-lg">Office Hours</span>
              </div>
              <div className="space-y-2 text-sm text-warm-600 dark:text-white/70">
                <div className="flex justify-between"><span>Monday – Friday</span><span>9:00 AM – 6:00 PM</span></div>
                <div className="flex justify-between"><span>Saturday</span><span>10:00 AM – 4:00 PM</span></div>
                <div className="flex justify-between"><span>Sunday</span><span>Closed</span></div>
              </div>
            </div>

            {/* Social Links */}
            <div className="rounded-3xl glass p-8">
              <div className="text-sm font-medium text-warm-500 dark:text-white/50 mb-4">Follow the Movement</div>
              <div className="flex gap-3">
                {[
                  { Icon: FaTwitter, href: "https://twitter.com/wataliipodcast", label: "Twitter" },
                  { Icon: FaInstagram, href: "https://instagram.com/wataliipodcast", label: "Instagram" },
                  { Icon: FaLinkedin, href: "https://linkedin.com/company/watalii", label: "LinkedIn" },
                  { Icon: FaYoutube, href: "https://youtube.com/@wataliipodcast", label: "YouTube" },
                ].map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                     className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/50 hover:bg-primary hover:text-white transition-all text-warm-700 dark:bg-white/10 dark:text-white">
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl glass p-10">
              <h2 className="font-display text-3xl font-bold mb-2 text-warm-900 dark:text-white">Send us a message</h2>
              <p className="text-warm-600 dark:text-white/60 mb-8">We usually respond within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-warm-700 dark:text-white/70">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-2xl border border-warm-200 bg-white/60 px-5 py-3 text-warm-900 placeholder:text-warm-400 focus:outline-none focus:border-primary dark:bg-white/5 dark:border-white/10"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-warm-700 dark:text-white/70">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-2xl border border-warm-200 bg-white/60 px-5 py-3 text-warm-900 placeholder:text-warm-400 focus:outline-none focus:border-primary dark:bg-white/5 dark:border-white/10"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-warm-700 dark:text-white/70">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-2xl border border-warm-200 bg-white/60 px-5 py-3 text-warm-900 focus:outline-none focus:border-primary dark:bg-white/5 dark:border-white/10"
                  >
                    <option value="">Select a topic</option>
                    <option value="Guest Pitch">Guest Pitch</option>
                    <option value="Brand Partnership">Brand Partnership</option>
                    <option value="Story Submission">Story Submission</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Press & Media">Press & Media</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-warm-700 dark:text-white/70">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full resize-y rounded-3xl border border-warm-200 bg-white/60 px-5 py-4 text-warm-900 placeholder:text-warm-400 focus:outline-none focus:border-primary dark:bg-white/5 dark:border-white/10"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>Send Message <Send className="h-4 w-4 ml-2" /></>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Nairobi Map Section */}
        <div className="mt-16 rounded-3xl overflow-hidden glass">
          <div className="grid md:grid-cols-5 gap-0">
            <div className="md:col-span-3 p-10">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="font-semibold text-xl">Our Studio in Nairobi</span>
              </div>
              <p className="text-warm-600 dark:text-white/70 max-w-md">
                Located in the heart of Nairobi, our studio is where the magic happens — from recording to live community events.
              </p>
              <div className="mt-8 text-sm text-warm-500 dark:text-white/50">
                Westlands, Nairobi • Kenya
              </div>
            </div>
            <div className="md:col-span-2 relative min-h-[320px] bg-[#e8e0d0] dark:bg-[#1f1912]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.816!2d36.816!3d-1.292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d8f5f5f5f5%3A0x5f5f5f5f5f5f5f5f!2sWestlands%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-primary mb-3"><Mic className="h-5 w-5" /> <span className="font-semibold">Common Questions</span></div>
            <h3 className="font-display text-4xl font-bold text-warm-900 dark:text-white">Frequently Asked</h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-2xl glass overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex justify-between items-center px-7 py-5 text-left font-medium text-warm-900 dark:text-white"
                >
                  {faq.q}
                  <span className={cn("transition-transform", activeFaq === index && "rotate-180")}>↓</span>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="px-7 pb-6 text-warm-600 dark:text-white/70">
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Success Toast */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-2xl bg-primary px-8 py-4 text-white shadow-2xl flex items-center gap-3"
            >
              <CheckCircle className="h-5 w-5" /> Message sent successfully. We'll be in touch soon.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
