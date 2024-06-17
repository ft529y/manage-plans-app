import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  useEffect(() => {
    const scroll = () => {
      const scrollPosition = window.scrollY;
      // console.log(scrollPosition);
    };

    window.addEventListener('scroll', scroll);

    return () => {
      window.removeEventListener('scroll', scroll);
    };
  }, []);
  const router = useRouter();
  const clickHandler = () => {
    return router.push('/basic');
  };
  // console.log('この値も返される？');
  return (
    <>
      <p>
        機能について紹介してください。更にプロフィールボタンも実装しましょう。プロフィールボタンを押下すると簡単なプロフィールが浮かび上がるとか！いいかもです。
      </p>
      <div className="h-dvh">
        <div>初期画面表示</div>
        <button onClick={clickHandler}>SSR画面へ遷移</button>
        <div>
          <Link
            href={{
              pathname: '/basic',
              query: {
                key: 'set',
              },
            }}
          >
            クエリパラメータ使用リンク
          </Link>
        </div>
        <div className="fixed top-0 left-0 w-full h-screen z-[-1]">
          <Image
            src="/schedule.webp"
            width={0}
            height={0}
            alt="Picture of the author"
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </>
  );
}
