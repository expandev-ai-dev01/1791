import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services';
import type { UseVehicleDetailReturn } from './types';

export const useVehicleDetail = (id?: string): UseVehicleDetailReturn => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['vehicle-detail', id],
    queryFn: () => (id ? vehicleService.getById(id) : Promise.resolve(null)),
    enabled: !!id,
    retry: 1,
  });

  return {
    vehicle: data ?? null,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
