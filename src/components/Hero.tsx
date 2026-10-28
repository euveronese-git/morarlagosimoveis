import React from 'react';
import { PropertyFilterState } from '../types';
import { CITIES, NEIGHBORHOODS_BY_CITY, NEIGHBORHOODS_RIO } from '../data/properties';
import { Search, Home, MapPin, BedDouble, ArrowRight, CheckCircle2, MessageCircle, BadgePercent } from 'lucide-react';
import { COMPANY_SLOGAN, getWhatsAppUrl } from '../utils/whatsapp';

interface HeroProps {
  filters: PropertyFilterState;
  onFilterChange: (filters: Partial<PropertyFilterState>) => void;
  onSearchSubmit: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  filters,
  onFilterChange,
  onSearchSubmit,
}) => {
  const handleCategoryClick = (category: 'todos' | 'venda' | 'aluguel' | 'lancamento') => {
    onFilterChange({ category });
  };

  const handleSearchClick = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
    const section = document.getElementById('imoveis');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const neighborhoodOptions = filters.city
    ? ['Todos os Bairros', ...(NEIGHBORHOODS_BY_CITY[filters.city] ?? [])]
    : NEIGHBORHOODS_RIO;

  const handleCityChange = (city: string) => {
    const allowed = city ? (NEIGHBORHOODS_BY_CITY[city] ?? []) : [];
    const neighborhoodStillValid = !city || !filters.neighborhood || allowed.includes(filters.neighborhood);
    onFilterChange({
      city,
      neighborhood: neighborhoodStillValid ? filters.neighborhood : '',
    });
  };

  return (
    <section id="inicio" className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden bg-primary text-white scroll-mt-32">
      <div className="pointer-events-none absolute -right-16 -top-10 h-56 w-56 rounded-full border border-accent/40" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-20 bottom-16 h-40 w-40 rounded-full border border-accent/25" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
        <div className="max-w-3xl mb-6">
          <p className="text-sm font-semibold tracking-[0.16em] uppercase text-accent mb-3">
            Cabo Frio e Região dos Lagos
          </p>
          <h1 className="font-heading font-bold text-white leading-[1.15] mb-3 tracking-tight text-[clamp(1.7rem,4.6vw,3.4rem)] max-w-full">
            Seu lugar na <span className="text-accent">Região dos Lagos</span> está aqui
          </h1>

          <p className="text-base text-white/85 leading-relaxed max-w-2xl">
            Compra para morar ou investir, com Minha Casa Minha Vida e lançamentos em Cabo Frio, Rio das Ostras, Búzios e Arraial do Cabo. Entrada, financiamento e valores: consulte condições.
          </p>
          <p className="mt-3 text-base font-heading font-semibold text-accent">
            {COMPANY_SLOGAN}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6 max-w-xl">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 btn-primary text-sm sm:text-base font-semibold px-5 py-3.5 min-h-11"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            Fale com um especialista
          </a>
          <a
            href="#imoveis"
            className="inline-flex items-center justify-center btn-on-dark text-sm sm:text-base font-semibold px-5 py-3.5 min-h-11"
          >
            Ver imóveis
          </a>
        </div>

        <div className="bg-white text-text rounded-2xl border border-border p-4 sm:p-5 max-w-5xl shadow-card">
          <div className="flex flex-wrap gap-2 mb-3 border-b border-border pb-3">
            {[
              { key: 'todos' as const, label: 'Todos os imóveis' },
              { key: 'lancamento' as const, label: 'Lançamentos' },
              { key: 'venda' as const, label: 'Comprar' },
              { key: 'aluguel' as const, label: 'Alugar' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleCategoryClick(tab.key)}
                className={`px-4 sm:px-5 py-2.5 text-sm font-semibold tracking-wide rounded-xl transition-all ${
                  filters.category === tab.key
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:bg-bg-alt'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearchClick} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-semibold text-primary mb-1.5 flex items-center gap-1.5">
                <Home className="w-4 h-4 text-accent" />
                Tipo de imóvel
              </label>
              <select
                value={filters.type}
                onChange={(e) => onFilterChange({ type: e.target.value as PropertyFilterState['type'] })}
                className="w-full bg-bg-alt border border-border text-text rounded-xl px-3.5 py-3 text-base focus:outline-none focus:border-primary"
              >
                <option value="todos">Todos os tipos</option>
                <option value="apartamento">Apartamentos</option>
                <option value="casa">Casas</option>
                <option value="terreno">Terrenos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-ocean" />
                Cidade
              </label>
              <select
                value={filters.city}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full bg-bg-alt border border-border text-text rounded-xl px-3.5 py-3 text-base focus:outline-none focus:border-primary"
              >
                <option value="">Todas as cidades</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-accent" />
                Bairro
              </label>
              <select
                value={filters.neighborhood}
                onChange={(e) => onFilterChange({ neighborhood: e.target.value })}
                className="w-full bg-bg-alt border border-border text-text rounded-xl px-3.5 py-3 text-base focus:outline-none focus:border-primary"
              >
                {neighborhoodOptions.map((nb) => (
                  <option key={nb} value={nb === 'Todos os Bairros' ? '' : nb}>
                    {nb}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-1.5 flex items-center gap-1.5">
                <BedDouble className="w-4 h-4 text-ocean" />
                Quartos
              </label>
              <select
                value={filters.bedrooms}
                onChange={(e) => onFilterChange({ bedrooms: e.target.value === 'todos' ? 'todos' : Number(e.target.value) })}
                className="w-full bg-bg-alt border border-border text-text rounded-xl px-3.5 py-3 text-base focus:outline-none focus:border-primary"
              >
                <option value="todos">Qualquer quantidade</option>
                <option value="1">1+ quarto</option>
                <option value="2">2+ quartos</option>
                <option value="3">3+ quartos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-1.5 flex items-center gap-1.5">
                <BadgePercent className="w-4 h-4 text-accent" />
                Valor máximo
              </label>
              <select
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
                className="w-full bg-bg-alt border border-border text-text rounded-xl px-3.5 py-3 text-base focus:outline-none focus:border-primary"
              >
                <option value={20000000}>Sem limite</option>
                <option value={250000}>Até R$ 250.000</option>
                <option value={400000}>Até R$ 400.000</option>
                <option value={700000}>Até R$ 700.000</option>
                <option value={1200000}>Até R$ 1.200.000</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full btn-primary text-sm sm:text-base font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group min-h-11"
              >
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Buscar imóveis</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>

        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl">
          {[
            { icon: BadgePercent, title: 'Minha Casa Minha Vida', sub: 'E lançamentos na região' },
            { icon: MessageCircle, title: 'WhatsApp', sub: 'Atendimento direto' },
            { icon: CheckCircle2, title: 'Do início ao fim', sub: 'Assessoria na negociação' },
            { icon: MapPin, title: 'Região dos Lagos', sub: 'Cabo Frio e entorno' },
          ].map((item) => (
            <div key={item.title} className="bg-white p-3 rounded-2xl border border-border text-center shadow-card">
              <item.icon className="w-5 h-5 text-accent mx-auto mb-1.5" />
              <span className="block text-sm sm:text-base font-semibold text-primary">{item.title}</span>
              <span className="text-sm text-text-secondary">{item.sub}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 text-bg-alt leading-[0]" aria-hidden="true">
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="w-full h-10 sm:h-14">
          <path
            fill="currentColor"
            d="M0 36c120 18 240 26 360 16 160-14 240-40 400-36 150 4 250 34 400 28 110-4 200-24 280-28v48H0V36z"
          />
        </svg>
      </div>
    </section>
  );
};
