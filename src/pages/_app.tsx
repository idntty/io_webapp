import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../index.css';
import '../components/app/grid/placeholder.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>IDNTTY App</title>
      </Head>
      <div id="root">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default App;
