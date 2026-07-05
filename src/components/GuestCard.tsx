import { motion } from "framer-motion";
import { AtSign, LinkIcon, Camera } from "lucide-react";
import type { PodcastGuest } from "../lib/supabase";

interface GuestCardProps {
  guest: PodcastGuest;
  index: number;
}

export function GuestCard({ guest, index }: GuestCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-start gap-4 rounded-2xl glass p-4"
    >
      <img
        src={guest.image || "https://via.placeholder.com/120"}
        alt={guest.name}
        className="h-16 w-16 rounded-xl object-cover"
      />
      <div className="flex-1">
        <h4 className="font-display font-bold text-warm-900 dark:text-white">
          {guest.name}
        </h4>
        {guest.role && (
          <p className="text-sm text-primary">{guest.role}</p>
        )}
        {guest.bio && (
          <p className="mt-1 text-sm text-warm-600 dark:text-white/60 line-clamp-2">
            {guest.bio}
          </p>
        )}
        <div className="mt-2 flex gap-2">
          <button className="rounded-full bg-white/10 p-1.5 text-warm-600 transition-colors hover:bg-primary hover:text-white dark:text-white/60">
            <AtSign className="h-3.5 w-3.5" />
          </button>
          <button className="rounded-full bg-white/10 p-1.5 text-warm-600 transition-colors hover:bg-primary hover:text-white dark:text-white/60">
            <LinkIcon className="h-3.5 w-3.5" />
          </button>
          <button className="rounded-full bg-white/10 p-1.5 text-warm-600 transition-colors hover:bg-primary hover:text-white dark:text-white/60">
            <Camera className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
