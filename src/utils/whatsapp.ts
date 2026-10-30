export const COMPANY_NAME = 'MorarLagos Imóveis';
export const BROKER_ROLE = 'Imóveis';
export const CRECI_CARLOS = '104581';
export const CRECI_DENISE = '97293';
export const CRECI_CATIA = '107532';
export const CRECI = CRECI_DENISE;

export interface Broker {
  id: 'carlos' | 'denise' | 'catia';
  name: string;
  creci: string;
}

export const BROKERS: Broker[] = [
  { id: 'carlos', name: 'Carlos', creci: CRECI_CARLOS },
  { id: 'denise', name: 'Denise', creci: CRECI_DENISE },
  { id: 'catia', name: 'Catia', creci: CRECI_CATIA },
];

export const CRECI_LABEL = BROKERS.map((broker) => `${broker.name} CRECI ${broker.creci}`).join(' · ');
export const COMPANY_SLOGAN = 'Seu lugar. Seu sonho. Nosso compromisso.';
export const REGION_LABEL = 'Região dos Lagos — Cabo Frio, Rio das Ostras, Búzios e Arraial do Cabo';
export const BROKER_NAME = 'Carlos';

export const WHATSAPP_GREETING = 'Olá!';
export const WHATSAPP_DEFAULT_MESSAGE =
  'Olá! Vi o site da MorarLagos Imóveis e gostaria de saber mais sobre os imóveis disponíveis';

export interface Consultant {
  id: 'carlos' | 'denise';
  name: string;
  menuLabel: string;
  number: string;
  display: string;
  creci: string;
}

export const CONSULTANTS: Consultant[] = [
  {
    id: 'carlos',
    name: 'Carlos',
    menuLabel: 'Falar com o Carlos',
    number: '5521964066546',
    display: '+55 21 96406-6546',
    creci: CRECI_CARLOS,
  },
  {
    id: 'denise',
    name: 'Denise',
    menuLabel: 'Falar com a Denise',
    number: '5522992170024',
    display: '+55 22 99217-0024',
    creci: CRECI_DENISE,
  },
];

export const PRIMARY_CONSULTANT = CONSULTANTS[0];
export const PRIMARY_WHATSAPP_NUMBER = PRIMARY_CONSULTANT.number;
export const DISPLAY_PRIMARY_WHATSAPP = PRIMARY_CONSULTANT.display;

export const COMPANY_ADDRESS = 'Rua Mestre Vivim, 242, apto 304, Marlin, Cabo Frio – RJ, CEP 28906-150';
export const COMPANY_EMAIL = '';
export const COMPANY_WEBSITE = '';

export const INSTAGRAM_HANDLE = '@morarlagos';
export const INSTAGRAM_URL = 'https://www.instagram.com/morarlagos/';

export const INSTAGRAM_QUOTES: string[] = [];

export const MAP_QUERY = 'Rua Mestre Vivim, 242, Marlin, Cabo Frio - RJ, 28906-150';
export const MAP_EMBED_URL =
  'https://www.google.com/maps?q=Rua+Mestre+Vivim,+242,+Marlin,+Cabo+Frio+-+RJ,+28906-150&output=embed';

export const MAP_TITLE = 'Localização MorarLagos Imóveis';

export interface OfficeInfo {
  id: string;
  name: string;
  badge: string;
  address: string;
  phone: string;
  email: string;
  whatsappNumber: string;
  displayWhatsapp: string;
  mapQuery: string;
  mapEmbedUrl: string;
  hours: string;
}

export const MAIN_OFFICE: OfficeInfo = {
  id: 'cabo-frio',
  name: 'MorarLagos Imóveis',
  badge: 'Base em Cabo Frio',
  address: COMPANY_ADDRESS,
  phone: DISPLAY_PRIMARY_WHATSAPP,
  email: '',
  whatsappNumber: PRIMARY_WHATSAPP_NUMBER,
  displayWhatsapp: DISPLAY_PRIMARY_WHATSAPP,
  mapQuery: MAP_QUERY,
  mapEmbedUrl: MAP_EMBED_URL,
  hours: ''
};

/**
 * Generates WhatsApp URL with custom message.
 * Defaults to Carlos, the primary contact for property interest buttons.
 */
export function getWhatsAppUrl(message?: string, number: string = PRIMARY_WHATSAPP_NUMBER): string {
  const text = encodeURIComponent(message || WHATSAPP_DEFAULT_MESSAGE);
  return `https://wa.me/${number}?text=${text}`;
}

/**
 * Generates WhatsApp URL for a specific property. Always opens Carlos.
 */
export function getPropertyWhatsAppUrl(
  title: string,
  _code: string,
  price: number,
  neighborhood: string,
  category?: 'venda' | 'aluguel' | 'lancamento'
): string {
  const isRent = category === 'aluguel';
  const formattedPrice = price > 0
    ? isRent
      ? `${formatCurrencyBRL(price)} /mês (consulte condições)`
      : `a partir de ${formatCurrencyBRL(price)} (consulte condições)`
    : 'consulte condições';

  const message = `Olá! Vi o site da MorarLagos Imóveis e gostaria de saber mais sobre o imóvel "${title}" em ${neighborhood}. ${formattedPrice}.`;
  return getWhatsAppUrl(message, PRIMARY_WHATSAPP_NUMBER);
}

/**
 * Format currency to BRL string
 */
export function formatCurrencyBRL(value: number): string {
  if (!value || value <= 0) return 'Consulte condições';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value);
}
