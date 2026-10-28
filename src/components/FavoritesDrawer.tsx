import React from 'react';
import { Property } from '../types';
import { getPropertyWhatsAppUrl, formatCurrencyBRL, COMPANY_NAME } from '../utils/whatsapp';
import { X, Heart, Trash2, MessageCircle } from 'lucide-react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteProperties: Property[];
  onRemoveFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favoriteProperties,
  onRemoveFavorite,
  onSelectProperty
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-text/80 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md h-full shadow-lg border-l border-border flex flex-col justify-between max-h-[100dvh]">
        <div className="p-5 bg-bg-alt flex items-center justify-between border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary fill-current" />
            <h3 className="font-semibold text-lg text-text font-heading">
              Imóveis Salvos ({favoriteProperties.length})
            </h3>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-text p-1" aria-label="Fechar">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-4 bg-bg-alt">
          {favoriteProperties.length > 0 ? (
            favoriteProperties.map((prop) => (
              <div key={prop.id} className="bg-white p-3 rounded-lg border border-border shadow-sm flex gap-3 relative group">
                <img
                  src={prop.images[0]}
                  alt={prop.title}
                  className="w-24 h-24 object-cover rounded-md shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <span className="text-[10px] font-mono text-primary font-semibold block">{prop.code}</span>
                    <h4
                      onClick={() => {
                        onClose();
                        onSelectProperty(prop);
                      }}
                      className="font-semibold text-sm text-text truncate cursor-pointer hover:text-primary font-heading"
                    >
                      {prop.title}
                    </h4>
                    <p className="text-xs font-semibold text-primary mt-0.5">
                      {formatCurrencyBRL(prop.price)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border mt-1">
                    <button
                      onClick={() => onRemoveFavorite(prop.id)}
                      className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remover
                    </button>

                    <a
                      href={getPropertyWhatsAppUrl(prop.title, prop.code, prop.price, prop.neighborhood)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] bg-whatsapp hover:bg-whatsapp-hover text-white px-2.5 py-1 font-semibold uppercase tracking-wider rounded-md flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      Contato
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-text-secondary space-y-3">
              <Heart className="w-12 h-12 text-border mx-auto" />
              <p className="text-sm font-semibold text-primary font-heading">Nenhum imóvel salvo nos favoritos.</p>
              <p className="text-xs text-text-secondary max-w-xs mx-auto">
                Clique no ícone de coração nos cards de imóveis para salvá-los nesta lista.
              </p>
            </div>
          )}
        </div>

        {favoriteProperties.length > 0 && (
          <div className="p-4 bg-white border-t border-border shrink-0">
            <a
              href={getPropertyWhatsAppUrl(
                `Lista de ${favoriteProperties.length} imóveis salvos nos meus favoritos`,
                'FAVORITOS',
                0,
                'Região dos Lagos'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-primary text-xs uppercase tracking-widest py-3.5 rounded-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Enviar lista para {COMPANY_NAME} no WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
