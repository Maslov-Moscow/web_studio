import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Target, Users, Award, TrendingUp } from "lucide-react";

export function AboutUs() {
  const achievements = [
    {
      icon: Target,
      number: "150+",
      label: "Successful Projects",
    },
    {
      icon: Users,
      number: "80+",
      label: "Happy Clients",
    },
    {
      icon: Award,
      number: "15+",
      label: "Industry Awards",
    },
    {
      icon: TrendingUp,
      number: "98%",
      label: "Client Retention",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-20" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758518729685-f88df7890776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NjIxNjAyMzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Our team at work"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
              <span className="text-sm bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                About Us
              </span>
            </div>
            
            <h2 className="mb-6 text-white">
              Building Digital Success Stories Since 2020
            </h2>
            
            <p className="text-slate-400 mb-6">
              We are a dynamic web studio specializing in delivering innovative digital 
              solutions for small and medium businesses across the CIS region. Our team 
              of experienced developers, designers, and marketers work together to create 
              solutions that drive real business results.
            </p>
            
            <p className="text-slate-400 mb-8">
              From SEO optimization and digital marketing to custom software development 
              and AI integration, we provide comprehensive services that help our clients 
              stay ahead in the digital age.
            </p>

            {/* Achievements Grid */}
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-600/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        {achievement.number}
                      </div>
                    </div>
                    <p className="text-sm text-slate-400">{achievement.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
