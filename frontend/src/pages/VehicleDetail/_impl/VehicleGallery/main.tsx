import { useState } from 'react';
import { cn } from '@/core/utils';
import type { VehicleGalleryProps } from './types';

export const VehicleGallery = ({ photos, vehicleName }: VehicleGalleryProps) => {
  const [mainPhoto, setMainPhoto] = useState(photos?.[0]);

  if (!photos?.length) {
    return (
      <div className="aspect-video w-full bg-muted rounded-sm center text-muted-foreground">
        Nenhuma foto disponível
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-video w-full overflow-hidden rounded-sm border bg-muted">
        <img
          src={mainPhoto?.url || '/placeholder-car.jpg'}
          alt={mainPhoto?.legenda || `Foto principal de ${vehicleName}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
        {photos?.map((photo, index) => (
          <button
            key={index}
            onClick={() => setMainPhoto(photo)}
            className={cn(
              'aspect-square w-full overflow-hidden rounded-sm border-2 transition-all',
              mainPhoto?.url === photo.url ? 'border-primary-500' : 'border-transparent'
            )}
            aria-label={`Ver foto ${index + 1}`}
          >
            <img
              src={photo.url}
              alt={photo.legenda || `Foto ${index + 1} de ${vehicleName}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
