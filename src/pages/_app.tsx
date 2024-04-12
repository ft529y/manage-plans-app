import '@/styles/globals.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Footer from '@/components/footer';
import Header from '@/components/header';

import type { AppProps } from 'next/app';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
