export interface VehiclePaginationProps {
  total: number;
  pagina: number;
  itensPorPagina: number;
  totalPaginas: number;
  onChange?: () => void;
}
