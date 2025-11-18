import type { Vehicle } from '../../types';

export interface UseVehicleListReturn {
  vehicles: Vehicle[];
  total: number;
  pagina: number;
  itensPorPagina: number;
  totalPaginas: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
