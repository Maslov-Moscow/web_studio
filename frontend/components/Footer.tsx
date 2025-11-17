'use client'

import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github, LucideIcon } from "lucide-react";
import { getSiteSettings, getSocialLinks, getFooterLinkGroups, SiteSettings, SocialLink, FooterLinkGroup } from "@/lib/api";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Facebook,
  Twitter,
  Linkedin,
  Github,
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [footerLinkGroups, setFooterLinkGroups] = useState<FooterLinkGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [settings, social, linkGroups] = await Promise.all([
          getSiteSettings(),
          getSocialLinks(),
          getFooterLinkGroups()
        ]);
        setSiteSettings(settings);
        setSocialLinks(social);
        setFooterLinkGroups(linkGroups);
      } catch (err) {
        console.error('Failed to fetch footer data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Get legal links (last group) separately
  const legalLinks = footerLinkGroups.find(g => g.group_name === "Legal");
  const otherGroups = footerLinkGroups.filter(g => g.group_name !== "Legal");

  return (
    <footer id="contact" className="bg-slate-950 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            {loading || !siteSettings ? (
              <div className="space-y-4">
                <div className="h-8 w-32 bg-slate-800 rounded animate-pulse" />
                <div className="h-16 bg-slate-800 rounded animate-pulse" />
                <div className="flex gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 bg-slate-800 rounded-lg animate-pulse" />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
                  <span className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {siteSettings.company_name}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-6">
                  {siteSettings.company_description}
                </p>
                {/* Social Links */}
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = iconMap[social.icon] || Facebook;
                    return (
                      <a
                        key={social.id}
                        href={social.url}
                        aria-label={social.platform}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all"
                      >
                        <Icon className="h-4 w-4 text-slate-400 hover:text-blue-400 transition-colors" />
                      </a>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Dynamic Footer Link Groups */}
          {loading ? (
            <>
              {[1, 2].map((i) => (
                <div key={i}>
                  <div className="h-6 w-24 bg-slate-800 rounded mb-6 animate-pulse" />
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-4 w-32 bg-slate-800 rounded animate-pulse" />
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            otherGroups.map((group) => (
              <div key={group.id}>
                <h3 className="mb-6 text-lg font-semibold text-white">{group.group_name}</h3>
                <ul className="space-y-3">
                  {group.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}

          {/* Contact Info */}
          <div>
            {loading || !siteSettings ? (
              <>
                <div className="h-6 w-24 bg-slate-800 rounded mb-6 animate-pulse" />
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-5 w-5 bg-slate-800 rounded animate-pulse" />
                      <div className="h-4 w-32 bg-slate-800 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h3 className="mb-6 text-lg font-semibold text-white">Contact Us</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-sm text-slate-400">
                    <Mail className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <a href={`mailto:${siteSettings.email}`} className="hover:text-blue-400 transition-colors">
                      {siteSettings.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-400">
                    <Phone className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <a href={`tel:${siteSettings.phone.replace(/\s/g, '')}`} className="hover:text-blue-400 transition-colors">
                      {siteSettings.phone}
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-400">
                    <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>{siteSettings.address}</span>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {loading || !siteSettings ? (
              <>
                <div className="h-4 w-48 bg-slate-800 rounded animate-pulse" />
                <div className="flex gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-4 w-24 bg-slate-800 rounded animate-pulse" />
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-slate-500">
                  © {currentYear} {siteSettings.company_name}. All rights reserved.
                </p>
                {legalLinks && (
                  <div className="flex gap-6 text-sm text-slate-500">
                    {legalLinks.links.map((link, index) => (
                      <a key={index} href={link.href} className="hover:text-blue-400 transition-colors">
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
