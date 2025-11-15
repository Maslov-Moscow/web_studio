'use client'

import { useState, useEffect } from "react";
import { getClients, Client } from "@/lib/api";

export function ClientsGallery() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClients() {
      try {
        const data = await getClients();
        setClients(data);
      } catch (err) {
        console.error('Failed to fetch clients:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, []);

  return (
    <section id="cases" className="py-20 bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <span className="text-sm bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-semibold">
              Trusted By
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Companies That Trust Us
          </h2>
        </div>

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
                    <img
                      src={client.logo_url}
                      alt={client.name}
                      className="max-h-16 mx-auto mb-2"
                    />
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
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>100% Money Back Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span>NDA Protected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-purple-500" />
            <span>Agile Methodology</span>
          </div>
        </div>
      </div>
    </section>
  );
}
