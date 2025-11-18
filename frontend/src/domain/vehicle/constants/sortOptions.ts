import type { SortOption } from '../types';

export const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'preco-asc', label: 'Preço (menor para maior)' },
  { value: 'preco-desc', label: 'Preço (maior para menor)' },
  { value: 'ano-desc', label: 'Ano (mais recente)' },
  { value: 'ano-asc', label: 'Ano (mais antigo)' },
  { value: 'modelo-asc', label: 'Modelo (A-Z)' },
  { value: 'modelo-desc', label: 'Modelo (Z-A)' },
];

export const ITEMS_PER_PAGE_OPTIONS = [12, 24, 36, 48];
