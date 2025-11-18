export interface Vehicle {
  id: string;
  modelo: string;
  marca: string;
  ano: number;
  preco: number;
  imagemPrincipal: string;
  quilometragem?: number;
  cambio?: string;
}

export interface VehiclePhoto {
  url: string;
  legenda?: string;
}

export interface VehicleFeature {
  nome: string;
  categoria: 'Conforto' | 'Segurança' | 'Tecnologia' | 'Performance' | 'Estética';
}

export interface VehicleDetail {
  id: string;
  marca: string;
  modelo: string;
  ano: number;
  preco: number;
  status: 'Disponível' | 'Reservado' | 'Vendido';
  fotos: VehiclePhoto[];
  especificacoes: {
    anoFabricacao: number;
    anoModelo: number;
    quilometragem: number;
    combustivel: string;
    cambio: string;
    potencia: string;
    cor: string;
    portas: number;
    carroceria: string;
    motor: string;
    finalPlaca: number;
  };
  itens: VehicleFeature[];
  historico?: {
    procedencia: string;
    proprietarios: number;
    garantia?: string;
  };
  condicoesVenda?: {
    aceitaTroca: boolean;
    formasPagamento: string[];
  };
  veiculosSimilares: Vehicle[];
}

export interface VehicleListParams {
  marcas?: string[];
  modelos?: string[];
  anoMin?: number;
  anoMax?: number;
  precoMin?: number;
  precoMax?: number;
  cambios?: string[];
  ordenacao?: string;
  pagina?: number;
  itensPorPagina?: number;
}

export interface VehicleListResponse {
  veiculos: Vehicle[];
  total: number;
  pagina: number;
  itensPorPagina: number;
  totalPaginas: number;
}

export interface FilterOptions {
  marcas: string[];
  modelos: string[];
  anos: number[];
  cambios: string[];
}

export type SortOption =
  | 'relevancia'
  | 'preco-asc'
  | 'preco-desc'
  | 'ano-desc'
  | 'ano-asc'
  | 'modelo-asc'
  | 'modelo-desc';

export interface VehicleFilters {
  marcas: string[];
  modelos: string[];
  anoMin?: number;
  anoMax?: number;
  precoMin?: number;
  precoMax?: number;
  cambios: string[];
  ordenacao: SortOption;
  pagina: number;
  itensPorPagina: number;
}
