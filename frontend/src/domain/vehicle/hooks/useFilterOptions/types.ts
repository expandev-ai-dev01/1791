export interface UseFilterOptionsReturn {
  marcas: string[];
  modelos: string[];
  anos: number[];
  cambios: string[];
  isLoading: boolean;
  error: Error | null;
}
