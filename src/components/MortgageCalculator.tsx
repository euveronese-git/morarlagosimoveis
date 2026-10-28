import React, { useState } from 'react';
import { getWhatsAppUrl, formatCurrencyBRL, COMPANY_NAME, WHATSAPP_GREETING } from '../utils/whatsapp';
import { X, Calculator, MessageCircle, Info, Sparkles } from 'lucide-react';

interface MortgageCalculatorProps {
  initialPrice?: number;
  onClose: () => void;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  initialPrice = 220000,
  onClose
}) => {
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [termYears, setTermYears] = useState<number>(30);
  const [annualRate, setAnnualRate] = useState<number>(8.16);

  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;

  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  const totalMonths = termYears * 12;

  const monthlyInstallment = totalMonths > 0 && monthlyRate > 0
    ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    : 0;

  const handleSendWhatsAppSimulation = () => {
    const msg = `${WHATSAPP_GREETING} Fiz uma simulação no site, só para ter uma ideia:\n\n` +
      `- Valor do Imóvel: ${formatCurrencyBRL(propertyPrice)}\n` +
      `- Entrada (${downPaymentPercent}%): ${formatCurrencyBRL(downPaymentAmount)}\n` +
      `- Valor a Financiar: ${formatCurrencyBRL(loanAmount)}\n` +
      `- Prazo: ${termYears} anos (${totalMonths} parcelas)\n` +
      `- Parcela Estimada: ~${formatCurrencyBRL(monthlyInstallment)}/mês\n\n` +
      `Quero entender essas condições com a MorarLagos. Sei que é uma simulação e que a aprovação depende do banco. Consulte condições.`;

    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-text/80 backdrop-blur-sm">
      <div className="bg-white rounded-lg border border-border w-full max-w-2xl overflow-hidden relative flex flex-col my-auto shadow-lg max-h-[90vh]">
        <div className="bg-bg-alt px-6 py-5 flex items-center justify-between border-b border-border shrink-0">
          <div className="flex items-center gap-2.5">
            <Calculator className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg text-text font-heading">
              Simulador de Financiamento
            </h3>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-text p-1" aria-label="Fechar">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div>
            <div className="flex justify-between text-xs font-semibold text-text uppercase tracking-wider mb-2">
              <span>Valor do Imóvel</span>
              <span className="text-primary text-base font-semibold">{formatCurrencyBRL(propertyPrice)}</span>
            </div>
            <input
              type="range"
              min={120000}
              max={1200000}
              step={10000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-text uppercase tracking-wider mb-2">
              <span>Entrada estimada ({downPaymentPercent}%) — consulte condições</span>
              <span className="text-text-secondary text-sm font-semibold">{formatCurrencyBRL(downPaymentAmount)}</span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text uppercase tracking-wider mb-1">Prazo de Financiamento</label>
              <select
                value={termYears}
                onChange={(e) => setTermYears(Number(e.target.value))}
                className="w-full bg-bg-alt border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary"
              >
                <option value={15}>15 Anos (180 parcelas)</option>
                <option value={20}>20 Anos (240 parcelas)</option>
                <option value={25}>25 Anos (300 parcelas)</option>
                <option value={30}>30 Anos (360 parcelas)</option>
                <option value={35}>35 Anos (420 parcelas)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text uppercase tracking-wider mb-1">Modalidade / Taxa de Juros</label>
              <select
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full bg-bg-alt border border-border rounded-md px-3.5 py-2.5 text-xs text-text focus:outline-none focus:border-primary"
              >
                <option value={4.25}>4.25% a.a. (MCMV Faixa 1)</option>
                <option value={8.16}>8.16% a.a. (MCMV Faixa 2 e 3)</option>
                <option value={10.2}>10.2% a.a. (SBPE / Bancos Privados)</option>
              </select>
            </div>
          </div>

          <div className="bg-bg-alt p-5 rounded-lg border border-border space-y-3">
            <h4 className="text-xs font-semibold text-text uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Resultado Estimado do Financiamento
            </h4>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white p-3 rounded-md border border-border">
                <span className="text-[10px] text-text-secondary block uppercase font-semibold">Valor Financiado</span>
                <span className="text-base font-semibold text-text">{formatCurrencyBRL(loanAmount)}</span>
              </div>
              <div className="bg-primary text-white p-3 rounded-md shadow-sm">
                <span className="text-[10px] text-white/80 block uppercase font-semibold">1ª Parcela Estimada</span>
                <span className="text-lg font-semibold text-white">{formatCurrencyBRL(monthlyInstallment)}</span>
              </div>
            </div>

            <p className="text-[11px] text-text-secondary flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-primary shrink-0" />
              Simulação estimada, só para você ter uma ideia. Não é aprovação de crédito nem prazo garantido. Consulte condições.
            </p>
          </div>

          <button
            onClick={handleSendWhatsAppSimulation}
            className="w-full btn-primary text-xs uppercase tracking-widest py-3.5 rounded-md flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            Enviar simulação para {COMPANY_NAME} no WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};
