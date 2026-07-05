import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Users,
  Globe,
  Award,
  Heart,
  Mic,
  ArrowRight,
} from "lucide-react";
import { Button } from "../components/ui/button";

const stats = [
  { icon: Mic, number: "25+", label: "Episodes Produced" },
  { icon: Users, number: "10K+", label: "Monthly Listeners" },
  { icon: Globe, number: "9", label: "Countries Reached" },
  { icon: Award, number: "4.9", label: "Average Rating" },
];

const values = [
  {
    icon: Heart,
    title: "Authenticity",
    description: "We believe real stories, told honestly, have the power to connect and transform.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Our strength lies in the voices we amplify and the community we build together.",
  },
  {
    icon: Globe,
    title: "Impact",
    description: "We create content that sparks conversations, challenges perspectives, and drives change.",
  },
];

const timeline = [
  { year: "2023", event: "WATALII was born in Nairobi with a simple mission: give young Africans a platform to tell their stories." },
  { year: "2024", event: "Launched our first live show, expanded to 3 countries, and reached 20,000 monthly listeners." },
  { year: "2025", event: "Introduced the WATALII Fellowship and grew our team to 12 passionate storytellers." },
  { year: "2026", event: "Now reaching over10,000 listeners monthly across 18 countries with 85+ episodes." },
];

export function AboutPage() {
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
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
            <Calendar className="h-4 w-4" /> Est. 2023
          </div>
          <h1 className="font-heading text-6xl md:text-7xl font-bold tracking-tight text-warm-900 dark:text-white">
            The Story Behind<br />WATALII
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-warm-600 dark:text-white/70">
            Born in Nairobi in 2023, WATALII is a youth-led media platform amplifying African stories through powerful audio and community.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="rounded-3xl glass p-8 text-center">
              <stat.icon className="h-8 w-8 mx-auto text-primary mb-4" />
              <div className="font-display text-4xl font-bold text-warm-900 dark:text-white">{stat.number}</div>
              <div className="mt-2 text-sm text-warm-600 dark:text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Our Story */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[2px] text-primary font-medium">OUR BEGINNING</div>
            <h2 className="font-display text-4xl font-bold text-warm-900 dark:text-white mt-3">It Started With a Microphone</h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-warm-700 dark:text-white/80 text-center">
            In early 2023, a small group of young storytellers in Nairobi came together with one belief:
            African youth have powerful stories that deserve to be heard. What began as late-night recordings
            in a living room quickly grew into a movement. Today, WATALII stands as one of East Africa’s
            fastest-growing youth media platforms.
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[2px] text-primary font-medium">WHAT DRIVES US</div>
            <h2 className="font-display text-4xl font-bold text-warm-900 dark:text-white mt-3">Our Core Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={index} className="rounded-3xl glass p-9 text-center">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold text-warm-900 dark:text-white mb-4">{value.title}</h3>
                <p className="text-warm-600 dark:text-white/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[2px] text-primary font-medium">OUR JOURNEY</div>
            <h2 className="font-display text-4xl font-bold text-warm-900 dark:text-white mt-3">From 2023 to Now</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="w-20 flex-shrink-0 text-right">
                  <div className="font-display text-2xl font-bold text-primary">{item.year}</div>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-warm-700 dark:text-white/80 text-lg leading-relaxed">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-gradient-to-br from-primary to-secondary p-14 text-center text-white">
          <h2 className="font-display text-4xl font-bold">Be Part of the Story</h2>
          <p className="mt-4 max-w-md mx-auto text-white/80">Whether you're a listener, creator, or partner — there’s a place for you in the WATALII family.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/community">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Join the Community
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="ghost" className="border border-white/40 text-white hover:bg-white/10">
                Get In Touch <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
