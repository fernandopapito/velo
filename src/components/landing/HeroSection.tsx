import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero.png";

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center pt-16" 
      data-testid="hero-section"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          {/* Content */}
          <div className="space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium border border-white/20">
              <Sparkles size={16} />
              <span>Novo Modelo 2026</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
              Velô Sprint
            </h1>
            
            <p className="text-xl text-white/90 max-w-xl drop-shadow-md">
              Performance redefinida. Design que inspira. Configure seu Velô Sprint 
              e experimente o futuro da mobilidade elétrica.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="text-lg px-8 bg-white text-black hover:bg-white/90" data-testid="hero-cta-primary">
                <Link to="/configure">
                  Configure Agora
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div>
                <p className="text-3xl font-bold text-white">450</p>
                <p className="text-sm text-white/70">km de autonomia</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">3.2s</p>
                <p className="text-sm text-white/70">0-100 km/h</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">500</p>
                <p className="text-sm text-white/70">cv de potência</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
