import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useUser } from '@/context/UserContext';

import me from '../../public/schedule.webp';

export default function Home() {
  const description = [
    'このアプリはユーザーのスケジュールを管理します。',
    'サンプルサンプルサンプル',
    'テストテストテスト',
  ];
  const user = useUser();
  const [showText, setShowText] = useState([false, false, false]);
  const router = useRouter();

  useEffect(() => {
    const scroll = () => {
      const scrollPosition = window.scrollY;
    };

    window.addEventListener('scroll', scroll);

    return () => {
      window.removeEventListener('scroll', scroll);
    };
  }, []);

  const displayText = (index: number) => {
    const updateShowSetting = [...showText];
    updateShowSetting[index] = !updateShowSetting[index];
    setShowText(updateShowSetting);
  };

  const clickHandler = () => {
    return router.push('/basic');
  };
  return (
    <>
      <div className="w-[66%] mx-auto">
        {/* <button onClick={clickHandler}>SSR画面へ遷移</button> */}
        {/* <div>
          ↓はonClick={clickHandler}と同じパスを含む
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
        </div> */}

        <Image
          src={me}
          alt="back ground image"
          style={{
            width: '66vw',
            height: '300px',
          }}
        />
        <div>管理アプリ</div>
        <div>
          {description.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <button
                onClick={() => displayText(index)}
                className="w-12 / h-12 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-full"
              >
                →
              </button>

              <div
                className={`transition-all duration-500 ease-in-out transform ${
                  showText[index]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}
              >
                <p className="text-lg">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
