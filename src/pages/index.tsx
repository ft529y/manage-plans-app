import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();
  const clickHandler = () => {
    return router.push('/basic');
  };
  // console.log('この値も返される？');
  return (
    <>
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
      </div>
    </>
  );
}
