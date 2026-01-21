import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <p className="text-sm text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">1. Introdução</h2>
              <p>
                A Velô está comprometida em proteger sua privacidade. Esta Política de Privacidade 
                explica como coletamos, usamos, divulgamos e protegemos suas informações pessoais 
                quando você visita nosso site ou utiliza nossos serviços.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">2. Informações que Coletamos</h2>
              <p>Podemos coletar as seguintes categorias de informações:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Informações de identificação pessoal:</strong> nome, endereço de email, 
                  número de telefone, CPF quando você faz uma reserva
                </li>
                <li>
                  <strong>Informações de configuração:</strong> suas preferências de veículo, 
                  cores e opcionais selecionados
                </li>
                <li>
                  <strong>Informações de uso:</strong> como você interage com nosso site, 
                  páginas visitadas e tempo de permanência
                </li>
                <li>
                  <strong>Informações técnicas:</strong> endereço IP, tipo de navegador, 
                  dispositivo utilizado
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">3. Como Usamos suas Informações</h2>
              <p>Utilizamos suas informações para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processar suas reservas e pedidos</li>
                <li>Comunicar-nos com você sobre seu pedido e atualizações</li>
                <li>Melhorar nosso site e serviços</li>
                <li>Enviar informações sobre novos produtos e ofertas (com seu consentimento)</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">4. Compartilhamento de Informações</h2>
              <p>
                Não vendemos suas informações pessoais. Podemos compartilhar suas informações com:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Prestadores de serviços que nos auxiliam em nossas operações</li>
                <li>Parceiros de financiamento, quando você solicitar</li>
                <li>Autoridades governamentais, quando exigido por lei</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">5. Segurança dos Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais adequadas para 
                proteger suas informações pessoais contra acesso não autorizado, alteração, 
                divulgação ou destruição.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">6. Seus Direitos (LGPD)</h2>
              <p>
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Confirmar a existência de tratamento de dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários</li>
                <li>Solicitar a portabilidade dos dados</li>
                <li>Revogar o consentimento a qualquer momento</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">7. Cookies</h2>
              <p>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência no site. 
                Você pode configurar seu navegador para recusar cookies, mas isso pode afetar 
                algumas funcionalidades do site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">8. Retenção de Dados</h2>
              <p>
                Mantemos suas informações pessoais pelo tempo necessário para cumprir os fins 
                para os quais foram coletadas, incluindo obrigações legais, contábeis ou de relatório.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">9. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você 
                sobre quaisquer alterações publicando a nova política nesta página com uma nova 
                data de "última atualização".
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">10. Contato</h2>
              <p>
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato 
                com nosso Encarregado de Proteção de Dados:
              </p>
              <p>
                Email: <a href="mailto:privacidade@velo.com.br" className="text-primary hover:underline">
                  privacidade@velo.com.br
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

export default Privacy;
