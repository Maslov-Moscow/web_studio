import { useState, useEffect } from 'react';
import { getSectionHeader, SectionHeader } from './api';

export function useSectionHeader(sectionKey: string) {
  const [header, setHeader] = useState<SectionHeader | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHeader() {
      try {
        const data = await getSectionHeader(sectionKey);
        setHeader(data);
      } catch (err) {
        console.error(`Failed to fetch section header for ${sectionKey}:`, err);
      } finally {
        setLoading(false);
      }
    }

    fetchHeader();
  }, [sectionKey]);

  return { header, loading };
}
