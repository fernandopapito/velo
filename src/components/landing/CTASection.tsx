import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import midnightBlackAero from "@/assets/midnight-black.png";

const CTASection = () => {
  return (
    <section className="py-24 stage-gradient" data-testid="cta-section">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <img
              src={midnightBlackAero}
              alt="Velô Sprint Midnight Black"
              className="w-full max-w-xl mx-auto drop-shadow-2xl"
              data-testid="cta-car-image"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Pronto para o Futuro?
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
              Configure seu Velô Sprint do seu jeito. Escolha cores, interiores 
              e rodas para criar o veículo perfeito para você.
            </p>
            
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                A partir de
              </div>
              <div className="text-4xl font-bold text-foreground">
                R$ 40.000
              </div>
            </div>

            <Button size="lg" asChild className="text-lg px-8" data-testid="cta-button">
              <Link to="/configure">
                Monte o Seu Agora
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
