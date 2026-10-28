import React, { useEffect, useState } from 'react';
import { Property, PropertyFilterState, PropertyType } from '../types';
import { PropertyCard } from './PropertyCard';
import { COMPANY_NAME } from '../utils/whatsapp';
import { CITIES } from '../data/properties';
import { Search, SlidersHorizontal, RotateCcw, Home, Building2, Layers, LandPlot } from 'lucide-react';

interface PropertyGridProps {
  properties: Property[];
  filters: PropertyFilterState;
  onFilterChange: (filters: Partial<PropertyFilterState>) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onResetFilters: () => void;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  filters,
  onFilterChange,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  onResetFilters
}) => {
  const filteredProperties = properties.filter((prop) => {
    if (filters.category !== 'todos' && prop.category !== filters.category) return false;
    if (filters.city && prop.city !== filters.city) return false;
    if (filters.type !== 'todos' && prop.type !== filters.type) return false;
    if (filters.neighborhood && filters.neighborhood !== '' && !prop.neighborhood.toLowerCase().includes(filters.neighborhood.toLowerCase())) return false;
    if (prop.price > filters.maxPrice) return false;
    if (filters.bedrooms !== 'todos' && prop.bedrooms < filters.bedrooms) return false;
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      const matchTitle = prop.title.toLowerCase().includes(term);
      const matchCode = prop.code.toLowerCase().includes(term);
      const matchAddress = prop.address.toLowerCase().includes(term);
      const matchNeigh = prop.neighborhood.toLowerCase().includes(term);
      const matchCity = prop.city.toLowerCase().includes(term);
      const matchDesc = prop.description.toLowerCase().includes(term);
      if (!matchTitle && !matchCode && !matchAddress && !matchNeigh && !matchCity && !matchDesc) return false;
    }
    return true;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (filters.sortBy === 'preco-asc') return a.price - b.price;
    if (filters.sortBy === 'preco-desc') return b.price - a.price;
    if (filters.sortBy === 'area-desc') return b.areaSqM - a.areaSqM;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setShowAll(false);
  }, [filters.category, filters.type, filters.city, filters.neighborhood, filters.maxPrice, filters.bedrooms, filters.searchTerm]);

  const visibleProperties = showAll ? sortedProperties : sortedProperties.slice(0, 6);
  const shownCount = visibleProperties.length;

  const propertyTypesNav: { label: string; value: 'todos' | PropertyType; icon: React.ReactNode }[] = [
    { label: 'Todos', value: 'todos', icon: <Layers className="w-4 h-4" /> },
    { label: 'Apartamentos MCMV', value: 'apartamento', icon: <Building2 className="w-4 h-4" /> },
    { label: 'Casas', value: 'casa', icon: <Home className="w-4 h-4" /> },
    { label: 'Terrenos', value: 'terreno', icon: <LandPlot className="w-4 h-4" /> },
  ];

  return (
    <section id="imoveis" className="pt-8 pb-14 md:pt-10 md:pb-16 bg-bg-alt border-b border-border scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {import.meta.env.DEV && (
          <p className="mb-4 text-center text-sm text-text-secondary bg-white border border-dashed border-primary/30 rounded-xl px-4 py-2">
            Dados de exemplo — substituir por imóveis reais
          </p>
        )}

        <div className="text-center max-w-3xl mx-auto mb-6 space-y-2">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-heading font-bold text-primary">
            Imóveis na Região dos Lagos
          </h2>
          <p className="text-base text-text">
            Os valores são exemplos, a partir de, ou mensais no caso da locação. Entrada, aluguel e financiamento: consulte condições.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {propertyTypesNav.map((item) => (
            <button
              key={item.value}
              onClick={() => onFilterChange({ type: item.value })}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-all ${
                filters.type === item.value
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-text-secondary hover:text-primary border border-border'
              }`}
            >
              <span className={filters.type === item.value ? 'text-white' : 'text-primary'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-border mb-10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-card">
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <select
              value={filters.city}
              onChange={(e) => onFilterChange({ city: e.target.value, neighborhood: '' })}
              className="bg-bg-alt border border-border text-text px-3 py-2.5 rounded-md text-base focus:outline-none focus:border-primary"
              aria-label="Filtrar por cidade"
            >
              <option value="">Todas as cidades</option>
              {CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-ocean absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por código, bairro, rua..."
                value={filters.searchTerm}
                onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
                className="w-full bg-bg-alt border border-border text-text pl-10 pr-3 py-2.5 rounded-md text-base focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="text-base text-text-secondary font-medium text-center md:text-left">
            Exibindo <span className="font-semibold text-text">{shownCount}</span> de {properties.length} opções cadastradas
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-primary" />
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as PropertyFilterState['sortBy'] })}
              className="bg-bg-alt border border-border text-text px-3 py-2.5 rounded-md text-xs focus:outline-none focus:border-primary"
            >
              <option value="relevancia">Mais Recentes</option>
              <option value="preco-asc">Menor Valor</option>
              <option value="preco-desc">Maior Valor</option>
              <option value="area-desc">Maior área (m²)</option>
            </select>

            <button
              onClick={onResetFilters}
              className="p-2.5 text-text-secondary hover:text-primary bg-bg-alt border border-border rounded-md"
              title="Redefinir Filtros"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {sortedProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {visibleProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  isFavorite={favorites.includes(prop.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelectProperty={onSelectProperty}
                />
              ))}
            </div>
            {sortedProperties.length > 6 && !showAll && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="btn-secondary text-sm sm:text-base font-semibold py-3 px-6 rounded-xl"
                >
                  Ver mais imóveis
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white p-12 rounded-2xl text-center max-w-lg mx-auto border border-border shadow-card space-y-4">
            <div className="w-16 h-16 bg-primary-tint text-primary rounded-full flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-text font-heading">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-base text-text">
              Não encontramos imóveis com esses filtros. Fale com {COMPANY_NAME} no WhatsApp para ver outras opções na região.
            </p>
            <button
              onClick={onResetFilters}
              className="btn-primary text-xs uppercase tracking-wider py-3 px-6 rounded-md"
            >
              <RotateCcw className="w-4 h-4 inline-block mr-1" />
              Redefinir Filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
