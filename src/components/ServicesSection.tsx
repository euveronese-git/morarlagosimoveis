import React from 'react';
import { Home, KeyRound, Handshake, ShieldCheck } from 'lucide-react';

const services = [
  {
    icon: Home,
    iconClass: 'text-accent',
    title: 'Compra e venda',
    description:
      'Ajudamos você a comprar ou vender um imóvel na Região dos Lagos, com conversa clara do primeiro contato até a assinatura. Valores: consulte condições.',
  },
  {
    icon: KeyRound,
    iconClass: 'text-ocean',
    title: 'Locação',
    description:
      'Se a busca é alugar, mostramos opções em Cabo Frio e nas cidades vizinhas e acompanhamos a negociação com calma. Consulte condições.',
  },
  {
    icon: Handshake,
    iconClass: 'text-accent',
    title: 'Assessoria completa',
    description:
      'A equipe fica com você do início ao fim: dúvidas, visitas e documentos. A aprovação de crédito, quando houver financiamento, é do banco.',
  },
  {
    icon: ShieldCheck,
    iconClass: 'text-ocean',
    title: 'Investimentos com segurança',
    description:
      'Orientamos quem quer investir na região, inclusive em lançamentos. Não há rentabilidade garantida. Cada caso é analisado à parte. Consulte condições.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="servicos" className="py-14 md:py-16 bg-white border-b border-border scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-primary uppercase bg-bg-alt px-3.5 py-1.5 rounded-xl border border-primary/15">
            Serviços
          </span>
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-heading font-bold text-primary">
            Como a MorarLagos pode ajudar
          </h2>
          <p className="text-base text-text max-w-2xl mx-auto leading-relaxed">
            Compra, venda, locação e uma conversa honesta sobre investir na Região dos Lagos. Sem promessa de aprovação nem de prazo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white rounded-2xl p-6 sm:p-7 shadow-card border border-border hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-bg-alt flex items-center justify-center mb-4 border border-accent/30">
                  <Icon className={`w-6 h-6 ${service.iconClass}`} strokeWidth={1.5} />
                </div>
                <h3 className="font-heading font-bold text-primary text-lg leading-snug mb-2">
                  {service.title}
                </h3>
                <p className="text-base text-text leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
