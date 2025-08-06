'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
    const pathname = usePathname();
    
    // PROFILEクリック時の処理
    const handleProfileClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // TOPページにいる場合のみスムーススクロール
      if (pathname === '/') {
        e.preventDefault();
        const profileSection = document.getElementById('profile');
        if (profileSection) {
          profileSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
      // 他のページの場合はデフォルトのLink動作でページ遷移
    };
    
    return(
      <header className="flex justify-end py-4 md:py-0 md:pt-6 mr-5 sticky top-0 z-[9999]">
        <nav>
          <div className="flex space-x-2 md:space-x-6 bg-white rounded-full px-3 md:px-6 py-2 md:py-3 shadow-sm">
            <Link 
              href="/" 
              className={`px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold font-figtree ${
                pathname === '/' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              HOME
            </Link>
            <Link 
              href="/#profile" 
              className="px-2 md:px-4 py-1 md:py-2 text-gray-600 rounded-full text-xs md:text-sm font-bold hover:bg-gray-100 font-figtree"
              onClick={handleProfileClick}
            >
              PROFILE
            </Link>
            <Link 
              href="/works" 
              className={`px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold font-figtree ${
                pathname === '/works' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              WORKS
            </Link>
            <Link 
              href="/blog" 
              className={`px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold font-figtree ${
                pathname === '/blog' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              BLOG
            </Link>
          </div>
        </nav>
      </header>
    );
};

export default Header;