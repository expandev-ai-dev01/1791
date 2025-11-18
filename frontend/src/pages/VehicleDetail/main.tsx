import { useParams, Link } from 'react-router-dom';
import { useVehicleDetail } from '@/domain/vehicle';
import { ContactForm } from '@/domain/contact';
import { LoadingSpinner, Button } from '@/core/components';
import {
  VehicleGallery,
  VehicleHeader,
  VehicleSpecs,
  VehicleFeatures,
  SimilarVehicles,
} from './_impl';

export const VehicleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { vehicle, isLoading, error } = useVehicleDetail(id);

  if (isLoading) {
    return (
      <div className="center min-h-[80vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8 center min-h-[80vh]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Veículo não encontrado</h2>
          <p className="text-muted-foreground">
            O veículo que você está procurando não foi encontrado. Ele pode ter sido removido ou o
            link está incorreto.
          </p>
          <Button asChild>
            <Link to="/vehicles">Voltar para o catálogo</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return null;
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link to="/vehicles" className="text-sm text-primary-500 hover:underline">
          &larr; Voltar para o catálogo
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="lg:col-span-3">
          <VehicleGallery
            photos={vehicle.fotos}
            vehicleName={`${vehicle.marca} ${vehicle.modelo}`}
          />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <VehicleHeader vehicle={vehicle} />
          <ContactForm vehicleId={vehicle.id} vehicleName={`${vehicle.marca} ${vehicle.modelo}`} />
        </div>
      </div>

      <div className="mt-12 space-y-10">
        <VehicleSpecs specs={vehicle.especificacoes} />
        <VehicleFeatures items={vehicle.itens} />
      </div>

      <SimilarVehicles vehicles={vehicle.veiculosSimilares} />
    </div>
  );
};
