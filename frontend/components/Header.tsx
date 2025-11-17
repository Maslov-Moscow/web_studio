'use client'

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { getNavigation, getSiteSettings, NavigationItem, SiteSettings } from "@/lib/api";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<NavigationItem[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [nav, settings] = await Promise.all([
          getNavigation(),
          getSiteSettings()
        ]);
        setMenuItems(nav);
        setSiteSettings(settings);
      } catch (err) {
        console.error('Failed to fetch header data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            {loading || !siteSettings ? (
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-slate-800 animate-pulse" />
                <div className="h-6 w-32 bg-slate-800 rounded animate-pulse" />
              </div>
            ) : (
              <a href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-semibold text-xl">
                  {siteSettings.company_name}
                </span>
              </a>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {loading ? (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-4 w-16 bg-slate-800 rounded animate-pulse" />
                ))}
              </>
            ) : (
              menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            {loading ? (
              <div className="h-10 w-40 bg-slate-800 rounded animate-pulse" />
            ) : (
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Get Consultation
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-slate-300" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-slate-950 border-white/10">
              <nav className="flex flex-col space-y-6 mt-8">
                {loading ? (
                  <>
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-6 w-24 bg-slate-800 rounded animate-pulse" />
                    ))}
                    <div className="h-10 w-full bg-slate-800 rounded animate-pulse" />
                  </>
                ) : (
                  <>
                    {menuItems.map((item) => (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-slate-300 hover:text-white transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 w-full">
                      Get Consultation
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
