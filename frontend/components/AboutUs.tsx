'use client'

import { useState, useEffect } from "react";
import { Target, Users, Award, TrendingUp, LucideIcon } from "lucide-react";
import { getCompanyStats, CompanyStat, getSiteSettings, SiteSettings } from "@/lib/api";
import { SectionHeader } from "./SectionHeader";

// Icon mapping for stats
const iconMap: Record<string, LucideIcon> = {
  Target,
  Users,
  Award,
  TrendingUp,
};

type StatWithIcon = CompanyStat & { IconComponent: LucideIcon };

export function AboutUs() {
  const [achievements, setAchievements] = useState<StatWithIcon[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [stats, settings] = await Promise.all([
          getCompanyStats(),
          getSiteSettings()
        ]);
        // Take only the first 4 stats for the about section
        const statsWithIcons = stats.slice(0, 4).map((stat, index) => ({
          ...stat,
          // Assign icons in order: Target, Users, Award, TrendingUp
          IconComponent: [Target, Users, Award, TrendingUp][index] || Target,
        }));
        setAchievements(statsWithIcons);
        setSiteSettings(settings);
      } catch (err) {
        console.error('Failed to fetch about section data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <section id="about" className="py-20 md:py-32 bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader sectionKey="about" />

        <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
          {/* Image Placeholder */}
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-20" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-800/50 border border-white/10">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-500">Team Photo Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            {loading || !siteSettings ? (
              <div className="space-y-4">
                <div className="h-8 bg-slate-800 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-slate-800 rounded animate-pulse" />
                <div className="h-4 bg-slate-800 rounded animate-pulse" />
                <div className="h-4 bg-slate-800 rounded w-5/6 animate-pulse" />
              </div>
            ) : (
              <>
                <p className="text-lg text-slate-400 mb-6">
                  {siteSettings.company_description}
                </p>

                <p className="text-lg text-slate-400 mb-8">
                  {siteSettings.company_tagline}
                </p>
              </>
            )}

            {/* Achievements Grid */}
            <div className="grid grid-cols-2 gap-6">
              {loading ? (
                <div className="col-span-2 text-slate-400 animate-pulse">Loading stats...</div>
              ) : (
                achievements.map((achievement) => {
                  const Icon = achievement.IconComponent;
                  return (
                    <div key={achievement.id} className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-600/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                          {achievement.value}
                        </div>
                      </div>
                      <p className="text-sm text-slate-400">{achievement.description || achievement.label}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
