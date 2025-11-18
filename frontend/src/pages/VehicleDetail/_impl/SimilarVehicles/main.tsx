import { VehicleCard } from '@/domain/vehicle';
import type { SimilarVehiclesProps } from './types';

export const SimilarVehicles = ({ vehicles }: SimilarVehiclesProps) => {
  if (!vehicles || vehicles.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 py-8">
      <h2 className="text-2xl font-bold">Veículos Similares</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles?.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};
