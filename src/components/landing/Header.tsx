import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/brand.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" data-testid="header-logo">
            <img src={logo} alt="Velô" className="h-8" />
          </Link>

          {/* Desktop Navigation - aligned right */}
          <nav className="hidden md:flex items-center gap-8 ml-auto" data-testid="header-nav">
            <Link to="/lookup" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Consultar Pedido
            </Link>
            <Button asChild data-testid="header-cta">
              <Link to="/configure">Configure o Seu</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 transition-transform duration-200 hover:scale-110 ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="header-menu-toggle"
          >
            <span className={`transition-transform duration-300 block ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-4 border-t border-border" data-testid="header-mobile-nav">
            <div className="flex flex-col gap-4">
              <Link
                to="/lookup"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Consultar Pedido
              </Link>
              <Button asChild className="w-full mt-2 animate-fade-in">
                <Link to="/configure">Configure o Seu</Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
