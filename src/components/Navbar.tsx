import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Mic,
  ShoppingBag,
  Heart,
  Users,
  UserCircle,
  Store,
  Calendar,
  Newspaper,
  Mail,
  Home,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home", icon: Home, description: "Return to the beginning" },
  { label: "Podcasts", href: "/podcasts", icon: Mic, description: "Listen to inspiring stories" },
  { label: "Marketplace", href: "/marketplace", icon: ShoppingBag, description: "Support creators & shop" },
  { label: "Foundation", href: "/foundation", icon: Heart, description: "Our social impact work" },
  { label: "Community", href: "/community", icon: Users, description: "Join the movement" },
  { label: "Team", href: "/team", icon: UserCircle, description: "Meet the voices behind WATALII" },
  { label: "Shop", href: "/shop", icon: Store, description: "Merch & products" },
  { label: "Events", href: "/events", icon: Calendar, description: "Upcoming gatherings" },
  { label: "Blog", href: "/blog", icon: Newspaper, description: "Stories & updates" },
  { label: "Contact", href: "/contact", icon: Mail, description: "Get in touch" },
];

function getRouteFromHash(href: string): string {
  if (href === "#home") return "/";
  return href.replace("#", "/");
}

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navTextClass = scrolled || !isHome
    ? "text-warm-800 dark:text-white/80 dark:hover:text-white"
    : "text-white/90 hover:text-white";

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-500",
          scrolled ? "glass-light rounded-full shadow-2xl shadow-black/5" : "bg-transparent"
        )}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl shadow-lg">
            <img
              src="/images/watalii-logo.jpg"
              alt="WATALII"
              className="h-full w-full object-contain"
            />
          </div>
          <span
            className={cn(
              "font-display text-xl font-bold tracking-tight transition-colors",
              scrolled || !isHome ? "text-warm-900 dark:text-white" : "text-white"
            )}
          >
            WATALII
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          <Link
            to="/"
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-primary",
              navTextClass
            )}
          >
            Home
          </Link>
          <Link
            to="/podcasts"
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-primary",
              navTextClass
            )}
          >
            Podcasts
          </Link>

          {/* Mega Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button
              className={cn(
                "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-primary",
                navTextClass
              )}
            >
              Explore
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  megaOpen && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 top-full mt-4 w-[640px] -translate-x-1/2 rounded-3xl border border-white/20 bg-warm-100/95 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl dark:border-white/10 dark:bg-warm-900/95"
                >
                  <div className="grid grid-cols-2 gap-3">
                    {navItems.slice(2).map((item) => (
                      <Link
                        key={item.label}
                        to={getRouteFromHash(item.href)}
                        className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-primary/10"
                        onClick={() => setMegaOpen(false)}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-display font-semibold text-warm-900 dark:text-white">
                            {item.label}
                          </p>
                          <p className="text-sm text-warm-600 dark:text-white/60">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/contact"
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-primary",
              navTextClass
            )}
          >
            Contact
          </Link>
        </div>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/20",
              scrolled || !isHome
                ? "bg-white/10 text-warm-800 dark:text-white"
                : "bg-white/10 text-white"
            )}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Button variant="primary" size="sm" glow>
            Support Our Mission
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors",
              scrolled || !isHome ? "text-warm-800 dark:text-white" : "text-white"
            )}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mx-4 mt-2 overflow-hidden rounded-3xl glass-light shadow-2xl"
          >
            <div className="p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={getRouteFromHash(item.href)}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-2xl p-3 text-warm-800 transition-colors hover:bg-primary/10 dark:text-white"
                >
                  <item.icon className="h-5 w-5 text-primary" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              <div className="pt-3">
                <Button className="w-full" variant="primary" glow>
                  Support Our Mission
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
