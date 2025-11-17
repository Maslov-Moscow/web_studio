'use client'

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { getCompanyStats, CompanyStat, getHeroSection, HeroSection as HeroSectionType } from "@/lib/api";

export function HeroSection() {
  const [stats, setStats] = useState<CompanyStat[]>([]);
  const [content, setContent] = useState<HeroSectionType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [heroData, statsData] = await Promise.all([
          getHeroSection(),
          getCompanyStats()
        ]);
        setContent(heroData);
        // Take only the first 3 stats for hero section
        setStats(statsData.slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch hero section data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-slate-950" />

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 blur-3xl" />
        <div className="absolute bottom-20 left-20 h-96 w-96 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {loading || !content ? (
            <div className="animate-pulse space-y-8">
              <div className="h-10 bg-slate-800 rounded-full w-80 mx-auto"></div>
              <div className="h-20 bg-slate-800 rounded w-full"></div>
              <div className="h-16 bg-slate-800 rounded w-3/4 mx-auto"></div>
              <div className="flex gap-4 justify-center">
                <div className="h-12 bg-slate-800 rounded w-40"></div>
                <div className="h-12 bg-slate-800 rounded w-40"></div>
              </div>
            </div>
          ) : (
            <>
              {/* Badge */}
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-slate-300">
                  {content.badge_text}
                </span>
              </div>

              {/* Headline */}
              <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                {content.headline}
              </h1>

              {/* Subheading */}
              <p className="mb-10 text-lg text-slate-400 max-w-2xl mx-auto">
                {content.subheading}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 group"
                  onClick={() => window.location.href = content.primary_cta_url}
                >
                  {content.primary_cta_text}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 hover:bg-white/5"
                  onClick={() => window.location.href = content.secondary_cta_url}
                >
                  {content.secondary_cta_text}
                </Button>
              </div>
            </>
          )}

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-10">
            {stats.length > 0 ? (
              stats.map((stat) => (
                <div key={stat.id}>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm text-slate-400">{stat.description || stat.label}</p>
                </div>
              ))
            ) : (
              <>
                <div className="animate-pulse">
                  <div className="h-10 bg-slate-800 rounded mb-2"></div>
                  <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                </div>
                <div className="animate-pulse">
                  <div className="h-10 bg-slate-800 rounded mb-2"></div>
                  <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                </div>
                <div className="animate-pulse">
                  <div className="h-10 bg-slate-800 rounded mb-2"></div>
                  <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
