import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Qual é a autonomia real do Velô Sprint?",
    answer: "O Velô Sprint oferece até 450 km de autonomia no ciclo WLTP. A autonomia real pode variar dependendo do estilo de condução, condições climáticas e uso do ar-condicionado. Em condições urbanas, muitos proprietários reportam autonomias ainda maiores."
  },
  {
    question: "Quanto tempo leva para carregar completamente?",
    answer: "Em carregadores rápidos de 350kW, o Velô Sprint carrega de 10% a 80% em apenas 20 minutos. Em um carregador residencial de 11kW, a carga completa leva aproximadamente 9 horas, ideal para carregamento noturno."
  },
  {
    question: "O Velô Sprint possui garantia?",
    answer: "Sim! Oferecemos garantia de 5 anos ou 100.000 km para o veículo e 8 anos ou 160.000 km para a bateria de alta voltagem. Além disso, incluímos assistência 24h durante todo o período de garantia."
  },
  {
    question: "Posso fazer test-drive antes de comprar?",
    answer: "Absolutamente! Oferecemos test-drives em todas as nossas concessionárias. Você pode agendar seu test-drive diretamente pelo nosso site ou entrando em contato com a loja mais próxima."
  },
  {
    question: "Quais são as opções de financiamento?",
    answer: "Oferecemos financiamento em até 12x com taxa de 2% ao mês. Você também pode optar pelo pagamento à vista com condições especiais. Nossa equipe pode ajudá-lo a encontrar a melhor opção para seu perfil."
  },
  {
    question: "Como funciona a manutenção de um veículo elétrico?",
    answer: "Veículos elétricos têm custos de manutenção significativamente menores. Não há troca de óleo, filtros de combustível ou correias. As principais manutenções incluem pneus, freios e fluido de freio, com intervalos maiores devido à regeneração de energia."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 bg-background" data-testid="faq-section">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas sobre o Velô Sprint e descubra por que ele é 
            a escolha certa para você.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-xl px-6 bg-secondary/30"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
