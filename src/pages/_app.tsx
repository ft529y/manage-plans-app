import '@/styles/globals.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { UserProvider } from '@/context/UserContext';

import type { AppProps } from 'next/app';
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  // サインインページを表示している時はヘッダー、フッターを表示しない。
  const isSignInPage = router.pathname === '/auth/signin';
  return (
    <>
      <SessionProvider session={session}>
        <UserProvider>
          {!isSignInPage && <Header />}
          <Component {...pageProps} />
          {!isSignInPage && <Footer />}
        </UserProvider>
      </SessionProvider>
    </>
  );
}
