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
          {/* <div className="home--mv-image-right-1 home--mv-image home--mv-image-speed-1">
            <Image 
              src="/mv-pink.svg" 
              alt=""
              width={600}
              height={600}
              priority
            />
          </div>
          <div className="home--mv-image-right-2 home--mv-image home--mv-image-speed-2">
            <Image 
              src="/mv-orange.svg" 
              alt=""
              width={600}
              height={600}
              priority
            />
          </div>
          <div className="home--mv-image-left-1 home--mv-image home--mv-image-speed-1">
            <Image 
              src="/mv-blue.svg" 
              alt=""
              width={600}
              height={600}
              priority
            />
          </div>
          <div className="home--mv-image-left-2 home--mv-image home--mv-image-speed-2">
           <Image 
              src="/mv-yellow.svg" 
              alt=""
              width={600}
              height={600}
              priority
            />
          </div> */}
          
          <div className="home--bg-image-bar1 home--bg-image">
           <Image 
              src="/mv-bar1.svg" 
              alt=""
              width={1200}
              height={500}
              priority
            />
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
      <div className="home--bar-svg">
        <svg id="scroll-bar-hook" width="100%" height="881" viewBox="0 0 2323 881" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask 
    id="mask0_108_261" 
    style={{maskType:"alpha"}} 
    maskUnits="userSpaceOnUse" 
    x="0" 
    y="0" 
    width="2323" 
    height="881"
  >
    <rect 
      x="0.418213" 
      y="0.787598" 
      width="2321.65" 
      height="879.992" 
      fill="#D9D9D9" 
      className="svg-elem-1"
    />
  </mask>
  <g mask="url(#mask0_108_261)">
    <mask 
      id="mask1_108_261" 
      style={{maskType:"alpha"}} 
      maskUnits="userSpaceOnUse" 
      x="-226" 
      y="-632" 
      width="2594" 
      height="1667"
    >
      <rect 
        x="-225.785" 
        y="199.755" 
        width="2436.15" 
        height="887.999" 
        transform="rotate(-19.95 -225.785 199.755)" 
        fill="#D9D9D9" 
        className="svg-elem-2"
      />
    </mask>
    <g mask="url(#mask1_108_261)">
      <path 
        d="M26.5644 857.063C1575.88 -634.574 -1126.43 318.122 835.803 498.123C2968.67 604.471 2755.04 -1371.6 2357.17 -621.483" 
        stroke="#155AA8" 
        strokeWidth="55" 
        className="svg-elem-3"
      />
    </g>
    <mask 
      id="mask2_108_261" 
      style={{maskType:"alpha"}} 
      maskUnits="userSpaceOnUse" 
      x="-226" 
      y="-632" 
      width="2594" 
      height="1667"
    >
      <rect 
        x="-225.785" 
        y="199.755" 
        width="2436.15" 
        height="887.999" 
        transform="rotate(-19.95 -225.785 199.755)" 
        fill="#D9D9D9" 
        className="svg-elem-4"
      />
    </mask>
    <g mask="url(#mask2_108_261)">
      <path 
        d="M26.5644 857.063C1575.88 -634.574 -1126.43 318.122 835.803 498.123C2968.67 604.471 2755.04 -1371.6 2357.17 -621.483" 
        stroke="#155AA8" 
        strokeWidth="55" 
        className="svg-elem-5"
      />
    </g>
  </g>
</svg>
      </div>

      {/* Profile Section */}
      <section className="max-w-[100vw] md:max-w-[1280] mx-auto py-8 md:py-20">
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


      {/* Works Section */}
      <section className="mx-4 md:mx-6 my-16 md:my-24 p-8 md:p-20 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl">
        <h2 className="text-3xl md:text-7xl font-extrabold text-gray-900 mb-8 md:mb-12 font-figtree">WORKS</h2>
        <WorksPreview />
      </section>

      {/* Blog Section */}
      <section className="mx-4 md:mx-6 my-16 md:my-24 p-8 md:p-20 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl">
        <h2 className="text-3xl md:text-7xl font-extrabold text-gray-900 mb-8 md:mb-12 font-figtree">BLOG</h2>
        <BlogPreview />
      </section>
      </div>
    </div>
  );
};

export default Portfolio;