import type { VehicleDetail } from '../../types';

export interface UseVehicleDetailReturn {
  vehicle: VehicleDetail | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
