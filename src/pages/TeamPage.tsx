import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Users, Globe, Loader2 } from "lucide-react";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Button } from "../components/ui/Button";
import { useTeam } from "../hooks/useTeam";
import { cn } from "@/lib/utils";
import type { TeamMember } from "../lib/supabase";

const frameStyles = [
  { className: "clip-hexagon", glow: "shadow-[0_0_50px_rgba(201,106,43,0.7)]", border: "bg-gradient-to-br from-primary to-secondary" },
  { className: "rounded-full", glow: "shadow-[0_0_60px_rgba(232,192,143,0.8)]", border: "bg-gradient-to-br from-warm-200 to-primary" },
  { className: "rotate-45 rounded-2xl", glow: "shadow-[0_0_55px_rgba(182,58,50,0.7)]", border: "bg-gradient-to-br from-secondary to-primary" },
  { className: "rounded-[2rem]", glow: "shadow-[0_0_50px_rgba(201,106,43,0.6)]", border: "bg-gradient-to-tr from-primary via-warm-300 to-secondary" },
  { className: "rounded-3xl", glow: "shadow-[0_0_45px_rgba(232,192,143,0.7)]", border: "bg-gradient-to-bl from-warm-200 via-primary to-secondary" },
  { className: "organic-shape", glow: "shadow-[0_0_55px_rgba(182,58,50,0.6)]", border: "bg-gradient-to-br from-secondary to-warm-200" },
  { className: "arch-shape", glow: "shadow-[0_0_50px_rgba(201,106,43,0.7)]", border: "bg-gradient-to-t from-primary to-warm-200" },
  { className: "rounded-full aspect-[3/4]", glow: "shadow-[0_0_60px_rgba(232,192,143,0.8)]", border: "bg-gradient-to-b from-warm-200 to-primary" },
  { className: "rotate-3 rounded-2xl", glow: "shadow-[0_0_50px_rgba(201,106,43,0.6)]", border: "bg-gradient-to-br from-primary to-secondary" },
  { className: "bubble-shape", glow: "shadow-[0_0_55px_rgba(182,58,50,0.7)]", border: "bg-gradient-to-tr from-secondary to-primary" },
];

export function TeamPage() {
  const { team, loading } = useTeam();

  return (
    <div className="min-h-screen pb-24 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-white/50 px-4 py-2 text-sm font-medium text-warm-800 transition-colors hover:bg-white/70 dark:bg-white/10 dark:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary dark:bg-primary/20">
            <Users className="h-4 w-4" />
            Our Team
          </span>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-warm-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Meet the Voices
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-warm-600 dark:text-white/70">
            The passionate people behind WATALII — storytellers, producers, and
            community builders creating change across Africa and the diaspora.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-24">
            {team.map((member, index) => (
              <TeamMemberRow
                key={`${member.id}-${index}`}
                member={member}
                index={index}
                reversed={index % 2 === 1}
                frameStyle={frameStyles[index % frameStyles.length]}
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-32 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-secondary p-8 text-center shadow-2xl lg:p-16"
        >
          <Globe className="mx-auto h-12 w-12 text-white/80" />
          <h2 className="mt-4 font-heading text-3xl font-bold text-white sm:text-4xl">Join Our Team</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            We're always looking for passionate storytellers, producers, and community leaders.
          </p>
          <Button className="mt-8 bg-white text-primary hover:bg-white/90" size="lg">
            <Mail className="h-5 w-5" />
            Get in Touch
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

function TeamMemberRow({
  member,
  index,
  reversed,
  frameStyle,
}: {
  member: TeamMember;
  index: number;
  reversed: boolean;
  frameStyle: (typeof frameStyles)[number];
}) {
  const isRotated = frameStyle.className.includes("rotate-");

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={cn(
        "flex flex-col items-center gap-10 lg:items-stretch",
        reversed ? "lg:flex-row-reverse" : "lg:flex-row"
      )}
    >
      <div className="flex w-full flex-col items-center justify-center lg:w-2/5">
        <div
          className={cn(
            "relative flex items-center justify-center p-2 transition-transform duration-500 hover:scale-105",
            frameStyle.border,
            frameStyle.className,
            frameStyle.glow,
            "h-80 w-80"
          )}
        >
          <div className={cn("relative h-72 w-72 overflow-hidden bg-warm-900", frameStyle.className)}>
            <img
              src={member.image || "https://via.placeholder.com/400"}
              alt={member.name}
              className={cn(
                "h-full w-full object-cover",
                isRotated ? "-rotate-45" : ""
              )}
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <h2 className="font-display text-3xl font-bold text-warm-900 dark:text-white">
            {member.name}
          </h2>
          <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-primary">
            {member.role}
          </p>
        </div>
      </div>

      <div className="flex w-full items-center lg:w-3/5">
        <div className="w-full rounded-3xl glass p-8 lg:p-10">
          <h3 className="mb-4 font-heading text-2xl font-bold text-warm-900 dark:text-white">
            About {member.name.split(" ")[0]}
          </h3>
          <p className="text-lg leading-relaxed text-warm-700 dark:text-white/80">
            {member.bio || "Bio coming soon."}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-3 rounded-xl bg-white/40 p-3 transition-colors hover:bg-white/60 dark:bg-white/5 dark:hover:bg-white/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-warm-500 dark:text-white/50">Email</p>
                  <p className="text-sm font-medium text-warm-900 dark:text-white">{member.email}</p>
                </div>
              </a>
            )}
            {member.phone && (
              <a
                href={`tel:${member.phone}`}
                className="flex items-center gap-3 rounded-xl bg-white/40 p-3 transition-colors hover:bg-white/60 dark:bg-white/5 dark:hover:bg-white/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-warm-500 dark:text-white/50">Phone</p>
                  <p className="text-sm font-medium text-warm-900 dark:text-white">{member.phone}</p>
                </div>
              </a>
            )}
          </div>

          <div className="mt-8 flex items-center gap-3">
            <span className="text-sm font-medium text-warm-600 dark:text-white/60">Connect:</span>
            <SocialButton icon={FaTwitter} href={member.social_links?.twitter} label="Twitter" />
            <SocialButton icon={FaLinkedin} href={member.social_links?.linkedin} label="LinkedIn" />
            <SocialButton icon={FaInstagram} href={member.social_links?.instagram} label="Instagram" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SocialButton({
  icon: Icon,
  href,
  label,
}: {
  icon: React.ElementType;
  href?: string;
  label: string;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:scale-110 hover:bg-primary hover:text-white dark:bg-primary/20"
      title={label}
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}