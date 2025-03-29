'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

// Verificar se estamos no navegador
const isClient = typeof window !== 'undefined';

// Inicializar PostHog apenas no cliente
if (isClient) {
  posthog.init(
    process.env.NEXT_PUBLIC_POSTHOG_KEY,
    {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.posthog.com',
      // Ativar no ambiente de produção
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          // Desativar em desenvolvimento
          posthog.opt_out_capturing();
        }
      },
      capture_pageview: false // Capturaremos manualmente
    }
  );
}

// Componente Provider para PostHog
export function PHProvider({ children }) {
  if (!isClient) return children;
  
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

// Exportar a instância do PostHog para uso em outros componentes
export { posthog };
