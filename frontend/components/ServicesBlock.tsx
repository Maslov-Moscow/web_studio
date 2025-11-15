'use client'

import { Search, Code, Brain, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const services = [
  {
    icon: Search,
    title: "SEO & Digital Marketing",
    description:
      "Boost your online presence with data-driven SEO strategies and comprehensive digital marketing campaigns that deliver measurable results.",
    features: [
      "Search Engine Optimization",
      "Content Marketing Strategy",
      "Social Media Management",
      "PPC Campaign Management",
    ],
  },
  {
    icon: Code,
    title: "Custom Software Development",
    description:
      "Build scalable, secure, and innovative software solutions tailored to your business needs using modern technologies and best practices.",
    features: [
      "Web Application Development",
      "Mobile App Development",
      "API Integration & Development",
      "Legacy System Modernization",
    ],
  },
  {
    icon: Brain,
    title: "AI/LLM Integration Solutions",
    description:
      "Harness the power of artificial intelligence and large language models to automate processes and create intelligent business solutions.",
    features: [
      "ChatGPT Integration",
      "Custom AI Model Training",
      "Process Automation",
      "Intelligent Data Analysis",
    ],
  },
];

export function ServicesBlock() {
  return (
    <section id="services" className="py-20 md:py-32 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <span className="text-sm bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-semibold">
              Our Services
            </span>
          </div>
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
            Complete Digital Solutions for Your Business
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            From strategy to implementation, we provide end-to-end digital services
            to help you succeed in the modern marketplace.
          </p>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full max-w-sm mx-auto">
            <CarouselContent>
              {services.map((service, index) => (
                <CarouselItem key={index}>
                  <ServiceCard service={service} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: typeof services[0] }) {
  const Icon = service.icon;

  return (
    <Card className="bg-slate-950/50 border-white/10 hover:border-blue-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/20">
      <CardHeader>
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 group-hover:scale-110 transition-transform">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-white">{service.title}</CardTitle>
        <CardDescription className="text-slate-400">
          {service.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 mb-6">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-sm text-slate-300">
              <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors group/link"
        >
          Learn more
          <ArrowRight className="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
        </a>
      </CardContent>
    </Card>
  );
}
