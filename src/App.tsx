import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Podcasts } from "./sections/Podcasts";
import { Marketplace } from "./sections/Marketplace";
import { Foundation } from "./sections/Foundation";
import { Community } from "./sections/Community";
import { Team } from "./sections/Team";
import { Shop } from "./sections/Shop";
import { Events } from "./sections/Events";
import { Blog } from "./sections/Blog";
import { Contact } from "./sections/Contact";
import { Footer } from "./components/Footer";
import { PodcastsPage } from "./pages/PodcastsPage";
import { PodcastDetailPage } from "./pages/PodcastDetailPage";
import { TeamPage } from "./pages/TeamPage";
import { ShopPage } from "./pages/ShopPage";
import { BlogPage } from "./pages/BlogPage";
import { ContactPage } from "./pages/ContactPage";
import { MarketplacePage } from "./pages/MarketplacePage";
import { CommunityPage } from "./pages/CommunityPage";
import { FoundationPage } from "./pages/FoundationPage";
import { EventsPage } from "./pages/EventsPage";
import { AboutPage } from "./pages/AboutPage";
import { TermsPage } from "./legal/TermsPage";
import { PrivacyPage } from "./legal/PrivacyPage";
import { GalleryPage } from "./pages/GalleryPage";
import { AchievementsPage } from "./pages/AchievementsPage";
import { NotFound } from "./components/common/NotFound";
import { useTheme } from "./hooks/useTheme";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <Podcasts />
      <Marketplace />
      <Foundation />
      <Community />
      <Team />
      <Shop />
      <Events />
      <Blog />
      <Contact />
    </>
  );
}

function AppContent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/podcasts" element={<PodcastsPage />} />
          <Route path="/podcasts/:slug" element={<PodcastDetailPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/foundation" element={<FoundationPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />

          {/* 404 Catch-All - MUST BE LAST */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <AppContent />
    </HashRouter>
  );
}
