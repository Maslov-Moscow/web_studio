import { useSectionHeader } from "@/lib/useSectionHeader";

interface SectionHeaderProps {
  sectionKey: string;
}

export function SectionHeader({ sectionKey }: SectionHeaderProps) {
  const { header, loading } = useSectionHeader(sectionKey);

  if (loading || !header) {
    return (
      <div className="text-center mb-16">
        <div className="inline-block mb-4 px-4 py-2 rounded-full bg-slate-800 animate-pulse">
          <div className="h-4 w-24"></div>
        </div>
        <div className="h-10 bg-slate-800 rounded max-w-2xl mx-auto mb-4 animate-pulse"></div>
        <div className="h-6 bg-slate-800 rounded max-w-xl mx-auto animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="text-center mb-16">
      <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
        <span className="text-sm bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-semibold">
          {header.badge_text}
        </span>
      </div>
      <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
        {header.heading}
      </h2>
      <p className="text-lg text-slate-400 max-w-2xl mx-auto">
        {header.subheading}
      </p>
    </div>
  );
}
