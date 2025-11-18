import { useNavigate } from 'react-router-dom';
import { Card } from '@/core/components';
import { formatPrice, formatKilometers, formatYear } from '../../utils';
import type { VehicleCardProps } from './types';

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/vehicle/${vehicle?.id}`);
  };

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e?.key === 'Enter' || e?.key === ' ') {
          handleClick();
        }
      }}
    >
      <div className="aspect-video w-full overflow-hidden rounded-sm mb-4">
        <img
          src={vehicle?.imagemPrincipal || '/placeholder-car.jpg'}
          alt={`${vehicle?.marca} ${vehicle?.modelo}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold line-clamp-1">
          {vehicle?.marca} {vehicle?.modelo}
        </h3>

        <p className="text-sm text-muted-foreground">{formatYear(vehicle?.ano)}</p>

        <p className="text-xl font-bold text-primary-600">{formatPrice(vehicle?.preco)}</p>

        {vehicle?.quilometragem !== undefined && (
          <p className="text-sm text-muted-foreground">{formatKilometers(vehicle.quilometragem)}</p>
        )}

        {vehicle?.cambio && (
          <p className="text-sm text-muted-foreground">Câmbio: {vehicle.cambio}</p>
        )}
      </div>
    </Card>
  );
};
