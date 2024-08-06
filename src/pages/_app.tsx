import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../index.css';
import '../components/app/grid/placeholder.css';

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>IDNTTY App</title>
      </Head>
      <div id="root">
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
