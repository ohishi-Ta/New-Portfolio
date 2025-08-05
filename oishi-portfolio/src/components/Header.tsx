'use client';

import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();
    
    return(
      <header className="flex justify-end py-4 md:py-0 md:pt-6 mr-5 sticky top-0 z-[9998]">
        <nav>
          <div className="flex space-x-2 md:space-x-6 bg-white rounded-full px-3 md:px-6 py-2 md:py-3 shadow-sm">
            <a 
              href="/" 
              className={`px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold font-figtree ${
                pathname === '/' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              HOME
            </a>
            <button className="px-2 md:px-4 py-1 md:py-2 text-gray-600 rounded-full text-xs md:text-sm font-bold hover:bg-gray-100 font-figtree">
              PROFILE
            </button>
            <a 
              href="/works" 
              className={`px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold font-figtree ${
                pathname === '/works' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              WORKS
            </a>
            <button className="px-2 md:px-4 py-1 md:py-2 text-gray-600 rounded-full text-xs md:text-sm font-bold hover:bg-gray-100 font-figtree">
              BLOG
            </button>
          </div>
        </nav>
      </header>
    );
};

export default Header;