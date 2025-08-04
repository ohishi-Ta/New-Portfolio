const Header = () => {
    return(
      <header className="flex justify-end py-4 md:py-0 md:pt-6 mr-5">
        <nav>
          <div className="flex space-x-2 md:space-x-6 bg-white rounded-full px-3 md:px-6 py-2 md:py-3 shadow-sm">
            <button className="px-2 md:px-4 py-1 md:py-2 bg-gray-800 text-white rounded-full text-xs md:text-sm font-bold font-figtree">
              HOME
            </button>
            <button className="px-2 md:px-4 py-1 md:py-2 text-gray-600 rounded-full text-xs md:text-sm font-bold hover:bg-gray-100 font-figtree">
              PROFILE
            </button>
            <button className="px-2 md:px-4 py-1 md:py-2 text-gray-600 rounded-full text-xs md:text-sm font-bold hover:bg-gray-100 font-figtree">
              WORKS
            </button>
            <button className="px-2 md:px-4 py-1 md:py-2 text-gray-600 rounded-full text-xs md:text-sm font-bold hover:bg-gray-100 font-figtree">
              BLOG
            </button>
          </div>
        </nav>
      </header>
    );
};

export default Header;