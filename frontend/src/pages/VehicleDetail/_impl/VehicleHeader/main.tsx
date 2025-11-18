import { formatPrice } from '@/domain/vehicle';
import { cn } from '@/core/utils';
import type { VehicleHeaderProps } from './types';

export const VehicleHeader = ({ vehicle }: VehicleHeaderProps) => {
  const statusClasses = {
    Disponível: 'bg-green-100 text-green-800',
    Reservado: 'bg-yellow-100 text-yellow-800',
    Vendido: 'bg-red-100 text-red-800',
  };

  return (
    <div className="pb-6 border-b">
      <h1 className="text-3xl lg:text-4xl font-bold">
        {vehicle?.marca} {vehicle?.modelo}
      </h1>
      <p className="text-lg text-muted-foreground mt-1">{vehicle?.ano}</p>
      <div className="flex items-baseline gap-4 mt-4">
        <p className="text-3xl font-bold text-primary-600">{formatPrice(vehicle?.preco)}</p>
        {vehicle?.status && (
          <span
            className={cn(
              'px-2.5 py-0.5 text-sm font-semibold rounded-full',
              statusClasses[vehicle.status] ?? 'bg-gray-100 text-gray-800'
            )}
          >
            {vehicle.status}
          </span>
        )}
      </div>
    </div>
  );
};
