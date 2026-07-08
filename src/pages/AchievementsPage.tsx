import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Award, Calendar } from "lucide-react";
import { fetchAchievements, type Achievement } from "../lib/supabase";

export function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const loadAchievements = async () => {
      const data = await fetchAchievements();
      setAchievements(data);
    };
    loadAchievements();
  }, []);

  return (
    <div className="min-h-screen pb-24 pt-24 bg-[#f8f4eb] dark:bg-[#1a1209]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-warm-600 hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
            <Award className="h-4 w-4" /> Our Journey
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-warm-900 dark:text-white">
            Achievements & Milestones
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-warm-600 dark:text-white/70">
            Celebrating the moments that define who we are.
          </p>
        </div>

        <div className="space-y-12">
          {achievements.length > 0 ? (
            achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl bg-white dark:bg-[#1a1209] border border-warm-200 dark:border-white/10 shadow-xl"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className="w-full h-full object-cover aspect-[16/10] md:aspect-auto transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 text-white text-sm font-medium">
                        <Calendar className="h-4 w-4" /> {achievement.year}
                      </span>
                    </div>
                  </div>

                  <div className="p-10 flex flex-col justify-center">
                    <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 w-fit">
                      {achievement.type}
                    </div>
                    <h3 className="font-display text-3xl font-bold text-warm-900 dark:text-white mb-4">
                      {achievement.title}
                    </h3>
                    <p className="text-lg text-warm-600 dark:text-white/80 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 text-warm-500">
              No achievements found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
