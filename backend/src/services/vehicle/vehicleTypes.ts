/**
 * @interface VehicleEntity
 * @description Represents a vehicle entity for list views
 *
 * @property {string} id - Unique vehicle identifier
 * @property {string} modelo - Vehicle model name
 * @property {string} marca - Vehicle brand/manufacturer
 * @property {number} ano - Vehicle model year
 * @property {number} preco - Vehicle price in BRL
 * @property {string} imagemPrincipal - URL of the main vehicle image
 * @property {number | null} quilometragem - Vehicle mileage in kilometers
 * @property {string | null} cambio - Transmission type
 */
export interface VehicleEntity {
  id: string;
  modelo: string;
  marca: string;
  ano: number;
  preco: number;
  imagemPrincipal: string;
  quilometragem: number | null;
  cambio: string | null;
}

/**
 * @interface VehicleListRequest
 * @description Request parameters for vehicle listing with filters and pagination
 */
export interface VehicleListRequest {
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

/**
 * @interface VehicleListResponse
 * @description Response structure for vehicle listing
 */
export interface VehicleListResponse {
  veiculos: VehicleEntity[];
  total: number;
  pagina: number;
  itensPorPagina: number;
  totalPaginas: number;
}

/**
 * @interface FilterOptionsResponse
 * @description Available filter options based on current catalog
 */
export interface FilterOptionsResponse {
  marcas: string[];
  modelos: string[];
  anos: number[];
  cambios: string[];
}

/**
 * @enum TransmissionType
 * @description Valid transmission types
 */
export enum TransmissionType {
  Manual = 'Manual',
  Automatico = 'Automático',
  CVT = 'CVT',
  SemiAutomatico = 'Semi-automático',
}

/**
 * @enum SortCriteria
 * @description Valid sort criteria for vehicle listing
 */
export enum SortCriteria {
  Relevancia = 'Relevância',
  PrecoMenor = 'Preço (menor para maior)',
  PrecoMaior = 'Preço (maior para menor)',
  AnoRecente = 'Ano (mais recente)',
  AnoAntigo = 'Ano (mais antigo)',
  ModeloAZ = 'Modelo (A-Z)',
  ModeloZA = 'Modelo (Z-A)',
}

// --- NEW TYPES FOR VEHICLE DETAIL VIEW ---

/**
 * @interface Photo
 * @description Represents a vehicle photo with an optional caption
 */
export interface Photo {
  url: string;
  legenda?: string;
}

/**
 * @enum VehicleStatus
 * @description Represents the availability status of a vehicle
 */
export enum VehicleStatus {
  Disponivel = 'Disponível',
  Reservado = 'Reservado',
  Vendido = 'Vendido',
}

/**
 * @enum FuelType
 * @description Represents the fuel type of a vehicle
 */
export enum FuelType {
  Gasolina = 'Gasolina',
  Etanol = 'Etanol',
  Flex = 'Flex',
  Diesel = 'Diesel',
  Eletrico = 'Elétrico',
  Hibrido = 'Híbrido',
}

/**
 * @enum BodyType
 * @description Represents the body type of a vehicle
 */
export enum BodyType {
  Hatch = 'Hatch',
  Sedan = 'Sedan',
  SUV = 'SUV',
  Picape = 'Picape',
  Minivan = 'Minivan',
  Conversivel = 'Conversível',
  Cupe = 'Cupê',
  Wagon = 'Wagon',
}

/**
 * @interface Specification
 * @description Represents the technical specifications of a vehicle
 */
export interface Specification {
  anoFabricacao: number;
  quilometragem: number;
  combustivel: FuelType;
  cambio: TransmissionType;
  potencia: string;
  cor: string;
  portas: number;
  carroceria: BodyType;
  motor: string;
  finalPlaca: number;
}

/**
 * @interface Item
 * @description Represents a standard or optional item of a vehicle
 */
export interface Item {
  nome: string;
  categoria: 'Conforto' | 'Segurança' | 'Tecnologia' | 'Performance' | 'Estética';
}

/**
 * @interface Revision
 * @description Represents a maintenance revision record
 */
export interface Revision {
  data: string;
  quilometragem: number;
  local: string;
}

/**
 * @interface Claim
 * @description Represents an insurance claim record
 */
export interface Claim {
  data: string;
  tipo: string;
  descricao: string;
}

/**
 * @interface TechnicalReport
 * @description Represents a technical inspection report
 */
export interface TechnicalReport {
  data: string;
  resultado: string;
}

/**
 * @interface VehicleHistory
 * @description Represents the history of a vehicle
 */
export interface VehicleHistory {
  procedencia: 'Particular' | 'Concessionária' | 'Leilão' | 'Importado' | 'Locadora';
  proprietarios: number;
  garantia?: string;
  revisoes?: Revision[];
  sinistros?: Claim[];
  laudoTecnico?: TechnicalReport;
}

/**
 * @interface SalesCondition
 * @description Represents the sales conditions for a vehicle
 */
export interface SalesCondition {
  formasPagamento: ('À vista' | 'Financiamento' | 'Consórcio' | 'Leasing')[];
  aceitaTroca: boolean;
  observacoes?: string;
}

/**
 * @interface VehicleDetailEntity
 * @description Represents the full detailed entity of a vehicle
 */
export interface VehicleDetailEntity extends VehicleEntity {
  tituloAnuncio: string;
  status: VehicleStatus;
  fotos: Photo[];
  especificacoes: Specification;
  itensSerie: Item[];
  opcionais: Item[];
  historico: VehicleHistory;
  condicoesVenda: SalesCondition;
}

/**
 * @interface VehicleDetailResponse
 * @description Represents the full response for the vehicle detail endpoint
 */
export interface VehicleDetailResponse extends VehicleDetailEntity {
  veiculosSimilares: VehicleEntity[];
}
