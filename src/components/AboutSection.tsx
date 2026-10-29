import React from 'react';
import { CheckCircle2, MessageCircle, Home, MapPin } from 'lucide-react';
import {
  getWhatsAppUrl,
  COMPANY_SLOGAN,
  COMPANY_ADDRESS,
  BROKERS,
  REGION_LABEL,
} from '../utils/whatsapp';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-14 md:py-16 bg-white border-b border-border relative overflow-hidden scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <img
              src="/images/equipe-morarlagos.jpg"
              alt="Equipe MorarLagos Imóveis"
              className="w-full max-w-[28rem] mx-auto h-auto rounded-2xl shadow-card"
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-primary uppercase bg-bg-alt px-3 py-1 rounded-xl border border-primary/15">
                <Home className="w-4 h-4 text-accent" />
                Sobre a equipe
              </span>
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-heading font-bold text-primary leading-tight">
                Uma equipe para quem quer morar ou investir na Região dos Lagos
              </h2>
            </div>

            <p className="text-base text-text leading-relaxed">
              A MorarLagos é uma equipe de especialistas que ajuda pessoas a comprar, vender e alugar imóveis na Região dos Lagos. O foco é quem quer morar ou investir, incluindo Minha Casa Minha Vida e lançamentos, com base em Cabo Frio e atendimento também em Rio das Ostras, Búzios e Arraial do Cabo.
            </p>

            <blockquote className="border-l-2 border-accent pl-4 text-primary font-heading font-semibold text-lg">
              {COMPANY_SLOGAN}
            </blockquote>

            <p className="text-base text-text leading-relaxed">
              Carlos e Denise acompanham a conversa do primeiro contato até o fim da negociação. Valores, entrada, financiamento e investimento sempre com um “consulte condições”. Quem aprova crédito é o banco, e não há prazo nem rentabilidade garantidos.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { icon: CheckCircle2, title: 'Minha Casa Minha Vida', desc: 'Orientação simples sobre o programa e os lançamentos da região. Consulte condições.' },
                { icon: Home, title: 'Para morar ou investir', desc: 'Apartamentos e casas na Região dos Lagos, do primeiro imóvel a uma opção mais perto da praia.' },
                { icon: MessageCircle, title: 'WhatsApp direto', desc: 'Carlos e Denise respondem por aqui, sem formulário interminável.' },
                { icon: MapPin, title: 'Quatro cidades', desc: REGION_LABEL },
              ].map((item) => (
                <div key={item.title} className="p-4 bg-bg-alt rounded-2xl border border-border space-y-1.5 shadow-card">
                  <div className="flex items-center gap-2 font-semibold text-base text-primary">
                    <item.icon className="w-4 h-4 text-accent" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-base text-text">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-base text-text">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-1" />
                <span>{COMPANY_ADDRESS}</span>
              </p>
              <div className="space-y-1 text-sm text-text-secondary">
                {BROKERS.map((broker) => (
                  <p key={broker.id}>{broker.name} · CRECI {broker.creci}</p>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-4 items-stretch sm:items-center">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm sm:text-base font-semibold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 min-h-11"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Fale com um especialista</span>
              </a>

              <a
                href="#contato"
                className="btn-secondary text-sm sm:text-base font-semibold py-3.5 px-6 rounded-xl transition-all text-center min-h-11"
              >
                Ver contatos e mapa
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
