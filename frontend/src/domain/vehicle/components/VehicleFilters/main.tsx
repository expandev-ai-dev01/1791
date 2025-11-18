import { Button, Label } from '@/core/components';
import { useVehicleStore } from '../../stores';
import { useFilterOptions } from '../../hooks';
import type { VehicleFiltersProps } from './types';

export const VehicleFilters = ({ onApply }: VehicleFiltersProps) => {
  const filters = useVehicleStore((state) => state.filters);
  const setMarcas = useVehicleStore((state) => state.setMarcas);
  const setModelos = useVehicleStore((state) => state.setModelos);
  const setAnoRange = useVehicleStore((state) => state.setAnoRange);
  const setPrecoRange = useVehicleStore((state) => state.setPrecoRange);
  const setCambios = useVehicleStore((state) => state.setCambios);
  const resetFilters = useVehicleStore((state) => state.resetFilters);

  const { marcas, modelos, anos, cambios, isLoading } = useFilterOptions();

  const handleMarcaChange = (marca: string) => {
    const newMarcas = filters?.marcas?.includes(marca)
      ? filters.marcas.filter((m) => m !== marca)
      : [...(filters?.marcas ?? []), marca];
    setMarcas(newMarcas);
  };

  const handleModeloChange = (modelo: string) => {
    const newModelos = filters?.modelos?.includes(modelo)
      ? filters.modelos.filter((m) => m !== modelo)
      : [...(filters?.modelos ?? []), modelo];
    setModelos(newModelos);
  };

  const handleCambioChange = (cambio: string) => {
    const newCambios = filters?.cambios?.includes(cambio)
      ? filters.cambios.filter((c) => c !== cambio)
      : [...(filters?.cambios ?? []), cambio];
    setCambios(newCambios);
  };

  const handleApply = () => {
    onApply?.();
  };

  const handleReset = () => {
    resetFilters();
    onApply?.();
  };

  if (isLoading) {
    return <div className="p-4">Carregando filtros...</div>;
  }

  return (
    <div className="space-y-6 p-4 border rounded-sm bg-background">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filtros</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="mb-2 block">Marca</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {marcas?.map((marca) => (
              <label key={marca} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters?.marcas?.includes(marca)}
                  onChange={() => handleMarcaChange(marca)}
                  className="rounded border-border"
                />
                <span className="text-sm">{marca}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <Label className="mb-2 block">Modelo</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {modelos?.map((modelo) => (
              <label key={modelo} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters?.modelos?.includes(modelo)}
                  onChange={() => handleModeloChange(modelo)}
                  className="rounded border-border"
                />
                <span className="text-sm">{modelo}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <Label className="mb-2 block">Ano</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="anoMin" className="text-xs mb-1 block">
                Mínimo
              </Label>
              <select
                id="anoMin"
                value={filters?.anoMin ?? ''}
                onChange={(e) =>
                  setAnoRange(
                    e?.target?.value ? parseInt(e.target.value) : undefined,
                    filters?.anoMax
                  )
                }
                className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Todos</option>
                {anos?.map((ano) => (
                  <option key={ano} value={ano}>
                    {ano}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="anoMax" className="text-xs mb-1 block">
                Máximo
              </Label>
              <select
                id="anoMax"
                value={filters?.anoMax ?? ''}
                onChange={(e) =>
                  setAnoRange(
                    filters?.anoMin,
                    e?.target?.value ? parseInt(e.target.value) : undefined
                  )
                }
                className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Todos</option>
                {anos?.map((ano) => (
                  <option key={ano} value={ano}>
                    {ano}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <Label className="mb-2 block">Preço</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="precoMin" className="text-xs mb-1 block">
                Mínimo
              </Label>
              <input
                id="precoMin"
                type="number"
                value={filters?.precoMin ?? ''}
                onChange={(e) =>
                  setPrecoRange(
                    e?.target?.value ? parseFloat(e.target.value) : undefined,
                    filters?.precoMax
                  )
                }
                placeholder="R$ 0"
                className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="precoMax" className="text-xs mb-1 block">
                Máximo
              </Label>
              <input
                id="precoMax"
                type="number"
                value={filters?.precoMax ?? ''}
                onChange={(e) =>
                  setPrecoRange(
                    filters?.precoMin,
                    e?.target?.value ? parseFloat(e.target.value) : undefined
                  )
                }
                placeholder="R$ 0"
                className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <Label className="mb-2 block">Câmbio</Label>
          <div className="space-y-2">
            {cambios?.map((cambio) => (
              <label key={cambio} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters?.cambios?.includes(cambio)}
                  onChange={() => handleCambioChange(cambio)}
                  className="rounded border-border"
                />
                <span className="text-sm">{cambio}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t">
        <Button onClick={handleApply} className="flex-1">
          Aplicar Filtros
        </Button>
        <Button onClick={handleReset} variant="outline" className="flex-1">
          Limpar
        </Button>
      </div>
    </div>
  );
};
