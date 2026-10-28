export type PropertyType = 'casa' | 'apartamento' | 'cobertura' | 'comercial' | 'terreno';
export type ListingCategory = 'venda' | 'aluguel' | 'lancamento';

export interface Property {
  id: string;
  code: string; // e.g. ST-CG101, ST-JAC202, ST-REC303
  title: string;
  type: PropertyType;
  category: ListingCategory;
  price: number;
  condoFee?: number;
  iptuAnnual?: number;
  neighborhood: string;
  address: string;
  city: string;
  state: string;
  bedrooms: number;
  bathrooms: number;
  suites: number;
  parkingSpaces: number;
  areaSqM: number;
  featured: boolean;
  featuredBadge?: string; // e.g. "Minha Casa Minha Vida", "Lançamento", "Entrada Facilitada"
  description: string;
  images: string[];
  videos?: string[];
  features: string[];
  createdAt: string;
  isMcmvEligible?: boolean;
  downPaymentMin?: number;
}

export interface PropertyFilterState {
  category: 'todos' | 'venda' | 'aluguel' | 'lancamento';
  type: 'todos' | PropertyType;
  city: string;
  neighborhood: string;
  maxPrice: number;
  bedrooms: number | 'todos';
  searchTerm: string;
  sortBy: 'relevancia' | 'preco-asc' | 'preco-desc' | 'area-desc';
}

// Form 1: "Cadastrar meu Imóvel para Vender ou Avaliar"
export interface SellOrRentFormData {
  intentions: {
    vender: boolean;
    alugar: boolean;
  };
  name: string;
  email: string;
  mobile: string;
  phone: string;
  address: string;
  neighborhood: string;
  city: string;
  uf: string;
  notes: string;
}

// Form 2: "Simulação & Busca de Lançamento Minha Casa Minha Vida"
export interface BuyOrFindFormData {
  intentions: {
    comprar: boolean;
    alugar: boolean;
  };
  subType: 'mcmv' | 'lancamento' | 'pronto' | 'ambos';
  name: string;
  email: string;
  mobile: string;
  grossIncome: string; // Renda Familiar
  hasFgts: boolean;
  propertyType: PropertyType | 'todos';
  city: string;
  neighborhood: string;
  bedrooms: string;
  maxPrice: string;
  paymentMethod: 'financiamento' | 'vista' | 'mcmv' | 'outro';
  notes: string;
}
