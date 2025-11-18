import { Router } from 'express';
import * as vehicleController from '@/api/v1/internal/vehicle/controller';
import * as contactController from '@/api/v1/internal/contact/controller';

const router = Router();

// Vehicle routes
router.get('/vehicle', vehicleController.listHandler);
router.get('/vehicle/filter-options', vehicleController.filterOptionsHandler);
router.get('/vehicle/:id', vehicleController.getByIdHandler);

// Contact routes
router.post('/contact', contactController.postHandler);

export default router;
