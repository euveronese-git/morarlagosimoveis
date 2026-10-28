import React, { useEffect, useState } from 'react';
import { getWhatsAppUrl, COMPANY_NAME, WHATSAPP_GREETING } from '../utils/whatsapp';
import { SellOrRentFormData, BuyOrFindFormData, PropertyType } from '../types';
import {
  Home,
  MessageCircle,
  CheckCircle2,
  Key,
  Search,
  Sparkles,
  Heart,
  BadgePercent,
  Calculator,
} from 'lucide-react';

export const InteractiveFormsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vender' | 'comprar'>('comprar');

  const [sellForm, setSellForm] = useState<SellOrRentFormData>({
    intentions: { vender: true, alugar: false },
    name: '',
    email: '',
    mobile: '',
    phone: '',
    address: '',
    neighborhood: 'Centro',
    city: 'Cabo Frio',
    uf: 'RJ',
    notes: '',
  });

  const [buyForm, setBuyForm] = useState<BuyOrFindFormData>({
    intentions: { comprar: true, alugar: false },
    subType: 'mcmv',
    name: '',
    email: '',
    mobile: '',
    grossIncome: '3500',
    hasFgts: true,
    propertyType: 'apartamento',
    city: 'Cabo Frio',
    neighborhood: 'Centro',
    bedrooms: '2',
    maxPrice: '250000',
    paymentMethod: 'mcmv',
    notes: '',
  });

  const [sellSubmitted, setSellSubmitted] = useState(false);
  const [buySubmitted, setBuySubmitted] = useState(false);

  useEffect(() => {
    const syncTabWithHash = () => {
      if (window.location.hash === '#captacao') setActiveTab('vender');
      if (window.location.hash === '#simulador') setActiveTab('comprar');
    };
    syncTabWithHash();
    window.addEventListener('hashchange', syncTabWithHash);
    return () => window.removeEventListener('hashchange', syncTabWithHash);
  }, []);

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSellSubmitted(true);

    const msg =
      `${WHATSAPP_GREETING} Vim pelo site e quero cadastrar meu imóvel para venda, sem compromisso:\n\n` +
      `*Proprietário:* ${sellForm.name}\n` +
      `*E-mail:* ${sellForm.email || 'Não informado'}\n` +
      `*WhatsApp:* ${sellForm.mobile}\n` +
      `*Telefone Fix:* ${sellForm.phone || 'N/A'}\n\n` +
      `*Endereço do Imóvel:* ${sellForm.address}\n` +
      `*Bairro/Cidade:* ${sellForm.neighborhood}, ${sellForm.city} - ${sellForm.uf}\n` +
      `*Observações:* ${sellForm.notes || 'Nenhuma'}\n\n` +
      `Aguardando contato para avaliação sem compromisso!`;

    setTimeout(() => {
      window.open(getWhatsAppUrl(msg), '_blank');
    }, 600);
  };

  const handleBuySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBuySubmitted(true);

    const subTypeLabel =
      buyForm.subType === 'mcmv'
        ? 'Minha Casa Minha Vida (Lançamento)'
        : buyForm.subType === 'pronto'
          ? 'Imóvel Pronto p/ Morar'
          : 'Geral / Outros';

    const msg =
      `${WHATSAPP_GREETING} Vim pelo site e quero uma orientação sobre financiamento. Sei que a aprovação depende do banco. Consulte condições.\n\n` +
      `*Cliente:* ${buyForm.name}\n` +
      `*E-mail:* ${buyForm.email || 'Não informado'}\n` +
      `*WhatsApp:* ${buyForm.mobile}\n` +
      `*Renda Familiar Estimada:* R$ ${Number(buyForm.grossIncome || 0).toLocaleString('pt-BR')}\n` +
      `*Possui FGTS:* ${buyForm.hasFgts ? 'SIM' : 'NÃO'}\n\n` +
      `*Interesse do Imóvel:*\n` +
      `- Perfil: ${subTypeLabel}\n` +
      `- Tipo: ${buyForm.propertyType.toUpperCase()}\n` +
      `- Localização de Preferência: ${buyForm.neighborhood}, ${buyForm.city}\n` +
      `- Mínimo Dormitórios: ${buyForm.bedrooms}\n` +
      `- Valor Estimado: até R$ ${Number(buyForm.maxPrice || 0).toLocaleString('pt-BR')}\n` +
      `- Observações: ${buyForm.notes || 'Nenhuma'}\n\n` +
      `Quero entender as condições de entrada e financiamento. Consulte condições.`;

    setTimeout(() => {
      window.open(getWhatsAppUrl(msg), '_blank');
    }, 600);
  };

  return (
    <section id="simulador" className="py-14 md:py-16 bg-bg-alt border-y border-border relative overflow-hidden scroll-mt-32">
      <div id="captacao" className="scroll-mt-48" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase bg-primary-tint px-3.5 py-1.5 rounded-md border border-primary/30">
            <Heart className="w-4 h-4 text-primary fill-current" />
            Orientação sem compromisso
          </span>
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-heading font-bold text-primary">
            Conte o que você procura
          </h2>
          <p className="text-base text-text max-w-2xl mx-auto leading-relaxed">
            Quer comprar, alugar ou anunciar um imóvel na Região dos Lagos? A {COMPANY_NAME} orienta do início ao fim. Valores e financiamento: consulte condições.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white p-1.5 rounded-lg border border-border shadow-sm flex max-w-lg w-full">
            <button
              type="button"
              onClick={() => {
                setActiveTab('comprar');
                setBuySubmitted(false);
              }}
              className={`flex-1 py-3 px-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === 'comprar'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-text-secondary hover:text-primary hover:bg-bg-alt'
              }`}
            >
              <Calculator className="w-4 h-4" />
              1. Simular / Encontrar Imóvel
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('vender');
                setSellSubmitted(false);
              }}
              className={`flex-1 py-3 px-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === 'vender'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-text-secondary hover:text-primary hover:bg-bg-alt'
              }`}
            >
              <Key className="w-4 h-4" />
              2. Cadastrar / Vender Imóvel
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden max-w-4xl mx-auto">
          {activeTab === 'comprar' && (
            <div className="p-6 sm:p-10 space-y-6">
              <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-text flex items-center gap-2 font-heading">
                    <Search className="w-5 h-5 text-primary" />
                    Quero saber as condições do financiamento
                  </h3>
                  <p className="text-base text-text mt-1">
                    Conte seu perfil para a equipe te orientar. Entrada, parcelas e subsídio: consulte condições. A aprovação é do banco.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-primary-tint px-3 py-1 rounded-md border border-primary/30 self-start sm:self-auto">
                  Sem Compromisso
                </span>
              </div>

              {buySubmitted ? (
                <div className="bg-primary-tint border border-primary/20 p-8 rounded-lg text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
                  <h4 className="text-xl font-bold text-text">Solicitação Enviada!</h4>
                  <p className="text-xs text-text-secondary max-w-md mx-auto">
                    Redirecionando para o WhatsApp oficial da {COMPANY_NAME}...
                  </p>
                  <button
                    type="button"
                    onClick={() => setBuySubmitted(false)}
                    className="mt-4 btn-primary text-xs uppercase tracking-wider py-2.5 px-5 rounded-md"
                  >
                    Enviar Outra Simulação
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBuySubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-text uppercase tracking-wider">
                      1. Qual seu objetivo principal? *
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold">
                      <label
                        onClick={() => setBuyForm({ ...buyForm, subType: 'mcmv' })}
                        className={`p-3.5 rounded-md border cursor-pointer transition-all flex items-center gap-2.5 ${
                          buyForm.subType === 'mcmv'
                            ? 'bg-primary-tint text-primary border-primary ring-2 ring-primary/20'
                            : 'bg-bg-alt text-text-secondary border-border'
                        }`}
                      >
                        <BadgePercent className="w-4 h-4 text-primary" />
                        <span>Lançamento Minha Casa Minha Vida</span>
                      </label>

                      <label
                        onClick={() => setBuyForm({ ...buyForm, subType: 'pronto' })}
                        className={`p-3.5 rounded-md border cursor-pointer transition-all flex items-center gap-2.5 ${
                          buyForm.subType === 'pronto'
                            ? 'bg-primary-tint text-primary border-primary ring-2 ring-primary/20'
                            : 'bg-bg-alt text-text-secondary border-border'
                        }`}
                      >
                        <Home className="w-4 h-4 text-primary" />
                        <span>Imóvel Pronto para Morar</span>
                      </label>

                      <label
                        onClick={() => setBuyForm({ ...buyForm, subType: 'ambos' })}
                        className={`p-3.5 rounded-md border cursor-pointer transition-all flex items-center gap-2.5 ${
                          buyForm.subType === 'ambos'
                            ? 'bg-primary-tint text-primary border-primary ring-2 ring-primary/20'
                            : 'bg-bg-alt text-text-secondary border-border'
                        }`}
                      >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span>Quero Ver Ambas as Opções</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-bg-alt rounded-lg border border-border space-y-3">
                    <span className="block text-xs font-bold text-text uppercase">
                      2. Uma ideia de renda e FGTS
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">
                          Renda Familiar Bruta Estimada (R$)
                        </label>
                        <input
                          type="number"
                          step={500}
                          placeholder="Ex: 3500"
                          value={buyForm.grossIncome}
                          onChange={(e) => setBuyForm({ ...buyForm, grossIncome: e.target.value })}
                          className="w-full bg-white border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                        />
                      </div>

                      <div className="flex items-center gap-3 pt-4">
                        <label className="text-xs font-semibold text-text-secondary cursor-pointer flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={buyForm.hasFgts}
                            onChange={(e) => setBuyForm({ ...buyForm, hasFgts: e.target.checked })}
                            className="w-4 h-4 accent-primary rounded"
                          />
                          <span>Possuo mais de 3 anos de trabalho com saldo de FGTS</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-border">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
                      3. Seus Dados de Contato
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">Nome Completo *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Juliana Santos"
                          value={buyForm.name}
                          onChange={(e) => setBuyForm({ ...buyForm, name: e.target.value })}
                          className="w-full bg-bg-alt border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">
                          Celular / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="(21) 99999-9999"
                          value={buyForm.mobile}
                          onChange={(e) => setBuyForm({ ...buyForm, mobile: e.target.value })}
                          className="w-full bg-bg-alt border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-text-secondary mb-1">E-mail (Opcional)</label>
                        <input
                          type="email"
                          placeholder="seuemail@exemplo.com"
                          value={buyForm.email}
                          onChange={(e) => setBuyForm({ ...buyForm, email: e.target.value })}
                          className="w-full bg-bg-alt border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-border">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
                      4. Preferência de Região e Imóvel
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">Tipo de Imóvel</label>
                        <select
                          value={buyForm.propertyType}
                          onChange={(e) =>
                            setBuyForm({ ...buyForm, propertyType: e.target.value as PropertyType })
                          }
                          className="w-full bg-bg-alt border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                        >
                          <option value="apartamento">Apartamento</option>
                          <option value="casa">Casa em Condomínio</option>
                          <option value="terreno">Terreno</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">
                          Bairro(s) de Preferência
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Centro, Palmeiras ou Costazul"
                          value={buyForm.neighborhood}
                          onChange={(e) => setBuyForm({ ...buyForm, neighborhood: e.target.value })}
                          className="w-full bg-bg-alt border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">
                          Valor Máximo Estimado
                        </label>
                        <select
                          value={buyForm.maxPrice}
                          onChange={(e) => setBuyForm({ ...buyForm, maxPrice: e.target.value })}
                          className="w-full bg-bg-alt border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                        >
                          <option value="200000">Até R$ 200.000 (MCMV)</option>
                          <option value="250000">Até R$ 250.000 (MCMV)</option>
                          <option value="350000">Até R$ 350.000</option>
                          <option value="500000">Até R$ 500.000</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-1">
                        Observações ou Dúvidas Pessoais
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Ex: Preciso de piscina no condomínio, ou aceita entrada parcelada..."
                        value={buyForm.notes}
                        onChange={(e) => setBuyForm({ ...buyForm, notes: e.target.value })}
                        className="w-full bg-bg-alt border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary text-xs uppercase tracking-widest py-4 rounded-md shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Enviar no WhatsApp para {COMPANY_NAME}</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {activeTab === 'vender' && (
            <div className="p-6 sm:p-10 space-y-6">
              <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-text flex items-center gap-2 font-heading">
                    <Key className="w-5 h-5 text-primary" />
                    Formulário: Cadastrar Imóvel para Venda
                  </h3>
                  <p className="text-xs text-text-secondary/70 mt-1">
                    Anuncie seu imóvel com {COMPANY_NAME}. A avaliação é uma conversa, sem compromisso.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-primary bg-bg-alt px-3 py-1 rounded-md border border-primary/30 self-start sm:self-auto">
                  Avaliação Sem Compromisso
                </span>
              </div>

              {sellSubmitted ? (
                <div className="bg-primary-tint border border-primary/20 p-8 rounded-lg text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
                  <h4 className="text-xl font-bold text-text">Dados do Imóvel Recebidos!</h4>
                  <p className="text-xs text-text-secondary max-w-md mx-auto">
                    Redirecionando para o WhatsApp da {COMPANY_NAME} para agendar a vistoria e avaliação...
                  </p>
                  <button
                    type="button"
                    onClick={() => setSellSubmitted(false)}
                    className="mt-4 btn-primary text-xs uppercase tracking-wider py-2.5 px-5 rounded-md"
                  >
                    Enviar Outro Cadastro
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSellSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
                      1. Informações do Proprietário
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">Nome Completo *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Fernando Vasconcelos"
                          value={sellForm.name}
                          onChange={(e) => setSellForm({ ...sellForm, name: e.target.value })}
                          className="w-full bg-bg-alt border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">
                          Celular / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="(21) 99999-9999"
                          value={sellForm.mobile}
                          onChange={(e) => setSellForm({ ...sellForm, mobile: e.target.value })}
                          className="w-full bg-bg-alt border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-text-secondary mb-1">E-mail (Opcional)</label>
                        <input
                          type="email"
                          placeholder="seuemail@exemplo.com"
                          value={sellForm.email}
                          onChange={(e) => setSellForm({ ...sellForm, email: e.target.value })}
                          className="w-full bg-bg-alt border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-border">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
                      2. Dados do Imóvel a Ser Avaliado
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-text-secondary mb-1">
                          Endereço do Imóvel *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Avenida Teixeira e Souza, Centro"
                          value={sellForm.address}
                          onChange={(e) => setSellForm({ ...sellForm, address: e.target.value })}
                          className="w-full bg-bg-alt border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">Bairro *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Centro, Palmeiras ou Costazul"
                          value={sellForm.neighborhood}
                          onChange={(e) => setSellForm({ ...sellForm, neighborhood: e.target.value })}
                          className="w-full bg-bg-alt border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-1">
                        Detalhes do Imóvel / Valor Pretendido
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Informe número de quartos, vagas de garagem ou valor estimado de venda..."
                        value={sellForm.notes}
                        onChange={(e) => setSellForm({ ...sellForm, notes: e.target.value })}
                        className="w-full bg-bg-alt border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-secondary text-xs uppercase tracking-widest py-4 rounded-md shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Cadastrar Imóvel via WhatsApp com a {COMPANY_NAME}</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
