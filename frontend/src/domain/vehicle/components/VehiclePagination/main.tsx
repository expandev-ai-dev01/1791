import { Button } from '@/core/components';
import { useVehicleStore } from '../../stores';
import { ITEMS_PER_PAGE_OPTIONS } from '../../constants';
import type { VehiclePaginationProps } from './types';

export const VehiclePagination = ({
  total,
  pagina,
  itensPorPagina,
  totalPaginas,
  onChange,
}: VehiclePaginationProps) => {
  const setPagina = useVehicleStore((state) => state.setPagina);
  const setItensPorPagina = useVehicleStore((state) => state.setItensPorPagina);

  const handlePageChange = (newPage: number) => {
    setPagina(newPage);
    onChange?.();
    window?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (value: number) => {
    setItensPorPagina(value);
    onChange?.();
    window?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPaginas <= maxVisible) {
      for (let i = 1; i <= totalPaginas; i++) {
        pages.push(i);
      }
    } else {
      if (pagina <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPaginas);
      } else if (pagina >= totalPaginas - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPaginas - 3; i <= totalPaginas; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = pagina - 1; i <= pagina + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPaginas);
      }
    }

    return pages;
  };

  const startItem = (pagina - 1) * itensPorPagina + 1;
  const endItem = Math.min(pagina * itensPorPagina, total);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Exibindo {startItem}-{endItem} de {total} veículos
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Itens por página:</span>
          <select
            value={itensPorPagina}
            onChange={(e) => handleItemsPerPageChange(parseInt(e?.target?.value))}
            className="rounded-sm border border-input bg-background px-3 py-2 text-sm"
          >
            {ITEMS_PER_PAGE_OPTIONS?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <nav className="flex items-center justify-center gap-1" aria-label="Paginação">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(1)}
          disabled={pagina === 1}
          aria-label="Primeira página"
        >
          Primeira
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(pagina - 1)}
          disabled={pagina === 1}
          aria-label="Página anterior"
        >
          Anterior
        </Button>

        {getPageNumbers()?.map((page, index) =>
          typeof page === 'number' ? (
            <Button
              key={index}
              variant={page === pagina ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePageChange(page)}
              aria-label={`Página ${page}`}
              aria-current={page === pagina ? 'page' : undefined}
            >
              {page}
            </Button>
          ) : (
            <span key={index} className="px-2 text-muted-foreground">
              {page}
            </span>
          )
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(pagina + 1)}
          disabled={pagina === totalPaginas}
          aria-label="Próxima página"
        >
          Próxima
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(totalPaginas)}
          disabled={pagina === totalPaginas}
          aria-label="Última página"
        >
          Última
        </Button>
      </nav>
    </div>
  );
};
