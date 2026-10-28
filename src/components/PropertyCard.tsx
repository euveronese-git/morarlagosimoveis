import React from 'react';
import { Property } from '../types';
import { getPropertyWhatsAppUrl, formatCurrencyBRL } from '../utils/whatsapp';
import { Heart, BedDouble, Bath, Car, Maximize2, MessageCircle, Eye, MapPin, Sparkles } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
}) => {
  const whatsappUrl = getPropertyWhatsAppUrl(
    property.title,
    property.code,
    property.price,
    property.neighborhood,
    property.category
  );
  const showLaunch = property.featuredBadge === 'Lançamento' && property.category !== 'lancamento';
  const extraBadge = property.featuredBadge
    && property.featuredBadge !== 'Lançamento'
    && property.featuredBadge !== 'Minha Casa Minha Vida'
    ? property.featuredBadge
    : null;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-md transition-all duration-300 border border-border flex flex-col group">
      <div className="relative aspect-[4/3] overflow-hidden bg-bg-alt">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 right-14 flex flex-wrap gap-1.5 z-10">
          <span className="bg-white/95 text-primary text-[0.7rem] font-semibold px-3 py-1 rounded-lg uppercase tracking-wider border border-primary/15">
            {property.category === 'venda' ? 'Venda' : property.category === 'aluguel' ? 'Aluguel' : 'Lançamento'}
          </span>

          {property.isMcmvEligible && (
            <span className="bg-accent text-on-accent text-[0.7rem] font-semibold px-3 py-1 rounded-lg uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Minha Casa Minha Vida
            </span>
          )}

          {showLaunch && (
            <span className="bg-primary text-white text-[0.7rem] font-semibold px-3 py-1 rounded-lg uppercase tracking-wider">
              Lançamento
            </span>
          )}

          {extraBadge && (
            <span className="bg-white/95 text-primary text-[0.7rem] font-semibold px-3 py-1 rounded-lg uppercase tracking-wider border border-ocean/30">
              {extraBadge}
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all z-10 ${
            isFavorite
              ? 'bg-primary text-white shadow-sm'
              : 'bg-white/90 backdrop-blur-sm text-text-secondary hover:text-primary border border-border'
          }`}
          title={isFavorite ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
          <div>
            <span className="text-[0.7rem] text-white/90 uppercase font-medium tracking-widest block">
              {property.category === 'aluguel' ? 'Valor da locação' : 'A partir de'}
            </span>
            <p className="text-lg sm:text-2xl font-semibold text-white drop-shadow-sm font-heading">
              {formatCurrencyBRL(property.price)}
              {property.category === 'aluguel' && <span className="text-sm font-normal text-white/80"> /mês</span>}
            </p>
            <span className="text-[0.7rem] text-white/90">Consulte condições</span>
          </div>

          {property.condoFee ? (
            <span className="text-[10px] bg-white/90 backdrop-blur-sm border border-border px-2.5 py-1 rounded-md text-text-secondary font-medium">
              Cond: R$ {property.condoFee.toLocaleString('pt-BR')}
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          <div className="flex items-center justify-between gap-2 text-sm text-primary mb-1.5 font-semibold">
            <span className="flex items-center gap-1.5 min-w-0">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{property.neighborhood}, {property.city}</span>
            </span>
            <span className="text-xs font-medium text-text-secondary shrink-0">{property.code}</span>
          </div>

          <h3
            onClick={() => onSelectProperty(property)}
            className="font-bold text-base sm:text-lg text-primary hover:text-ocean transition-colors cursor-pointer line-clamp-2 mb-3 leading-snug font-heading"
          >
            {property.title}
          </h3>

          <div className="grid grid-cols-4 gap-2 py-3 border-y border-border my-3 text-xs text-text-secondary">
            {[
              { icon: BedDouble, value: property.bedrooms, label: 'Quartos' },
              { icon: Bath, value: property.bathrooms, label: 'Banheiros' },
              { icon: Car, value: property.parkingSpaces, label: 'Vagas' },
              { icon: Maximize2, value: property.areaSqM, label: 'm² útil' },
            ].map((metric) => (
              <div key={metric.label} className="flex flex-col items-center justify-center p-2 bg-bg-alt rounded-md">
                <span className="flex items-center gap-1 font-semibold text-text">
                  <metric.icon className="w-3.5 h-3.5 text-primary" />
                  {metric.value}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-text-secondary">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2 mt-2 pt-1">
          <button
            onClick={() => onSelectProperty(property)}
            className="flex items-center justify-center gap-1.5 bg-bg-alt hover:bg-border/50 text-primary font-semibold text-sm py-2.5 px-3 rounded-xl border border-border transition-colors min-h-11"
          >
            <Eye className="w-3.5 h-3.5 text-primary" />
            Ver detalhes
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold text-sm py-2.5 px-3 rounded-xl transition-all duration-300 min-h-11"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
            Tenho interesse
          </a>
        </div>
      </div>
    </div>
  );
};
