import React, { useState } from 'react';
import {
  getWhatsAppUrl,
  CONSULTANTS,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  COMPANY_NAME,
  CRECI_LABEL,
  COMPANY_ADDRESS,
  WHATSAPP_GREETING,
  MAP_EMBED_URL,
  MAP_TITLE,
} from '../utils/whatsapp';
import { MapPin, MessageCircle, Send, CheckCircle2, Instagram } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Minha Casa Minha Vida',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const textMsg = `${WHATSAPP_GREETING} Vi o site da MorarLagos Imóveis.\n\n- Nome: ${form.name}\n- E-mail: ${form.email || 'Não informado'}\n- WhatsApp: ${form.phone}\n- Assunto: ${form.subject}\n- Mensagem: ${form.message}\n\nGostaria de saber mais. Consulte condições.`;

    setTimeout(() => {
      window.open(getWhatsAppUrl(textMsg), '_blank');
    }, 600);
  };

  return (
    <section id="contato" className="py-14 md:py-16 bg-white border-t border-border relative scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-primary uppercase bg-bg-alt px-3.5 py-1.5 rounded-xl border border-primary/15">
            Contato
          </span>
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-heading font-bold text-primary">
            Fale com a {COMPANY_NAME}
          </h2>
          <p className="text-base text-text max-w-xl mx-auto">
            Atendimento em Cabo Frio e em toda a Região dos Lagos. Conte o que você procura. Entrada, financiamento e valores: consulte condições.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {CONSULTANTS.map((consultant) => (
            <div
              key={consultant.id}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-card flex flex-col gap-4"
            >
              <div>
                <h3 className="text-xl font-bold text-primary font-heading">{consultant.name}</h3>
                <p className="text-sm font-semibold text-primary">CRECI {consultant.creci}</p>
                <p className="text-base text-text mt-1">{consultant.display}</p>
              </div>
              <a
                href={getWhatsAppUrl(undefined, consultant.number)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold text-base py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 min-h-11"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>
          ))}
        </div>

        <div className="bg-bg-alt p-6 sm:p-8 rounded-2xl border border-border shadow-card mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-primary">{CRECI_LABEL}</p>
            <p className="text-base text-text flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-accent shrink-0 mt-1" />
              <span>{COMPANY_ADDRESS}</span>
            </p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-base text-primary hover:text-ocean"
          >
            <Instagram className="w-4 h-4 text-ocean" />
            <span>{INSTAGRAM_HANDLE}</span>
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border shadow-card mb-12">
          <iframe
            src={MAP_EMBED_URL}
            width="100%"
            height={450}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={MAP_TITLE}
            className="w-full h-[18.75rem] lg:h-[28.125rem]"
          />
        </div>

        <div className="max-w-2xl mx-auto w-full bg-bg-alt p-6 sm:p-8 rounded-2xl border border-border shadow-card space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-primary">
              Envie uma mensagem
            </h3>
            <p className="text-base text-text mt-1">
              O formulário abre o WhatsApp do Carlos com o que você escreveu.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white border border-primary/15 p-8 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
              <h4 className="text-xl font-bold text-primary">Mensagem encaminhada</h4>
              <p className="text-base text-text">
                Abrindo o WhatsApp...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary mb-1">Seu nome completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-base text-text focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-1">Celular / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(22) 99999-9999"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-base text-text focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-1">E-mail (opcional)</label>
                  <input
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-base text-text focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-1">Assunto</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-base text-text focus:outline-none focus:border-primary"
                >
                  <option value="Minha Casa Minha Vida">Minha Casa Minha Vida</option>
                  <option value="Lançamentos na Região dos Lagos">Lançamentos na Região dos Lagos</option>
                  <option value="Quero visitar um imóvel">Quero visitar um imóvel</option>
                  <option value="Locação">Locação</option>
                  <option value="Quero anunciar meu imóvel">Quero anunciar meu imóvel</option>
                  <option value="Outros assuntos">Outros assuntos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-1">Sua mensagem</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Conta o que você procura. Se quiser, fale de cidade, bairro e uma ideia de valor — consulte condições."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white border border-border rounded-xl px-3.5 py-2.5 text-base text-text focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary text-base font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 min-h-11"
              >
                <Send className="w-4 h-4" />
                <span>Enviar mensagem no WhatsApp</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
