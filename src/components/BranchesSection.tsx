import React from 'react';
import { MAIN_OFFICE, getWhatsAppUrl, CONSULTANTS, BROKERS, COMPANY_NAME, CRECI_LABEL, MAP_TITLE, REGION_LABEL } from '../utils/whatsapp';
import { MapPin, MessageCircle, ExternalLink, Home, Sparkles, Route } from 'lucide-react';

const reasons = [
  {
    title: 'Especialistas em Minha Casa Minha Vida e lançamentos',
    desc: 'A equipe explica o programa e os lançamentos da região em linguagem simples. Aprovação e prazos dependem do banco. Consulte condições.',
    footer: 'Consulte condições',
    icon: Home,
  },
  {
    title: 'Atendimento rápido e direto pelo WhatsApp',
    desc: 'Carlos, Denise e Catia acompanham o atendimento. Carlos e Denise respondem por mensagem. Dá para tirar dúvida, pedir fotos e combinar uma visita sem complicação.',
    footer: 'Três corretores',
    icon: MessageCircle,
  },
  {
    title: 'Assessoria completa do início ao fim',
    desc: 'Acompanhamos a negociação da escolha do imóvel até a assinatura. Quem analisa o crédito é o banco.',
    footer: 'Sem promessa de aprovação',
    icon: Route,
  },
  {
    title: 'Atuação em toda a Região dos Lagos',
    desc: 'Base em Cabo Frio, com imóveis também em Rio das Ostras, Búzios e Arraial do Cabo.',
    footer: 'Quatro cidades',
    icon: Sparkles,
  },
];

export const BranchesSection: React.FC = () => {
  return (
    <section id="filiais" className="py-14 md:py-16 bg-bg-alt border-b border-border relative scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-primary uppercase bg-bg-alt px-3.5 py-1.5 rounded-xl border border-primary/15">
            Diferenciais
          </span>
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-heading font-bold text-primary">
            Por que falar com a MorarLagos
          </h2>
          <p className="text-base text-text max-w-2xl mx-auto leading-relaxed">
            {COMPANY_NAME} atende quem quer morar ou investir na {REGION_LABEL}. A conversa é direta, e cada valor depende do imóvel. Consulte condições.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {reasons.map((card) => (
            <div key={card.title} className="bg-white p-6 rounded-2xl border border-border flex flex-col justify-between shadow-card">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-accent/40 flex items-center justify-center">
                  <card.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-primary">{card.title}</h3>
                <p className="text-base text-text leading-relaxed">{card.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-border text-sm font-semibold text-primary flex items-center gap-1.5">
                <span className="h-px w-4 bg-accent" aria-hidden="true" />
                <span>{card.footer}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl overflow-hidden border border-border shadow-card grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Atendimento
                </span>
              </div>

              <h3 className="text-2xl font-bold text-primary font-heading">
                {MAIN_OFFICE.name}
              </h3>
              <p className="text-sm font-semibold text-primary">{CRECI_LABEL}</p>
              <p className="text-base text-text">{MAIN_OFFICE.badge}</p>

              <div className="space-y-3 text-base text-text">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-1" />
                  <span>{MAIN_OFFICE.address}</span>
                </p>

                {CONSULTANTS.map((consultant) => (
                  <p key={consultant.id} className="flex items-center gap-2.5">
                    <MessageCircle className="w-4 h-4 text-whatsapp shrink-0" />
                    <a
                      href={getWhatsAppUrl(undefined, consultant.number)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary hover:text-ocean transition-colors"
                    >
                      {consultant.name}: {consultant.display} · CRECI {consultant.creci}
                    </a>
                  </p>
                ))}
                {BROKERS.filter((broker) => !CONSULTANTS.some((consultant) => consultant.id === broker.id)).map((broker) => (
                  <p key={broker.id} className="text-base text-text">
                    {broker.name} · CRECI {broker.creci}
                  </p>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-border space-y-3">
              <a
                href={getWhatsAppUrl('Olá! Vi o site da MorarLagos Imóveis e gostaria de combinar uma conversa sobre imóveis na Região dos Lagos.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold text-base py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 min-h-11"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chamar o Carlos no WhatsApp</span>
              </a>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(MAIN_OFFICE.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white hover:bg-bg text-primary font-semibold text-base py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 border border-border min-h-11"
              >
                <ExternalLink className="w-4 h-4 text-ocean" />
                <span>Abrir rota no Google Maps</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 h-[18.75rem] lg:h-auto lg:min-h-[28.125rem] bg-bg-alt relative">
            <iframe
              title={MAP_TITLE}
              src={MAIN_OFFICE.mapEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
