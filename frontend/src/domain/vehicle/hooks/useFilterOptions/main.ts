import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services';
import type { UseFilterOptionsReturn } from './types';

export const useFilterOptions = (): UseFilterOptionsReturn => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['vehicle-filter-options'],
    queryFn: () => vehicleService.getFilterOptions(),
    staleTime: 1000 * 60 * 10,
  });

  return {
    marcas: data?.marcas ?? [],
    modelos: data?.modelos ?? [],
    anos: data?.anos ?? [],
    cambios: data?.cambios ?? [],
    isLoading,
    error: error as Error | null,
  };
};
