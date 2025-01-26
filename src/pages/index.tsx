import { useSession } from 'next-auth/react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useUser } from '@/context/UserContext';

import me from '../../public/schedule.webp';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const user = useUser();
  useEffect(() => {
    const scroll = () => {
      const scrollPosition = window.scrollY;
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
  return (
    <>
      <p>
        機能について紹介してください。更にプロフィールボタンも実装しましょう。プロフィールボタンを押下すると簡単なプロフィールが浮かび上がるとか！いいかもです。
      </p>
      <div className="h-dvh">
        <button onClick={clickHandler}>SSR画面へ遷移</button>
        <div>
          {/* ↓はonClick={clickHandler}と同じパスを含む */}
          <Link
            href={{
              pathname: '/basic',
              query: {
                name: 'set',
              },
            }}
          >
            クエリパラメータ使用リンク
          </Link>
        </div>
        {/* 改めてルートUIを考え直す必要あり(上方向へズラしたい) */}
        {/* <div className="fixed top-0 left-0 w-full h-[300px] z-[-1]"> */}
        <Image
          src={me}
          alt="back ground image"
          sizes="100vw"
          style={{
            width: '100%',
            height: '300px',
          }}
        />
        {/* </div> */}
      </div>
    </>
  );
}
