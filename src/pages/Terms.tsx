import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <p className="text-sm text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e utilizar o site da Velô, você concorda em cumprir e estar vinculado a estes Termos de Uso. 
                Se você não concordar com qualquer parte destes termos, não deverá usar nosso site ou serviços.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">2. Uso do Site</h2>
              <p>
                O site da Velô é destinado a fornecer informações sobre nossos veículos elétricos e permitir 
                que você configure e faça pedidos de reserva. Você concorda em usar o site apenas para fins legais 
                e de acordo com estes Termos.
              </p>
              <p>Você não deve:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Usar o site de qualquer forma que viole leis ou regulamentos aplicáveis</li>
                <li>Tentar obter acesso não autorizado a qualquer parte do site</li>
                <li>Interferir ou interromper o funcionamento do site</li>
                <li>Transmitir vírus ou qualquer código de natureza destrutiva</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">3. Reservas e Pedidos</h2>
              <p>
                Ao fazer uma reserva através do nosso configurador, você está expressando interesse em adquirir 
                um veículo Velô. A reserva não constitui um contrato de compra vinculativo até que seja 
                confirmada por nossa equipe e os termos finais de venda sejam acordados.
              </p>
              <p>
                Os preços exibidos no site são estimativas e podem estar sujeitos a alterações. 
                O preço final será confirmado no momento da formalização do contrato de compra.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">4. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo do site, incluindo textos, gráficos, logotipos, imagens e software, 
                é propriedade da Velô ou de seus licenciadores e está protegido por leis de direitos autorais 
                e outras leis de propriedade intelectual.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">5. Limitação de Responsabilidade</h2>
              <p>
                A Velô não será responsável por quaisquer danos diretos, indiretos, incidentais, 
                consequenciais ou punitivos decorrentes do uso ou incapacidade de usar o site ou serviços.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">6. Modificações dos Termos</h2>
              <p>
                Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. 
                As alterações entrarão em vigor imediatamente após a publicação no site. 
                O uso continuado do site após tais alterações constitui sua aceitação dos novos termos.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">7. Lei Aplicável</h2>
              <p>
                Estes Termos de Uso são regidos pelas leis do Brasil. Qualquer disputa relacionada 
                a estes termos será submetida à jurisdição exclusiva dos tribunais brasileiros.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">8. Contato</h2>
              <p>
                Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco através do email: 
                <a href="mailto:contato@velo.com.br" className="text-primary hover:underline ml-1">
                  contato@velo.com.br
                </a>
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <Link to="/" className="text-primary hover:underline">
              ← Voltar para a página inicial
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
