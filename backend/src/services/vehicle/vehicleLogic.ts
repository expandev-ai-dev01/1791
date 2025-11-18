import {
  VehicleEntity,
  VehicleListRequest,
  VehicleListResponse,
  FilterOptionsResponse,
  TransmissionType,
  SortCriteria,
  VehicleDetailEntity,
  VehicleStatus,
  FuelType,
  BodyType,
} from './vehicleTypes';

/**
 * @summary
 * In-memory storage for detailed vehicle data
 */
const vehiclesData: VehicleDetailEntity[] = [
  {
    id: '1',
    modelo: 'Civic',
    marca: 'Honda',
    ano: 2023,
    preco: 145000,
    imagemPrincipal: 'https://via.placeholder.com/800x450?text=Honda+Civic+2023',
    quilometragem: 5000,
    cambio: TransmissionType.Automatico,
    tituloAnuncio: 'Honda Civic 2.0 Sport 2023 - Impecável',
    status: VehicleStatus.Disponivel,
    fotos: [
      { url: 'https://via.placeholder.com/800x450?text=Honda+Civic+Frente' },
      { url: 'https://via.placeholder.com/800x450?text=Honda+Civic+Traseira' },
      { url: 'https://via.placeholder.com/800x450?text=Honda+Civic+Interior' },
      { url: 'https://via.placeholder.com/800x450?text=Honda+Civic+Roda' },
    ],
    especificacoes: {
      anoFabricacao: 2023,
      quilometragem: 5000,
      combustivel: FuelType.Flex,
      cambio: TransmissionType.Automatico,
      potencia: '158 cv',
      cor: 'Branco',
      portas: 4,
      carroceria: BodyType.Sedan,
      motor: '2.0',
      finalPlaca: 1,
    },
    itensSerie: [
      { nome: 'Ar condicionado digital', categoria: 'Conforto' },
      { nome: 'Direção elétrica', categoria: 'Conforto' },
      { nome: 'Freios ABS', categoria: 'Segurança' },
      { nome: '6 Airbags', categoria: 'Segurança' },
      { nome: 'Central multimídia', categoria: 'Tecnologia' },
    ],
    opcionais: [{ nome: 'Teto solar', categoria: 'Estética' }],
    historico: {
      procedencia: 'Concessionária',
      proprietarios: 1,
      garantia: 'Até 2026',
      revisoes: [{ data: '2023-10-01', quilometragem: 4800, local: 'Concessionária Honda' }],
    },
    condicoesVenda: {
      formasPagamento: ['À vista', 'Financiamento'],
      aceitaTroca: true,
    },
  },
  {
    id: '2',
    modelo: 'Corolla',
    marca: 'Toyota',
    ano: 2022,
    preco: 135000,
    imagemPrincipal: 'https://via.placeholder.com/800x450?text=Toyota+Corolla+2022',
    quilometragem: 15000,
    cambio: TransmissionType.CVT,
    tituloAnuncio: 'Toyota Corolla 2.0 XEi 2022 - Único Dono',
    status: VehicleStatus.Disponivel,
    fotos: [
      { url: 'https://via.placeholder.com/800x450?text=Toyota+Corolla+Frente' },
      { url: 'https://via.placeholder.com/800x450?text=Toyota+Corolla+Interior' },
    ],
    especificacoes: {
      anoFabricacao: 2022,
      quilometragem: 15000,
      combustivel: FuelType.Flex,
      cambio: TransmissionType.CVT,
      potencia: '177 cv',
      cor: 'Prata',
      portas: 4,
      carroceria: BodyType.Sedan,
      motor: '2.0',
      finalPlaca: 8,
    },
    itensSerie: [
      { nome: 'Ar condicionado', categoria: 'Conforto' },
      { nome: 'Direção elétrica', categoria: 'Conforto' },
      { nome: 'Controle de estabilidade', categoria: 'Segurança' },
      { nome: '7 Airbags', categoria: 'Segurança' },
      { nome: 'Piloto automático adaptativo', categoria: 'Tecnologia' },
    ],
    opcionais: [],
    historico: {
      procedencia: 'Particular',
      proprietarios: 1,
      revisoes: [{ data: '2023-01-15', quilometragem: 10000, local: 'Concessionária Toyota' }],
    },
    condicoesVenda: {
      formasPagamento: ['À vista', 'Financiamento', 'Consórcio'],
      aceitaTroca: true,
    },
  },
  {
    id: '5',
    modelo: 'Compass',
    marca: 'Jeep',
    ano: 2023,
    preco: 185000,
    imagemPrincipal: 'https://via.placeholder.com/800x450?text=Jeep+Compass+2023',
    quilometragem: 8000,
    cambio: TransmissionType.Automatico,
    tituloAnuncio: 'Jeep Compass Longitude 1.3 Turbo 2023',
    status: VehicleStatus.Disponivel,
    fotos: [
      { url: 'https://via.placeholder.com/800x450?text=Jeep+Compass+Frente' },
      { url: 'https://via.placeholder.com/800x450?text=Jeep+Compass+Interior' },
      { url: 'https://via.placeholder.com/800x450?text=Jeep+Compass+Detalhe' },
    ],
    especificacoes: {
      anoFabricacao: 2023,
      quilometragem: 8000,
      combustivel: FuelType.Flex,
      cambio: TransmissionType.Automatico,
      potencia: '185 cv',
      cor: 'Cinza',
      portas: 4,
      carroceria: BodyType.SUV,
      motor: '1.3',
      finalPlaca: 3,
    },
    itensSerie: [
      { nome: 'Bancos de couro', categoria: 'Conforto' },
      { nome: 'Freio de estacionamento eletrônico', categoria: 'Segurança' },
      { nome: 'Painel digital', categoria: 'Tecnologia' },
    ],
    opcionais: [{ nome: 'Teto solar panorâmico', categoria: 'Estética' }],
    historico: {
      procedencia: 'Concessionária',
      proprietarios: 1,
      garantia: 'Até 2026',
    },
    condicoesVenda: {
      formasPagamento: ['À vista', 'Financiamento'],
      aceitaTroca: false,
    },
  },
];

