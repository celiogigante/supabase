'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { posthog } from '@/lib/posthog';

export default function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Enviar evento de visualização de página quando a rota mudar
  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + '?' + searchParams.toString();
      }
      
      // Enviar evento de visualização de página para o PostHog
      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);
  
  return null;
}
