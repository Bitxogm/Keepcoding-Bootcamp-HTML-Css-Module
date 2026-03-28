import { lazy, Suspense } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';

import { ProtectedRoute } from '../components/ProtectedRoute';
import App from '../../App';
import type { MenuOption } from '../types/menu-option';

// Lazy loading de páginas
const EditProductPage = lazy(() => import('@features/products/pages/EditProductPage'));
const LoginPage = lazy(() => import('@features/auth/pages/LoginPage'));
const ProductsPage = lazy(() => import('@features/products/pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('@features/products/pages/ProductDetailPage'));
const NewProductPage = lazy(() => import('@features/products/pages/NewProductPage'));
const NotFoundPage = lazy(() => import('@features/not-found/pages/NotFoundPage'));
const RegisterPage = lazy(() => import('@features/auth/pages/RegisterPage'));

// Loading component
// eslint-disable-next-line react-refresh/only-export-components
const Loading = () => <div>Cargando...</div>;

// Wrapper para lazy loading
const lazyLoad = (Component: React.ComponentType) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);
export const routes: RouteObject[] = [
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        element: <Navigate to="/products" replace />,
      },
      {
        path: '/login',
        element: lazyLoad(LoginPage),
      },
      {
        path: '/register',
        element: lazyLoad(RegisterPage),
      },
      {
        path: '/products',
        element: (
          <ProtectedRoute>
            {lazyLoad(ProductsPage)}
          </ProtectedRoute>
        ),
        id: 'Products',
      },
      {
        path: '/products/new',
        element: (
          <ProtectedRoute>
            {lazyLoad(NewProductPage)}
          </ProtectedRoute>
        ),
      },
      {
        path: '/products/:id/edit',
        element: (
          <ProtectedRoute>
            {lazyLoad(EditProductPage)}
          </ProtectedRoute>
        ),
      },
      {
        path: '/products/:id',
        element: (
          <ProtectedRoute>
            {lazyLoad(ProductDetailPage)}
          </ProtectedRoute>
        ),
      },

      {
        path: '/404',
        element: lazyLoad(NotFoundPage),
      },
      {
        path: '*',
        element: lazyLoad(NotFoundPage),
      },
    ],
  },
];

export const getMenuOptions = (): MenuOption[] => {
  const children = routes[0].children ?? [];
  return children
    .filter((route): route is RouteObject & { id: string } =>
      'id' in route && Boolean(route.id)
    )
    .map((route) => ({
      path: route.index ? '/' : (route.path as string),
      label: route.id,
    }));
};