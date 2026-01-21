import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Linkedin } from "lucide-react";
import logo from "@/assets/brand.svg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground" data-testid="footer">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logo} alt="Velô" className="h-8 brightness-0 invert" />
            <p className="text-primary-foreground/70 text-sm">
              Redefinindo a mobilidade elétrica com design, performance e tecnologia de ponta.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="Youtube">
                <Youtube size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Modelos */}
          <div className="space-y-4">
            <h4 className="font-semibold">Modelos</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link to="/configure" className="hover:text-primary-foreground transition-colors">
                  Velô Sprint
                </Link>
              </li>
              <li>
                <span className="opacity-50">Velô Touring (Em breve)</span>
              </li>
              <li>
                <span className="opacity-50">Velô Urban (Em breve)</span>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div className="space-y-4">
            <h4 className="font-semibold">Suporte</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <a href="#faq" className="hover:text-primary-foreground transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Assistência 24h
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Rede de Carregadores
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link to="/termos" className="hover:text-primary-foreground transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="hover:text-primary-foreground transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © 2025 Velô Motors. Todos os direitos reservados.
          </p>
          <p className="text-sm text-primary-foreground/50">
            Feito com ❤️ e muito ☕️ por{" "}
            <a
              href="https://fernandopapito.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground transition-colors underline"
            >
              Papito
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
