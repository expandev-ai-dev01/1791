import { useMemo, useState } from 'react';
import { Button } from '@/core/components';
import type { VehicleFeaturesProps } from './types';

const ITEMS_LIMIT = 10;

export const VehicleFeatures = ({ items }: VehicleFeaturesProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const categorizedItems = useMemo(() => {
    return (
      items?.reduce((acc, item) => {
        const category = item.categoria;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category]?.push(item.nome);
        return acc;
      }, {} as Record<string, string[]>) ?? {}
    );
  }, [items]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Itens e Opcionais</h2>
      <div className="space-y-4">
        {Object.entries(categorizedItems)?.map(([category, features]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold mb-2">{category}</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 list-disc list-inside text-muted-foreground">
              {(expandedCategories[category] ? features : features?.slice(0, ITEMS_LIMIT))?.map(
                (feature) => (
                  <li key={feature}>{feature}</li>
                )
              )}
            </ul>
            {features?.length > ITEMS_LIMIT && (
              <Button
                variant="link"
                onClick={() => toggleCategory(category)}
                className="p-0 h-auto mt-2"
              >
                {expandedCategories[category] ? 'Ver menos' : 'Ver mais'}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
