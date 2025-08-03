import React from 'react';
import Slider from '../components/Slider';


const Portfolio = () => {
  return ( 
    <div className="min-h-screen home--inner">
      {/* Header */}
      <header className="flex justify-end py-4 md:py-6 mr-5">
        <nav>
          <div className="flex space-x-2 md:space-x-6 bg-white rounded-full px-3 md:px-6 py-2 md:py-3 shadow-sm">
            <button className="px-2 md:px-4 py-1 md:py-2 bg-gray-800 text-white rounded-full text-xs md:text-sm font-medium font-figtree">
              HOME
            </button>
            <button className="px-2 md:px-4 py-1 md:py-2 text-gray-600 rounded-full text-xs md:text-sm font-medium hover:bg-gray-100 font-figtree">
              PROFILE
            </button>
            <button className="px-2 md:px-4 py-1 md:py-2 text-gray-600 rounded-full text-xs md:text-sm font-medium hover:bg-gray-100 font-figtree">
              WORKS
            </button>
            <button className="px-2 md:px-4 py-1 md:py-2 text-gray-600 rounded-full text-xs md:text-sm font-medium hover:bg-gray-100 font-figtree">
              BLOG
            </button>
          </div>
        </nav>
      </header>

      {/* Main Visual */}
      <div className="py-10 md:py-20 min-h-screen">
        <div className='home--mv'>
          <div className="home--mv-image-right-1 home--mv-image home--mv-image-speed-1">
            <img 
              src="/mv-pink.svg" 
            />
          </div>
          <div className="home--mv-image-right-2 home--mv-image home--mv-image-speed-2">
            <img 
              src="/mv-orange.svg" 
            />
          </div>
          <div className="home--mv-image-left-1 home--mv-image home--mv-image-speed-1">
            <img 
              src="/mv-blue.svg" 
            />
          </div>
          <div className="home--mv-image-left-2 home--mv-image home--mv-image-speed-2">
            <img 
              src="/mv-yellow.svg" 
            />
          </div>
        </div>
        <div className='home--mv-title max-w-[90vw] mx-auto'>
          <h1 className="text-4xl md:text-7xl font-extrabold text-gray-900 mb-4 leading-tight">
            TAKATO OISHI<br />
            PORTFOLIO SITE
          </h1>
          <p className="text-lg md:text-xl text-gray-600">Engineer</p>
          <div className="mt-10 w-[700]"><img src="/aws-badge.svg" className="w-full" alt="AWS 認定バッジ" /></div>
        </div>
        
        {/* スライダー - Splide版 */}
        <Slider 
          className="absolute bottom-8 right-8 z-10 hidden md:block" 
        />
      </div>

      <div className='max-w-[100vw] md:max-w-[1200] mx-auto'>
      {/* Profile Section */}
      <section className="mx-4 md:mx-6 my-16 md:my-24 p-8 md:p-20 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl">
        <h2 className="text-3xl md:text-7xl font-extrabold text-gray-900 mb-8 md:mb-12 font-figtree">PROFILE</h2>
        
        <div className="mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 font-noto-sans-jp">大石 崇登</h3>
          <p className="text-gray-600 mb-4 font-noto-sans-jp">おおいし たかと</p>
          <p className="text-sm md:text-base text-gray-700 font-noto-sans-jp">1996年1月14日生まれ</p>
          <p className="text-sm md:text-base text-gray-700 font-noto-sans-jp">静岡県出身</p>
        </div>
        
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 font-figtree">SKILL SET</h2>
        </div>

        <div className="mb-8 md:mb-12">
          <h3 className="text-lg md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">資格</h3>
          <ul className="space-y-2 text-sm md:text-base text-gray-700 font-noto-sans-jp">
            <li>LPIC-1 2024年</li>
            <li>AWS Certified Cloud Practitioner 2024年</li>
            <li>AWS Certified Solutions Architect - Associate 2024年</li>
            <li>AWS Certified Solutions Architect - Professional 2025年</li>
            <li>AWS Certified Developer - Associate 2025年</li>
            <li>AWS Certified SysOps Administrator - Associate 2025年</li>
            <li>AWS Certified DevOps Engineer - Professional 2025年</li>
            <li>AWS Certified Data Engineer - Associate 2025年</li>
            <li>AWS Certified Security - Specialty 2025年</li>
            <li>AWS Certified Advanced Networking - Specialty 2025年</li>
            <li>AWS Certified AI Practitioner 2025年</li>
            <li>AWS Certified Machine Learning Engineer - Associate 2025年</li>
            <li>AWS Certified Machine Learning - Specialty 2025年</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">経歴</h3>
        </div>
      </section>


      {/* Works Section */}
      <section className="px-4 md:px-6 py-10 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12">WORKS</h2>
      </section>

      {/* Blog Section */}
      <section className="px-4 md:px-6 py-10 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12">BLOG</h2>
        <button className="px-4 md:px-6 py-2 md:py-3 border border-gray-300 rounded-full text-sm md:text-base text-gray-700 hover:bg-gray-50">
          Zenn
        </button>
      </section>
      </div>
    </div>
  );
};

export default Portfolio;