/**
 * @summary
 * Maps a detailed vehicle entity to a simple entity for list views.
 *
 * @function mapToVehicleEntity
 * @module vehicle
 *
 * @param {VehicleDetailEntity} vehicle - The detailed vehicle object
 * @returns {VehicleEntity} The simple vehicle object
 */
const mapToVehicleEntity = (vehicle: VehicleDetailEntity): VehicleEntity => ({
  id: vehicle.id,
  modelo: vehicle.modelo,
  marca: vehicle.marca,
  ano: vehicle.ano,
  preco: vehicle.preco,
  imagemPrincipal: vehicle.imagemPrincipal,
  quilometragem: vehicle.especificacoes.quilometragem,
  cambio: vehicle.especificacoes.cambio,
});

/**
 * @summary
 * Retrieves detailed information for a specific vehicle by its ID.
 *
 * @function vehicleGetById
 * @module vehicle
 *
 * @param {string} id - The unique identifier of the vehicle
 * @returns {Promise<VehicleDetailEntity | undefined>} The detailed vehicle object or undefined if not found
 */
export async function vehicleGetById(id: string): Promise<VehicleDetailEntity | undefined> {
  return vehiclesData.find((v) => v.id === id);
}

/**
 * @summary
 * Retrieves a list of similar vehicles based on the current vehicle's properties.
 *
 * @function getSimilarVehicles
 * @module vehicle
 *
 * @param {string} vehicleId - The ID of the vehicle to find similarities for
 * @returns {Promise<VehicleEntity[]>} A list of up to 6 similar vehicles
 */
export async function getSimilarVehicles(vehicleId: string): Promise<VehicleEntity[]> {
  const currentVehicle = await vehicleGetById(vehicleId);
  if (!currentVehicle) {
    return [];
  }

  const similar = vehiclesData
    .filter((v) => {
      if (v.id === vehicleId || v.status === VehicleStatus.Vendido) {
        return false;
      }
      const priceSimilarity = Math.abs(v.preco - currentVehicle.preco) / currentVehicle.preco < 0.2; // within 20% price range
      const yearSimilarity = Math.abs(v.ano - currentVehicle.ano) <= 2; // within 2 years
      const brandSimilarity = v.marca === currentVehicle.marca;
      const bodyTypeSimilarity =
        v.especificacoes.carroceria === currentVehicle.especificacoes.carroceria;

      return (brandSimilarity && priceSimilarity) || (bodyTypeSimilarity && yearSimilarity);
    })
    .slice(0, 6); // Max 6 similar vehicles

  return similar.map(mapToVehicleEntity);
}

