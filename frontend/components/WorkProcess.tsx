'use client'

import { FileSearch, Lightbulb, Code2, Rocket } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const steps = [
  {
    number: "01",
    icon: FileSearch,
    title: "Discovery & Analysis",
    description: "We start by understanding your business goals and challenges",
    points: [
      "Business requirements gathering",
      "Market and competitor analysis",
      "Technical feasibility assessment",
      "Project scope definition",
    ],
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Strategy & Planning",
    description: "Developing a comprehensive roadmap for your project",
    points: [
      "Solution architecture design",
      "Technology stack selection",
      "Timeline and milestone planning",
      "Resource allocation",
    ],
  },
  {
    number: "03",
    icon: Code2,
    title: "Development & Testing",
    description: "Building your solution with best practices and quality assurance",
    points: [
      "Agile development process",
      "Regular progress updates",
      "Continuous integration & testing",
      "Code review and optimization",
    ],
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Support",
    description: "Deploying your solution and ensuring long-term success",
    points: [
      "Production deployment",
      "User training and documentation",
      "Performance monitoring",
      "Ongoing maintenance and updates",
    ],
  },
];

export function WorkProcess() {
  return (
    <section className="py-20 md:py-32 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <span className="text-sm bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-semibold">
              Our Process
            </span>
          </div>
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
            How We Work
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A proven methodology that ensures successful project delivery from concept to launch
          </p>
        </div>

        {/* Desktop: Column Layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} />
          ))}
        </div>

        {/* Mobile: Accordion */}
        <div className="md:hidden">
          <Accordion type="single" collapsible className="w-full">
            {steps.map((step, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-white/10"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                      {(() => {
                        const Icon = step.icon;
                        return <Icon className="h-6 w-6 text-white" />;
                      })()}
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">{step.number}</div>
                      <div className="text-white font-medium">{step.title}</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-16 pt-4">
                    <p className="text-slate-400 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.points.map((point, idx) => (
                        <li key={idx} className="flex items-start text-sm text-slate-300">
                          <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step }: { step: typeof steps[0] }) {
  const Icon = step.icon;

  return (
    <div className="relative group">
      {/* Connecting line (except for last item) */}
      <div className="absolute top-12 left-12 w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50 -z-10 group-last:hidden" />

      <div className="relative">
        {/* Number Badge */}
        <div className="absolute -top-3 -left-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold text-white">
          {step.number}
        </div>

        {/* Icon */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
          <Icon className="h-8 w-8 text-blue-400" />
        </div>

        {/* Content */}
        <h3 className="mb-3 text-lg font-semibold text-white">{step.title}</h3>
        <p className="text-sm text-slate-400 mb-4">{step.description}</p>

        {/* Points */}
        <ul className="space-y-2">
          {step.points.map((point, idx) => (
            <li key={idx} className="flex items-start text-sm text-slate-300">
              <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex-shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
