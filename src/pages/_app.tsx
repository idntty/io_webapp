import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Inter } from 'next/font/google';

import '../index.css';
import '../components/app/grid/placeholder.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>IDNTTY App</title>
      </Head>
      <div id="root" className={`${inter.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
