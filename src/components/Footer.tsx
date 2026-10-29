import React from 'react';
import { BrandLogo } from './BrandLogo';
import {
  getWhatsAppUrl,
  COMPANY_NAME,
  COMPANY_SLOGAN,
  MAIN_OFFICE,
  CRECI_LABEL,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  CONSULTANTS,
  REGION_LABEL,
} from '../utils/whatsapp';
import { MapPin, MessageCircle, ChevronRight, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-28 relative overflow-hidden">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-accent/30" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-12 border-b border-white/15">
          <div className="space-y-4">
            <BrandLogo size="md" tone="on-dark" asImage="/images/logo-morarlagos.jpg" />
            <p className="text-base text-accent font-heading font-semibold">{COMPANY_SLOGAN}</p>
            <p className="text-base text-white/80">{CRECI_LABEL}</p>
            <p className="flex items-start gap-1.5 text-base text-white/85">
              <MapPin className="w-4 h-4 text-accent shrink-0 mt-1" />
              <span>{MAIN_OFFICE.address}</span>
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base text-white hover:text-accent transition-colors"
            >
              <Instagram className="w-4 h-4 shrink-0" />
              <span>{INSTAGRAM_HANDLE}</span>
            </a>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider border-b border-accent/70 pb-2 inline-block">
              Navegação
            </h4>
            <ul className="space-y-2 text-base text-white/85">
              {[
                { label: 'Início', href: '#inicio' },
                { label: 'Imóveis', href: '#imoveis' },
                { label: 'Serviços', href: '#servicos' },
                { label: 'Por que a MorarLagos', href: '#filiais' },
                { label: 'Simular financiamento', href: '#simulador' },
                { label: 'Cadastrar imóvel', href: '#captacao' },
                { label: 'Sobre', href: '#sobre' },
                { label: 'Contato', href: '#contato' },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-accent transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-accent" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider border-b border-accent/70 pb-2 inline-block">
              WhatsApp
            </h4>
            <p className="text-base text-white/85">
              Fale com a equipe sobre imóveis na {REGION_LABEL}. Valores e financiamento: consulte condições.
            </p>
            <div className="flex flex-col gap-2">
              {CONSULTANTS.map((consultant) => (
                <a
                  key={consultant.id}
                  href={getWhatsAppUrl(undefined, consultant.number)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold text-base px-4 py-2.5 rounded-xl transition-all min-h-11"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{consultant.name} · CRECI {consultant.creci} · {consultant.display}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-white/70">
          <p>
            © {new Date().getFullYear()} {COMPANY_NAME}. Todos os direitos reservados. {CRECI_LABEL}.
          </p>
          <div className="flex items-center gap-4">
            <p>Cabo Frio – Região dos Lagos</p>
            <a href="/admin/" className="text-xs text-white/50 hover:text-white/80 transition-colors">
              Painel
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
