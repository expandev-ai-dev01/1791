import { useNavigate } from 'react-router-dom';
import { Button } from '@/core/components';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-8">
      <div className="center min-h-[60vh]">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Catálogo de Carros</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Explore nossa coleção de veículos disponíveis
          </p>
          <Button size="lg" onClick={() => navigate('/vehicles')}>
            Ver Catálogo
          </Button>
        </div>
      </div>
    </div>
  );
};
