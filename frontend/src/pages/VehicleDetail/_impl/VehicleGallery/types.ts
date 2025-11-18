import type { VehiclePhoto } from '@/domain/vehicle';

export interface VehicleGalleryProps {
  photos: VehiclePhoto[];
  vehicleName: string;
}
