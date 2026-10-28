import React, { useState } from 'react';
import { Property } from '../types';
import { getPropertyWhatsAppUrl, getWhatsAppUrl, formatCurrencyBRL, COMPANY_NAME } from '../utils/whatsapp';
import { 
  X, 
  BedDouble, 
  Bath, 
  Car, 
  Maximize2, 
  MapPin, 
  CheckCircle2, 
  MessageCircle, 
  Heart, 
  Calendar, 
  Calculator, 
  Building2,
  Share2,
  Check,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenMortgage: (price: number) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
  isFavorite,
  onToggleFavorite,
  onOpenMortgage
}) => {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [visitForm, setVisitForm] = useState({ name: '', phone: '', date: '', notes: '' });
  const [visitSubmitted, setVisitSubmitted] = useState(false);

  const whatsappUrl = getPropertyWhatsAppUrl(property.title, property.code, property.price, property.neighborhood, property.category);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVisitSubmitted(true);
    const visitMsg = `Olá! Vi o site da MorarLagos Imóveis e gostaria de agendar uma visita ao imóvel "${property.title}" em ${property.neighborhood}.\n\n- Nome: ${visitForm.name}\n- WhatsApp: ${visitForm.phone}\n- Data: ${visitForm.date}\n\nConsulte condições.`;
    
    setTimeout(() => {
      window.open(getWhatsAppUrl(visitMsg), '_blank');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-text/80 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Card */}
      <div className="bg-white rounded-3xl border border-border w-full max-w-5xl max-h-[92vh] overflow-y-auto relative flex flex-col my-auto shadow-2xl">
        
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-primary text-white font-mono text-xs px-3 py-1 rounded-full font-bold">
              {property.code}
            </span>
            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider hidden sm:inline">
              {property.type} • {property.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-text-secondary hover:text-primary transition-colors rounded-xl hover:bg-bg-alt"
              title="Copiar Link"
            >
              {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
            </button>

            <button
              onClick={() => onToggleFavorite(property.id)}
              className={`p-2 transition-colors rounded-xl hover:bg-bg-alt ${
                isFavorite ? 'text-primary' : 'text-text-secondary hover:text-primary'
              }`}
              title="Favoritar"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-primary transition-colors rounded-xl hover:bg-bg-alt"
              aria-label="Fechar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-8">
          
          {/* Gallery View */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] md:aspect-[21/9] bg-text rounded-3xl overflow-hidden shadow-md">
              <img
                src={property.images[activeImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3.5 py-1 rounded-md backdrop-blur-md">
                Foto {activeImageIndex + 1} de {property.images.length}
              </div>
            </div>

            {/* Thumbnails Row */}
            {property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 sm:w-28 aspect-[16/10] rounded-xl overflow-hidden shrink-0 transition-all border-2 ${
                      activeImageIndex === idx ? 'border-primary scale-105 shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {property.videos && property.videos.length > 0 && (
              <div className="space-y-3">
                {property.videos.map((video) => (
                  <video
                    key={video}
                    src={video}
                    controls
                    playsInline
                    className="w-full rounded-3xl bg-primary"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Title & Price Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{property.address} - {property.neighborhood}, {property.city} - {property.state}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-text leading-snug">
                {property.title}
              </h2>
            </div>

            <div className="bg-bg-alt p-5 rounded-3xl border border-border min-w-[240px]">
              <span className="text-sm text-text-secondary uppercase tracking-widest font-bold block">
                {property.category === 'aluguel' ? 'Valor da locação' : 'A partir de'}
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-primary font-heading">
                {formatCurrencyBRL(property.price)}
                {property.category === 'aluguel' && <span className="text-base font-medium text-text-secondary"> /mês</span>}
              </p>
              <p className="text-sm text-text mt-1">Consulte condições</p>
              <div className="flex flex-wrap gap-3 text-xs text-text-secondary mt-1 pt-1 border-t border-border">
                {property.condoFee && <span>Cond: R$ {property.condoFee.toLocaleString('pt-BR')}</span>}
                {property.iptuAnnual && <span>IPTU: R$ {property.iptuAnnual.toLocaleString('pt-BR')}/ano</span>}
              </div>
            </div>
          </div>

          {/* Metrics Summary Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-bg-alt p-4 rounded-3xl border border-border">
            <div className="flex items-center gap-3 p-2">
              <div className="p-3 bg-white rounded-2xl border border-border text-primary">
                <BedDouble className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-text-secondary/70 block font-bold">Quartos</span>
                <span className="text-sm font-bold text-text">{property.bedrooms} ({property.suites} suítes)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="p-3 bg-white rounded-2xl border border-border text-primary">
                <Bath className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-text-secondary/70 block font-bold">Banheiros</span>
                <span className="text-sm font-bold text-text">{property.bathrooms} banheiros</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="p-3 bg-white rounded-2xl border border-border text-primary">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-text-secondary/70 block font-bold">Vagas</span>
                <span className="text-sm font-bold text-text">{property.parkingSpaces} vagas</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="p-3 bg-white rounded-2xl border border-border text-primary">
                <Maximize2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-text-secondary/70 block font-bold">Área útil</span>
                <span className="text-sm font-bold text-text">{property.areaSqM} m²</span>
              </div>
            </div>
          </div>

          {/* Grid Details vs WhatsApp Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Details & Features */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Description */}
              <div className="bg-white p-6 rounded-3xl border border-border space-y-3">
                <h3 className="text-lg font-bold text-text flex items-center gap-2 font-heading">
                  <Building2 className="w-5 h-5 text-primary" />
                  Descrição do Imóvel
                </h3>
                <p className="text-base text-text leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Features Checklist */}
              <div className="bg-white p-6 rounded-3xl border border-border space-y-4">
                <h3 className="text-lg font-bold text-text font-heading">
                  Diferenciais & Infraestrutura
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-text-secondary">
                  {property.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 bg-bg-alt rounded-xl border border-border">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Banner: Mortgage Calculator trigger */}
              <div className="bg-primary-tint p-6 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 border border-primary/20">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-semibold text-lg text-text flex items-center justify-center sm:justify-start gap-2 font-heading">
                    <Calculator className="w-5 h-5 text-primary" />
                    Simular Financiamento Minha Casa Minha Vida
                  </h4>
                  <p className="text-base text-text">
                    Uma estimativa de parcela, só para você ter uma ideia. Não é aprovação de crédito. Consulte condições.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenMortgage(property.price);
                  }}
                  className="btn-primary text-xs font-bold uppercase tracking-wider py-3 px-5 rounded-xl transition-all shrink-0 shadow-sm"
                >
                  Simular Agora
                </button>
              </div>

            </div>

            {/* Right Col: WhatsApp CTA & Visit Form */}
            <div className="space-y-6">
              
              {/* WhatsApp Callout */}
              <div className="bg-primary-tint text-text p-6 rounded-3xl border border-primary/30 shadow-sm text-center space-y-4">
                <div className="inline-flex p-3 bg-primary text-white rounded-full shadow-md">
                  <MessageCircle className="w-8 h-8 fill-current" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-lg text-text font-heading">
                    Falar com a {COMPANY_NAME}
                  </h4>
                  <p className="text-base text-text">
                    Fale com a equipe no WhatsApp para tirar dúvidas ou marcar uma visita. Consulte condições.
                  </p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold text-base py-3.5 rounded-xl shadow-md transition-all min-h-11"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  Tenho interesse
                </a>
              </div>

              {/* Schedule Visit Form */}
              <div className="bg-white p-6 rounded-3xl border border-border shadow-sm space-y-4">
                <h4 className="font-bold text-base text-text flex items-center gap-2 font-heading">
                  <Calendar className="w-4 h-4 text-primary" />
                  Agendar Visita
                </h4>

                {visitSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <p className="text-xs font-bold text-emerald-950">Solicitação Enviada!</p>
                    <p className="text-[11px] text-emerald-800">
                      Abrindo WhatsApp para agendar sua visita presencial.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleVisitSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-text uppercase mb-1">Seu Nome *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Amanda Silva"
                        value={visitForm.name}
                        onChange={(e) => setVisitForm({ ...visitForm, name: e.target.value })}
                        className="w-full bg-bg-alt border border-border rounded-xl px-3 py-2 text-xs text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text uppercase mb-1">Seu WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="(21) 99999-9999"
                        value={visitForm.phone}
                        onChange={(e) => setVisitForm({ ...visitForm, phone: e.target.value })}
                        className="w-full bg-bg-alt border border-border rounded-xl px-3 py-2 text-xs text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text uppercase mb-1">Data Desejada *</label>
                      <input
                        type="date"
                        required
                        value={visitForm.date}
                        onChange={(e) => setVisitForm({ ...visitForm, date: e.target.value })}
                        className="w-full bg-bg-alt border border-border rounded-xl px-3 py-2 text-xs text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-primary text-xs uppercase tracking-wider py-3 rounded-xl shadow-md transition-all"
                    >
                      Solicitar Agendamento
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
