import { Battery, Gauge, Zap, Shield, Cpu, Wind } from "lucide-react";

const specs = [
  {
    icon: Battery,
    title: "Bateria",
    value: "100 kWh",
    description: "Bateria de alta densidade com tecnologia de última geração"
  },
  {
    icon: Gauge,
    title: "Velocidade Máxima",
    value: "250 km/h",
    description: "Performance limitada eletronicamente para sua segurança"
  },
  {
    icon: Zap,
    title: "Carregamento Rápido",
    value: "40 min",
    description: "De 10% a 80% em carregadores de 350kW"
  },
  {
    icon: Shield,
    title: "Segurança",
    value: "5 Estrelas",
    description: "Classificação máxima no Latin NCAP"
  },
  {
    icon: Cpu,
    title: "Tecnologia",
    value: "VelôOS 3.0",
    description: "Sistema operacional com atualizações OTA"
  },
  {
    icon: Wind,
    title: "Aerodinâmica",
    value: "Cx 0.21",
    description: "Coeficiente de arrasto líder da categoria"
  }
];

const SpecsSection = () => {
  return (
    <section id="specs" className="py-24 bg-background" data-testid="specs-section">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Especificações Técnicas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            O Velô Sprint combina tecnologia de ponta com design sofisticado 
            para entregar uma experiência de condução incomparável.
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specs.map((spec, index) => (
            <div
              key={spec.title}
              className="group p-8 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors duration-300"
              data-testid={`spec-card-${index}`}
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <spec.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                {spec.title}
              </h3>
              <p className="text-3xl font-bold text-foreground mb-2">
                {spec.value}
              </p>
              <p className="text-sm text-muted-foreground">
                {spec.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Details */}
        <div className="mt-16 p-8 rounded-2xl bg-primary text-primary-foreground">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold">450 km</p>
              <p className="text-primary-foreground/70 mt-1">Autonomia WLTP</p>
            </div>
            <div>
              <p className="text-4xl font-bold">AWD</p>
              <p className="text-primary-foreground/70 mt-1">Tração Integral</p>
            </div>
            <div>
              <p className="text-4xl font-bold">760 Nm</p>
              <p className="text-primary-foreground/70 mt-1">Torque Máximo</p>
            </div>
            <div>
              <p className="text-4xl font-bold">2.100 kg</p>
              <p className="text-primary-foreground/70 mt-1">Peso Total</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;
