import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, createError } from '@/middleware';
import {
  vehicleList,
  getFilterOptions,
  vehicleGetById,
  getSimilarVehicles,
} from '@/services/vehicle';
import { HTTP_STATUS } from '@/constants';

/**
 * @api {get} /api/v1/internal/vehicle List Vehicles
 * @apiName ListVehicles
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists all vehicles with optional filtering, sorting, and pagination
 *
 * @apiParam {String[]} [marcas] Filter by brands (query parameter, comma-separated)
 * @apiParam {String[]} [modelos] Filter by models (query parameter, comma-separated)
 * @apiParam {Number} [anoMin] Minimum year filter
 * @apiParam {Number} [anoMax] Maximum year filter
 * @apiParam {Number} [precoMin] Minimum price filter
 * @apiParam {Number} [precoMax] Maximum price filter
 * @apiParam {String[]} [cambios] Filter by transmission types (query parameter, comma-separated)
 * @apiParam {String} [ordenacao] Sort criteria
 * @apiParam {Number} [pagina] Page number (default: 1)
 * @apiParam {Number} [itensPorPagina] Items per page (default: 12)
 *
 * @apiSuccess {Object[]} veiculos Array of vehicles
 * @apiSuccess {Number} total Total number of vehicles matching filters
 * @apiSuccess {Number} pagina Current page number
 * @apiSuccess {Number} itensPorPagina Items per page
 * @apiSuccess {Number} totalPaginas Total number of pages
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} ServerError Internal server error
 */
const listQuerySchema = z.object({
  marcas: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(',') : undefined)),
  modelos: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(',') : undefined)),
  anoMin: z.coerce.number().int().positive().optional(),
  anoMax: z.coerce.number().int().positive().optional(),
  precoMin: z.coerce.number().nonnegative().optional(),
  precoMax: z.coerce.number().nonnegative().optional(),
  cambios: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(',') : undefined)),
  ordenacao: z.string().optional(),
  pagina: z.coerce.number().int().positive().optional(),
  itensPorPagina: z.coerce.number().int().positive().optional(),
});

export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Validate query parameters
     */
    const validatedQuery = listQuerySchema.parse(req.query);

    /**
     * @validation Validate year range consistency
     */
    if (
      validatedQuery.anoMin !== undefined &&
      validatedQuery.anoMax !== undefined &&
      validatedQuery.anoMin > validatedQuery.anoMax
    ) {
      return next(
        createError(
          'anoMinCannotBeGreaterThanAnoMax',
          HTTP_STATUS.BAD_REQUEST,
          'INVALID_YEAR_RANGE'
        )
      );
    }

    /**
     * @validation Validate price range consistency
     */
    if (
      validatedQuery.precoMin !== undefined &&
      validatedQuery.precoMax !== undefined &&
      validatedQuery.precoMin > validatedQuery.precoMax
    ) {
      return next(
        createError(
          'precoMinCannotBeGreaterThanPrecoMax',
          HTTP_STATUS.BAD_REQUEST,
          'INVALID_PRICE_RANGE'
        )
      );
    }

    /**
     * @rule {fn-vehicle-listing} Execute vehicle listing with filters
     */
    const data = await vehicleList(validatedQuery);

    res.json(
      successResponse(data, {
        page: data.pagina,
        pageSize: data.itensPorPagina,
        total: data.total,
      })
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return next(
        createError(
          'invalidQueryParameters',
          HTTP_STATUS.BAD_REQUEST,
          'VALIDATION_ERROR',
          error.errors
        )
      );
    }
    next(error);
  }
}

/**
 * @api {get} /api/v1/internal/vehicle/filter-options Get Filter Options
 * @apiName GetFilterOptions
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves available filter options based on current catalog
 *
 * @apiSuccess {String[]} marcas Available brands
 * @apiSuccess {String[]} modelos Available models
 * @apiSuccess {Number[]} anos Available years
 * @apiSuccess {String[]} cambios Available transmission types
 *
 * @apiError {String} ServerError Internal server error
 */
export async function filterOptionsHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    /**
     * @rule {fn-vehicle-listing} Retrieve available filter options
     */
    const data = await getFilterOptions();

    res.json(successResponse(data));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @api {get} /api/v1/internal/vehicle/:id Get Vehicle Details
 * @apiName GetVehicleDetails
 * @apiGroup Vehicle
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves detailed information for a specific vehicle
 *
 * @apiParam {String} id Vehicle's unique ID
 *
 * @apiSuccess {Object} vehicle Detailed vehicle information
 * @apiSuccess {Object[]} veiculosSimilares Array of similar vehicles
 *
 * @apiError {String} NotFoundError Vehicle with the specified ID was not found
 * @apiError {String} ValidationError Invalid ID format
 * @apiError {String} ServerError Internal server error
 */
const detailParamsSchema = z.object({
  id: z.string(),
});

export async function getByIdHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    /**
     * @validation Validate request parameters
     */
    const { id } = detailParamsSchema.parse(req.params);

    /**
     * @rule {fn-vehicle-details} Retrieve vehicle details by ID
     */
    const vehicle = await vehicleGetById(id);

    if (!vehicle) {
      return next(createError('vehicleNotFound', HTTP_STATUS.NOT_FOUND, 'NOT_FOUND'));
    }

    /**
     * @rule {fn-vehicle-similar} Retrieve similar vehicles
     */
    const similarVehicles = await getSimilarVehicles(id);

    const responseData = {
      ...vehicle,
      veiculosSimilares: similarVehicles,
    };

    res.json(successResponse(responseData));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return next(
        createError(
          'invalidRequestParameters',
          HTTP_STATUS.BAD_REQUEST,
          'VALIDATION_ERROR',
          error.errors
        )
      );
    }
    next(error);
  }
}
