import { ErrorBoundary as ReactErrorBoundry } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import Routing from './routes';
import { fallbackRender } from './features/errors/error-boundary.page';

function App() {
  return (
    <ReactErrorBoundry fallbackRender={fallbackRender}>
      <HelmetProvider>
        <Routing />
        <Toaster
          toastOptions={{
            duration: 2000,
            position: 'bottom-right',
            style: { fontSize: '13px', fontWeight: 'normal' },
          }}
        />
      </HelmetProvider>
    </ReactErrorBoundry>
  );
}

export default App;
