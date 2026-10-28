import { Property } from '../types';
import { INITIAL_PROPERTIES } from './properties';

export const PROPERTIES_URL =
  'https://raw.githubusercontent.com/euveronese-git/morarlagosimoveis/main/content/imoveis.json';

function isPropertyList(value: unknown): value is Property[] {
  return Array.isArray(value) && value.length > 0 && value.every((item) => item && typeof item.id === 'string');
}

export async function loadProperties(): Promise<Property[]> {
  try {
    const response = await fetch(`${PROPERTIES_URL}?t=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) return INITIAL_PROPERTIES;
    const data = await response.json();
    const list = Array.isArray(data) ? data : data?.imoveis;
    return isPropertyList(list) ? list : INITIAL_PROPERTIES;
  } catch {
    return INITIAL_PROPERTIES;
  }
}
