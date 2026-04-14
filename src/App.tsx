import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '@hooks/useToast';
import { Layout } from '@features/shared';
import { Home } from '@features/home';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Layout>
          <Home />
        </Layout>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
