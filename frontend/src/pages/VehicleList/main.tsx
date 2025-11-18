import { useEffect } from 'react';
import { LoadingSpinner } from '@/core/components';
import {
  VehicleGrid,
  VehicleFilters,
  VehicleSort,
  VehiclePagination,
  useVehicleList,
} from '@/domain/vehicle';

export const VehicleListPage = () => {
  const { vehicles, total, pagina, itensPorPagina, totalPaginas, isLoading, error, refetch } =
    useVehicleList();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="center min-h-[60vh]">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="center min-h-[60vh]">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Erro ao carregar veículos</h2>
            <p className="text-muted-foreground">
              Ocorreu um erro ao carregar a lista de veículos. Por favor, tente novamente.
            </p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-primary-500 text-white rounded-sm hover:bg-primary-600"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (total === 0 && !isLoading) {
    return (
      <div className="container py-8">
        <div className="center min-h-[60vh]">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Nenhum veículo encontrado</h2>
            <p className="text-muted-foreground">
              Não encontramos veículos com os filtros selecionados. Tente remover alguns filtros ou
              alterar os critérios de busca para ampliar os resultados.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Catálogo de Veículos</h1>
        <p className="text-muted-foreground">
          Encontramos {total} {total === 1 ? 'veículo' : 'veículos'} disponíveis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <VehicleFilters onApply={() => refetch()} />
        </aside>

        <main className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <VehicleSort onChange={() => refetch()} />
          </div>

          <VehicleGrid vehicles={vehicles} />

          {totalPaginas > 1 && (
            <VehiclePagination
              total={total}
              pagina={pagina}
              itensPorPagina={itensPorPagina}
              totalPaginas={totalPaginas}
              onChange={() => refetch()}
            />
          )}
        </main>
      </div>
    </div>
  );
};
