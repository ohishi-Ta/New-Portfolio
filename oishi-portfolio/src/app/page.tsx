import Image from 'next/image'
import Slider from '../components/Slider';
import SkillSet from '../components/SkillSet';
import CareerTimeline from '../components/CareerTimeline';
import WorksPreview from '../components/WorksPreview';
import BlogPreview from '../components/BlogPreview';
import AvatarIframe from '../components/AvatarIframe';
import ScrollBackgroundController from '../components/ScrollBackgroundController';

const Portfolio = () => {
  return ( 
    <div className="home--inner">
      <ScrollBackgroundController />
      {/* Main Visual */}
      <div className="">
        <div className='home--mv'>
          <div className="home--bg-image-bar1 home--bg-image">
            
    <svg className='active w-full h-auto'  width="100%" height="668" viewBox="0 0 2370 668" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_111_213" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="2370" height="668">
        <rect x="0.480225" y="0.818848" width="2369.05" height="666.296" fill="#D9D9D9" className="svg-elem-1"></rect>
      </mask>
      <g mask="url(#mask0_111_213)">
        <path d="M-15.4343 116.36C287.95 -14.15 437.236 212.951 599.402 409.324C761.568 605.696 1202.49 628.069 1505.88 497.559C1809.26 367.048 2146.93 216.928 2309.1 413.301C2471.26 609.674 2585.18 767.196 2888.57 636.686" stroke="url(#paint0_linear_111_213)" strokeWidth="90" className="svg-elem-2"></path>
      </g>
      <defs>
        <linearGradient id="paint0_linear_111_213" x1="-18.5598" y1="138.454" x2="2900.63" y2="551.436" gradientUnits="userSpaceOnUse">
          <stop stopColor="#155AA8"></stop>
          <stop offset="0.15" stopColor="#155AA8"></stop>
          <stop offset="0.15" stopColor="#85B9F3"></stop>
          <stop offset="0.4" stopColor="#85B9F3"></stop>
          <stop offset="0.4" stopColor="#155AA8"></stop>
          <stop offset="0.6" stopColor="#155AA8"></stop>
          <stop offset="0.6" stopColor="#85B9F3"></stop>
          <stop offset="0.8" stopColor="#85B9F3"></stop>
        </linearGradient>
      </defs>
    </svg>
          </div> 

          <div className='home--mv-contents'>
            <div className='flex justify-between'>
              <div className=''>
                <h1 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
                  TAKATO OISHI<br />
                  PORTFOLIO SITE
                </h1>
                <p className="text-lg md:text-xl text-white">Frontend / AWS Engineer</p>
                <div className="mt-10 md:max-w-xl lg:max-w-2xl">
                  <Image 
                      src="/badge.png" 
                      alt="AWS 認定バッジ"
                      width={600}
                      height={200}
                      priority
                    />
                  </div>
                </div>
                <AvatarIframe />
            </div>
            <Slider />
          </div>

        </div>

      </div>

      <div id="profile" className='my-16 md:my-24 relative'>
      <div id="scroll-bg-hook">
      <div className="home--bar-svg-1">
        <svg id="scroll-bar-hook" width="100%" height="918" viewBox="0 0 2277 918" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-full h-auto'>
      <mask id="mask0_111_209" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="2277" height="918">
        <rect x="0.480225" y="0.769531" width="2276.11" height="917.133" fill="#D9D9D9" className="svg-elem-1"></rect>
      </mask>
      <g mask="url(#mask0_111_209)">
        <path d="M-38.8582 867.431C2026.45 -512.937 -989.39 206.951 806.835 563.4C2854.83 706.606 2868.85 -1335.31 2470.98 -585.196" stroke="url(#paint0_linear_111_209)" strokeWidth="90" className="svg-elem-2"></path>
      </g>
      <defs>
        <linearGradient id="paint0_linear_111_209" x1="46.3978" y1="634.459" x2="2811.91" y2="-369.42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#155AA8"></stop>
          <stop offset="0.13" stopColor="#155AA8"></stop>
          <stop offset="0.13" stopColor="#85B9F3"></stop>
          <stop offset="0.3" stopColor="#85B9F3"></stop>
          <stop offset="0.3" stopColor="#155AA8"></stop>
          <stop offset="0.75" stopColor="#155AA8"></stop>
          <stop offset="0.75" stopColor="#85B9F3"></stop>
          <stop offset="1" stopColor="#85B9F3"></stop>
        </linearGradient>
      </defs>
    </svg>
      </div>

      {/* Profile Section */}
      <div className="mx-5 md:mx-10">
      <section className="md:max-w-[1600] mx-auto py-8 md:py-20 px-5 md:px-20 bg-white/80 backdrop-blur-sm rounded-2xl">
        <h2 className="text-3xl md:text-7xl font-extrabold text-gray-900 mb-8 md:mb-12 font-figtree">PROFILE</h2>
        
        <div className="mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">大石 崇登</h3>
          <p className="text-gray-600 mb-4">おおいし たかと</p>
          <p className="text-sm md:text-base text-gray-700">1996年1月14日生まれ</p>
          <p className="text-sm md:text-base text-gray-700">静岡県出身</p>
        </div>
        
        <SkillSet />

        <div className="mb-8 md:mb-12">
          <h3 className="text-lg md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">資格</h3>
          <ul className="space-y-2 text-sm md:text-base text-gray-700">
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
            <li>Google Cloud Cloud Digital Leader 2025年</li>
          </ul>
        </div>

        <CareerTimeline />

      </section>
      </div>
      </div>


      {/* Works Section */}
      
      <section className="md:max-w-[1600] mx-auto my-16 md:my-24 py-8 md:py-20 px-10 md:px-20">

        <h2 className="text-3xl md:text-7xl font-extrabold text-gray-900 mb-8 md:mb-12 font-figtree">WORKS</h2>
        <WorksPreview />
      </section>

      {/* Blog Section */}
      <section className="md:max-w-[1600] mx-auto px-10 md:px-20">
        <h2 className="text-3xl md:text-7xl font-extrabold text-gray-900 mb-8 md:mb-12 font-figtree">BLOG</h2>
        <BlogPreview />
      </section>
      </div>
    </div>
  );
};

export default Portfolio;