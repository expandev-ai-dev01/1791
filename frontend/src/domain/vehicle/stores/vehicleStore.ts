import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { VehicleFilters, SortOption } from '../types';

interface VehicleStore {
  filters: VehicleFilters;
  setFilters: (filters: Partial<VehicleFilters>) => void;
  resetFilters: () => void;
  setMarcas: (marcas: string[]) => void;
  setModelos: (modelos: string[]) => void;
  setAnoRange: (min?: number, max?: number) => void;
  setPrecoRange: (min?: number, max?: number) => void;
  setCambios: (cambios: string[]) => void;
  setOrdenacao: (ordenacao: SortOption) => void;
  setPagina: (pagina: number) => void;
  setItensPorPagina: (itensPorPagina: number) => void;
}

const defaultFilters: VehicleFilters = {
  marcas: [],
  modelos: [],
  anoMin: undefined,
  anoMax: undefined,
  precoMin: undefined,
  precoMax: undefined,
  cambios: [],
  ordenacao: 'relevancia',
  pagina: 1,
  itensPorPagina: 12,
};

export const useVehicleStore = create<VehicleStore>()(
  persist(
    (set) => ({
      filters: defaultFilters,

      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),

      resetFilters: () => set({ filters: defaultFilters }),

      setMarcas: (marcas) =>
        set((state) => {
          const currentModelos = state.filters.modelos;
          const filteredModelos = currentModelos;
          return {
            filters: {
              ...state.filters,
              marcas,
              modelos: marcas?.length ? filteredModelos : [],
            },
          };
        }),

      setModelos: (modelos) =>
        set((state) => ({
          filters: { ...state.filters, modelos },
        })),

      setAnoRange: (min, max) =>
        set((state) => ({
          filters: { ...state.filters, anoMin: min, anoMax: max },
        })),

      setPrecoRange: (min, max) =>
        set((state) => ({
          filters: { ...state.filters, precoMin: min, precoMax: max },
        })),

      setCambios: (cambios) =>
        set((state) => ({
          filters: { ...state.filters, cambios },
        })),

      setOrdenacao: (ordenacao) =>
        set((state) => ({
          filters: { ...state.filters, ordenacao },
        })),

      setPagina: (pagina) =>
        set((state) => ({
          filters: { ...state.filters, pagina },
        })),

      setItensPorPagina: (itensPorPagina) =>
        set((state) => ({
          filters: { ...state.filters, itensPorPagina, pagina: 1 },
        })),
    }),
    { name: 'vehicle-filters' }
  )
);
