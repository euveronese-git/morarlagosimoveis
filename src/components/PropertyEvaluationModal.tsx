import React, { useState } from 'react';
import { getWhatsAppUrl, COMPANY_NAME, WHATSAPP_GREETING } from '../utils/whatsapp';
import { X, MessageCircle, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

interface PropertyEvaluationModalProps {
  onClose: () => void;
}

export const PropertyEvaluationModal: React.FC<PropertyEvaluationModalProps> = ({ onClose }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    intent: 'venda',
    propertyType: 'apartamento',
    neighborhood: 'Centro',
    address: '',
    expectedPrice: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const msg = `${WHATSAPP_GREETING} Vim pelo site e quero conversar sobre meu imóvel para ${form.intent.toUpperCase()}, sem compromisso:\n\n- Nome: ${form.name}\n- WhatsApp: ${form.phone}\n- Tipo: ${form.propertyType}\n- Endereço/Bairro: ${form.address}, ${form.neighborhood}\n- Ideia de valor: R$ ${form.expectedPrice || 'A definir'} (consulte condições)\n- Detalhes: ${form.notes || 'Nenhum'}`;

    setTimeout(() => {
      window.open(getWhatsAppUrl(msg), '_blank');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-text/80 backdrop-blur-sm">
      <div className="bg-white rounded-lg border border-border w-full max-w-xl overflow-hidden relative flex flex-col my-auto shadow-lg max-h-[90vh]">
        <div className="bg-bg-alt px-6 py-5 flex items-center justify-between border-b border-border shrink-0">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-primary fill-current" />
            <h3 className="font-semibold text-lg text-text font-heading">
              Avaliação e Cadastro de Imóvel
            </h3>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-text p-1" aria-label="Fechar">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
          <p className="text-xs text-text-secondary leading-relaxed">
            Quer anunciar seu imóvel em Cabo Frio ou na Região dos Lagos? Preencha os dados para uma conversa sem compromisso. Consulte condições.
          </p>

          {submitted ? (
            <div className="bg-primary-tint border border-primary/20 p-8 rounded-lg text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
              <h4 className="font-semibold text-xl text-text">Solicitação Enviada!</h4>
              <p className="text-xs text-text-secondary">
                Redirecionando você para o WhatsApp da {COMPANY_NAME}...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-text uppercase mb-1">Seu Nome Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Amanda Silva"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-bg-alt border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text uppercase mb-1">Seu WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(21) 99999-9999"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-bg-alt border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-text uppercase mb-1">Objetivo</label>
                  <select
                    value={form.intent}
                    onChange={(e) => setForm({ ...form, intent: e.target.value })}
                    className="w-full bg-bg-alt border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary"
                  >
                    <option value="venda">Quero Vender meu Imóvel</option>
                    <option value="avaliação">Solicitar Avaliação de Mercado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text uppercase mb-1">Tipo de Imóvel</label>
                  <select
                    value={form.propertyType}
                    onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                    className="w-full bg-bg-alt border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary"
                  >
                    <option value="apartamento">Apartamento</option>
                    <option value="casa">Casa em Condomínio</option>
                    <option value="terreno">Terreno</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text uppercase mb-1">Endereço / Bairro *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Centro, Cabo Frio"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-bg-alt border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text uppercase mb-1">Pretensão de Valor (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: R$ 250.000"
                  value={form.expectedPrice}
                  onChange={(e) => setForm({ ...form, expectedPrice: e.target.value })}
                  className="w-full bg-bg-alt border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-2 p-3.5 bg-primary-tint rounded-md border border-primary/20 text-[11px] text-text-secondary">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span>Atendimento discreto e de total confiança com a {COMPANY_NAME}.</span>
              </div>

              <button
                type="submit"
                className="w-full btn-primary text-xs uppercase tracking-widest py-3.5 rounded-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Falar com a {COMPANY_NAME} no WhatsApp
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
