import { Mic, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  Explore: [
    { label: "Podcasts", to: "/podcasts" },
    { label: "Marketplace", to: "/marketplace" },
    { label: "Foundation", to: "/foundation" },
    { label: "Community", to: "/community" },
    { label: "Events", to: "/events" },
  ],
  Company: [
    { label: "About Us", to: "/about" },
    { label: "Team", to: "/team" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
  ],
  Support: [
    { label: "FAQ", to: "/*" },
    { label: "Partners", to: "/*" },
    { label: "Donate", to: "/foundation" },
    { label: "Volunteer", to: "/community" },
  ],
  Legal: [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Service", to: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-warm-200/50 bg-[#1a1209] py-16 text-white dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#C96A2B] to-[#B63A32] text-white">
                <Mic className="h-5 w-5" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight">WATALII</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm text-white/60 leading-relaxed">
              Empowering voices through podcasts, media production, community engagement, and social impact initiatives across Africa.
            </p>
            <div className="mt-6 text-xs text-white/40">
              Nairobi, Kenya • Est. 2023
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display text-sm font-bold tracking-wider text-white/90 mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/60 transition-colors hover:text-[#C96A2B]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} WATALII. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="h-4 w-4 text-[#B63A32]" /> for African storytellers
          </p>
        </div>
      </div>
    </footer>
  );
}
