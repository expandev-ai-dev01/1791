import { Label } from '@/core/components';
import { useVehicleStore } from '../../stores';
import { SORT_OPTIONS } from '../../constants';
import type { VehicleSortProps } from './types';

export const VehicleSort = ({ onChange }: VehicleSortProps) => {
  const ordenacao = useVehicleStore((state) => state.filters.ordenacao);
  const setOrdenacao = useVehicleStore((state) => state.setOrdenacao);

  const handleChange = (value: string) => {
    setOrdenacao(value as any);
    onChange?.();
  };

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="sort" className="text-sm font-medium">
        Ordenar por:
      </Label>
      <select
        id="sort"
        value={ordenacao}
        onChange={(e) => handleChange(e?.target?.value)}
        className="rounded-sm border border-input bg-background px-3 py-2 text-sm focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-ring"
      >
        {SORT_OPTIONS?.map((option) => (
          <option key={option?.value} value={option?.value}>
            {option?.label}
          </option>
        ))}
      </select>
    </div>
  );
};
