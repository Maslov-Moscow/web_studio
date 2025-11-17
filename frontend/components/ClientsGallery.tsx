'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { getClients, Client, getTrustIndicators, TrustIndicator } from "@/lib/api";
import { SectionHeader } from "./SectionHeader";

// Color mapping for trust indicators
const colorMap: Record<string, string> = {
  green: "bg-green-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
};

export function ClientsGallery() {
  const [clients, setClients] = useState<Client[]>([]);
  const [trustIndicators, setTrustIndicators] = useState<TrustIndicator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [clientsData, trustData] = await Promise.all([
          getClients(),
          getTrustIndicators()
        ]);
        setClients(clientsData);
        setTrustIndicators(trustData);
      } catch (err) {
        console.error('Failed to fetch clients data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <section id="cases" className="py-20 bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader sectionKey="clients" />

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-2 md:col-span-4 text-center text-slate-400 animate-pulse">
              Loading clients...
            </div>
          ) : (
            clients.map((client) => (
              <div
                key={client.id}
                className="group flex items-center justify-center aspect-video rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
              >
                <div className="text-center">
                  {client.logo_url ? (
                    <div className="relative w-full h-16 mb-2">
                      <Image
                        src={client.logo_url}
                        alt={client.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  ) : (
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 group-hover:from-blue-500/20 group-hover:to-purple-600/20 transition-all duration-300 mb-2">
                      <span className="text-2xl font-bold text-slate-500 group-hover:text-blue-400 transition-colors">
                        {client.abbreviation}
                      </span>
                    </div>
                  )}
                  <div className="text-xs text-slate-600 group-hover:text-slate-400 transition-colors">
                    {client.name}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500">
          {loading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-slate-800 animate-pulse" />
                  <div className="h-4 w-32 bg-slate-800 rounded animate-pulse" />
                </div>
              ))}
            </>
          ) : (
            trustIndicators.map((indicator) => (
              <div key={indicator.id} className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${colorMap[indicator.color] || 'bg-blue-500'}`} />
                <span>{indicator.text}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
