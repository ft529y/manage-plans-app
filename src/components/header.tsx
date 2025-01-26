import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

import { HeaderInterface } from '@/common/types';

import iconPic from '../../public/s.png';

const Header = () => {
  const links: HeaderInterface = {
    linkPair: [
      { label: 'About', url: '/' },
      { label: 'Schedule', url: '/Calender' },
      { label: 'List', url: '/List-form' },
      { label: 'Memo', url: '/memo' },
    ],
  };

  const logout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <>
      <header className="text-xl bg-slate-700 py-8 sticky top-0">
        <nav className="flex  sm:justify-between items-center p-2">
          <Image src={iconPic} alt="Picture of the author" />
          <div className=" flex space-x-4">
            {links.linkPair.map((item) => (
              <Link
                className="font-mono text-violet-50 rounded-lg px-3 py-2 text-slate-700	font-medium hover:bg-slate-100 hover:text-purple-400"
                key={item.label}
                href={item.url}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <button
            className=" font-mono text-violet-50 rounded-full px-3 py-2 mr-16 font-medium hover:bg-red-600"
            onClick={async () => logout()}
          >
            <p>ログアウト</p>
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
