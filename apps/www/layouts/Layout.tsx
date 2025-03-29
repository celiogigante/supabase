// Importe o Provider no topo do arquivo
import { PHProvider } from '@/lib/posthog';
import PostHogPageView from '@/components/posthog-pageview';

// Dentro do seu componente de layout, envolva o children com o PHProvider
export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>
        <PHProvider>
          <PostHogPageView />
          {children}
        </PHProvider>
      </body>
    </html>
  );
}
import { MDXProvider } from '@mdx-js/react'
import { NextSeo } from 'next-seo'
import DefaultLayout from '~/components/Layouts/Default'
import mdxComponents from '~/lib/mdx/mdxComponents'

export default function ContentsLayout({ context, meta }: any) {
  return (
    <DefaultLayout>
      <NextSeo {...meta} />
      <MDXProvider components={mdxComponents()}>
        <div className="prose max-w-none">{context.children}</div>
      </MDXProvider>
    </DefaultLayout>
  )
}
