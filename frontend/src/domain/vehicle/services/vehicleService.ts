import { authenticatedClient } from '@/core/lib/api';
import type {
  VehicleListParams,
  VehicleListResponse,
  FilterOptions,
  VehicleDetail,
} from '../types';

export const vehicleService = {
  async list(params: VehicleListParams): Promise<VehicleListResponse> {
    const queryParams = new URLSearchParams();

    if (params?.marcas?.length) {
      queryParams.append('marcas', params.marcas.join(','));
    }
    if (params?.modelos?.length) {
      queryParams.append('modelos', params.modelos.join(','));
    }
    if (params?.anoMin !== undefined) {
      queryParams.append('anoMin', params.anoMin.toString());
    }
    if (params?.anoMax !== undefined) {
      queryParams.append('anoMax', params.anoMax.toString());
    }
    if (params?.precoMin !== undefined) {
      queryParams.append('precoMin', params.precoMin.toString());
    }
    if (params?.precoMax !== undefined) {
      queryParams.append('precoMax', params.precoMax.toString());
    }
    if (params?.cambios?.length) {
      queryParams.append('cambios', params.cambios.join(','));
    }
    if (params?.ordenacao) {
      queryParams.append('ordenacao', params.ordenacao);
    }
    if (params?.pagina !== undefined) {
      queryParams.append('pagina', params.pagina.toString());
    }
    if (params?.itensPorPagina !== undefined) {
      queryParams.append('itensPorPagina', params.itensPorPagina.toString());
    }

    const response = await authenticatedClient.get(`/vehicle?${queryParams.toString()}`);
    return response?.data?.data;
  },

  async getFilterOptions(): Promise<FilterOptions> {
    const response = await authenticatedClient.get('/vehicle/filter-options');
    return response?.data?.data;
  },

  async getById(id: string): Promise<VehicleDetail> {
    const response = await authenticatedClient.get(`/vehicle/${id}`);
    return response?.data?.data;
  },
};
