import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services';
import { useVehicleStore } from '../../stores';
import type { UseVehicleListReturn } from './types';

export const useVehicleList = (): UseVehicleListReturn => {
  const filters = useVehicleStore((state) => state.filters);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['vehicles', filters],
    queryFn: () => vehicleService.list(filters),
    retry: 3,
    retryDelay: 2000,
  });

  return {
    vehicles: data?.veiculos ?? [],
    total: data?.total ?? 0,
    pagina: data?.pagina ?? 1,
    itensPorPagina: data?.itensPorPagina ?? 12,
    totalPaginas: data?.totalPaginas ?? 0,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
