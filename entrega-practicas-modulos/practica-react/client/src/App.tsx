import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Header } from '@core/components/Header';
import { Footer } from '@core/components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      <Footer />

      <Toaster position="top-right" richColors />
    </div>
  );
};

export default App;