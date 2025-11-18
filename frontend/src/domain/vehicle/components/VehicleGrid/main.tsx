import { VehicleCard } from '../VehicleCard';
import type { VehicleGridProps } from './types';

export const VehicleGrid = ({ vehicles }: VehicleGridProps) => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      role="list"
      aria-label="Lista de veículos"
    >
      {vehicles?.map((vehicle) => (
        <div key={vehicle?.id} role="listitem">
          <VehicleCard vehicle={vehicle} />
        </div>
      ))}
    </div>
  );
};
