import { formatKilometers } from '@/domain/vehicle';
import type { VehicleSpecsProps } from './types';

const SpecItem = ({ label, value }: { label: string; value?: string | number | null }) => {
  if (!value) return null;
  return (
    <div className="flex justify-between py-3 border-b">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
};

export const VehicleSpecs = ({ specs }: VehicleSpecsProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Especificações Técnicas</h2>
      <div className="flow-root">
        <div className="-my-3 divide-y">
          <SpecItem label="Ano Fabricação" value={specs?.anoFabricacao} />
          <SpecItem label="Ano Modelo" value={specs?.anoModelo} />
          <SpecItem label="Quilometragem" value={formatKilometers(specs?.quilometragem)} />
          <SpecItem label="Combustível" value={specs?.combustivel} />
          <SpecItem label="Câmbio" value={specs?.cambio} />
          <SpecItem label="Motor" value={specs?.motor} />
          <SpecItem label="Potência" value={specs?.potencia} />
          <SpecItem label="Carroceria" value={specs?.carroceria} />
          <SpecItem label="Cor" value={specs?.cor} />
          <SpecItem label="Portas" value={specs?.portas} />
          <SpecItem label="Final da Placa" value={specs?.finalPlaca} />
        </div>
      </div>
    </div>
  );
};
