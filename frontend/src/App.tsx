import { Outlet } from 'react-router-dom';
import { ErrorBoundaryWithReset } from '@/core/components/ErrorBoundary';
import { AppProviders } from '@/core/providers/AppProviders';

export const App = () => {
  return (
    <AppProviders>
      <ErrorBoundaryWithReset>
        <Outlet />
      </ErrorBoundaryWithReset>
    </AppProviders>
  );
};