/**
 * @summary
 * Lists vehicles with filtering, sorting, and pagination
 *
 * @function vehicleList
 * @module vehicle
 *
 * @param {VehicleListRequest} params - Listing parameters
 *
 * @returns {Promise<VehicleListResponse>} Paginated vehicle list with metadata
 */
export async function vehicleList(params: VehicleListRequest): Promise<VehicleListResponse> {
  let filteredVehicles = [...vehiclesData];

  if (params.marcas && params.marcas.length > 0) {
    filteredVehicles = filteredVehicles.filter((v) => params.marcas!.includes(v.marca));
  }

  if (params.modelos && params.modelos.length > 0) {
    filteredVehicles = filteredVehicles.filter((v) => params.modelos!.includes(v.modelo));
  }

  if (params.anoMin !== undefined) {
    filteredVehicles = filteredVehicles.filter((v) => v.ano >= params.anoMin!);
  }
  if (params.anoMax !== undefined) {
    filteredVehicles = filteredVehicles.filter((v) => v.ano <= params.anoMax!);
  }

  if (params.precoMin !== undefined) {
    filteredVehicles = filteredVehicles.filter((v) => v.preco >= params.precoMin!);
  }
  if (params.precoMax !== undefined) {
    filteredVehicles = filteredVehicles.filter((v) => v.preco <= params.precoMax!);
  }

  if (params.cambios && params.cambios.length > 0) {
    filteredVehicles = filteredVehicles.filter((v) =>
      params.cambios!.includes(v.especificacoes.cambio)
    );
  }

  const ordenacao = params.ordenacao || SortCriteria.Relevancia;
  switch (ordenacao) {
    case SortCriteria.PrecoMenor:
      filteredVehicles.sort((a, b) => a.preco - b.preco);
      break;
    case SortCriteria.PrecoMaior:
      filteredVehicles.sort((a, b) => b.preco - a.preco);
      break;
    case SortCriteria.AnoRecente:
      filteredVehicles.sort((a, b) => b.ano - a.ano);
      break;
    case SortCriteria.AnoAntigo:
      filteredVehicles.sort((a, b) => a.ano - b.ano);
      break;
    case SortCriteria.ModeloAZ:
      filteredVehicles.sort((a, b) => a.modelo.localeCompare(b.modelo));
      break;
    case SortCriteria.ModeloZA:
      filteredVehicles.sort((a, b) => b.modelo.localeCompare(a.modelo));
      break;
    case SortCriteria.Relevancia:
    default:
      break;
  }

  const total = filteredVehicles.length;
  const pagina = params.pagina || 1;
  const itensPorPagina = params.itensPorPagina || 12;
  const totalPaginas = Math.ceil(total / itensPorPagina);

  const adjustedPagina = pagina > totalPaginas && totalPaginas > 0 ? totalPaginas : pagina;

  const startIndex = (adjustedPagina - 1) * itensPorPagina;
  const endIndex = startIndex + itensPorPagina;
  const paginatedVehicles = filteredVehicles.slice(startIndex, endIndex);

  return {
    veiculos: paginatedVehicles.map(mapToVehicleEntity),
    total,
    pagina: adjustedPagina,
    itensPorPagina,
    totalPaginas,
  };
}

/**
 * @summary
 * Retrieves available filter options based on current catalog
 *
 * @function getFilterOptions
 * @module vehicle
 *
 * @returns {Promise<FilterOptionsResponse>} Available filter options
 */
export async function getFilterOptions(): Promise<FilterOptionsResponse> {
  const marcas = Array.from(new Set(vehiclesData.map((v) => v.marca))).sort();
  const modelos = Array.from(new Set(vehiclesData.map((v) => v.modelo))).sort();
  const anos = Array.from(new Set(vehiclesData.map((v) => v.ano))).sort((a, b) => b - a);
  const cambios = Array.from(
    new Set(
      vehiclesData.map((v) => v.especificacoes.cambio).filter((c): c is TransmissionType => !!c)
    )
  ).sort();

  return {
    marcas,
    modelos,
    anos,
    cambios,
  };
}
