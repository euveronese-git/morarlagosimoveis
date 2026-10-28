import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import {
  getWhatsAppUrl,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
} from '../utils/whatsapp';
import {
  MessageCircle,
  Heart,
  Menu,
  X,
  Calculator,
  FileCheck2,
  Instagram,
} from 'lucide-react';

interface HeaderProps {
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenEvaluation: () => void;
  onOpenMortgage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  favoritesCount,
  onOpenFavorites,
  onOpenEvaluation,
  onOpenMortgage
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Imóveis', href: '#imoveis' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Por que a MorarLagos', href: '#filiais' },
    { name: 'Simular financiamento', href: '#simulador' },
    { name: 'Cadastrar imóvel', href: '#captacao' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-40 transition-all duration-300">
      <div
        className={`w-full bg-primary text-white transition-all duration-300 ${
          isScrolled
            ? 'shadow-md py-2 border-b border-white/10'
            : 'py-3 border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
          <a href="#inicio" className="flex items-center min-w-0 flex-1 lg:flex-none lg:max-w-none">
            <BrandLogo size="md" tone="on-dark" asImage="/images/logo-morarlagos.jpg" />
          </a>

          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl text-white hover:text-accent border border-white/25 transition-colors"
              title={INSTAGRAM_HANDLE}
              aria-label={`Instagram ${INSTAGRAM_HANDLE}`}
            >
              <Instagram className="w-5 h-5" />
            </a>

            <button
              onClick={onOpenFavorites}
              className="relative p-2.5 rounded-xl text-white hover:text-accent border border-white/25 transition-colors"
              title="Imóveis salvos"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-on-accent text-[0.65rem] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenMortgage}
              className="flex items-center gap-1.5 text-sm font-semibold text-white hover:text-accent border border-white/40 px-3 py-2 rounded-xl transition-all"
            >
              <Calculator className="w-3.5 h-3.5" />
              Simular
            </button>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-primary text-sm font-semibold px-4 py-2.5 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Fale com um especialista</span>
            </a>
          </div>

          <div className="flex lg:hidden items-center gap-1 shrink-0">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-white hover:text-accent min-w-11 min-h-11 flex items-center justify-center"
              aria-label={`Instagram ${INSTAGRAM_HANDLE}`}
            >
              <Instagram className="w-5 h-5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none min-w-11 min-h-11 flex items-center justify-center"
              aria-label="Alternar menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <nav className="hidden lg:flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-white font-semibold text-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-accent transition-colors py-1 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-primary border-b border-white/10 px-5 pt-2 pb-6 shadow-card max-h-[calc(100vh-4.5rem)] overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-accent font-semibold text-sm uppercase tracking-wider py-3 border-b border-white/15"
              >
                {link.name}
              </a>
            ))}

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white font-semibold text-sm py-3 border-b border-white/15"
            >
              <Instagram className="w-4 h-4" />
              {INSTAGRAM_HANDLE}
            </a>

            <div className="flex flex-col gap-2 pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFavorites();
                }}
                className="flex items-center justify-center gap-2 bg-white text-primary font-semibold text-sm py-3 rounded-xl min-h-11"
              >
                <Heart className="w-4 h-4" />
                Imóveis salvos{favoritesCount > 0 ? ` (${favoritesCount})` : ''}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMortgage();
                }}
                className="flex items-center justify-center gap-2 btn-on-dark text-sm py-3 min-h-11"
              >
                <Calculator className="w-4 h-4" />
                Simulador Minha Casa Minha Vida
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEvaluation();
                }}
                className="flex items-center justify-center gap-2 btn-on-dark text-sm py-3 min-h-11"
              >
                <FileCheck2 className="w-4 h-4" />
                Quero anunciar meu imóvel
              </button>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 btn-primary text-sm py-3.5 min-h-11"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Fale com um especialista
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
