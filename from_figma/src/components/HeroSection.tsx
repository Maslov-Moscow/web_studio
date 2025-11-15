import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
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
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-slate-300">
              Цифровые решения для современного бизнеса
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            Трансформируйте свой бизнес с помощью передовых цифровых решений
          </h1>

          {/* Subheading */}
          <p className="mb-10 text-slate-400 max-w-2xl mx-auto">
            Мы специализируемся на SEO и цифровом маркетинге,
            разработке программного обеспечения на заказ и интеграции искусственного интеллекта/LLM,
            чтобы помочь малому и среднему бизнесу в регионе СНГ достичь своих целей цифровой трансформации.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 group"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 hover:bg-white/5"
            >
              View Our Work
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-10">
            <div>
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                150+
              </div>
              <p className="text-sm text-slate-400">Projects Completed</p>
            </div>
            <div>
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                98%
              </div>
              <p className="text-sm text-slate-400">Client Satisfaction</p>
            </div>
            <div>
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                5+
              </div>
              <p className="text-sm text-slate-400">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
