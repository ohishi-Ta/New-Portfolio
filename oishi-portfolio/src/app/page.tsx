import Image from 'next/image'
import Slider from '../components/Slider';
import SkillSet from '../components/SkillSet';
import CareerTimeline from '../components/CareerTimeline';
import WorksPreview from '../components/WorksPreview';
import BlogPreview from '../components/BlogPreview';
import AvatarIframe from '../components/AvatarIframe';

const Portfolio = () => {
  return ( 
    <div className="home--inner">

      {/* Main Visual */}
      <div className="">
        <div className='home--mv w-[90vw] mx-auto'>
          <div className="home--mv-image-right-1 home--mv-image home--mv-image-speed-1">
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
          </div>

          <div className='home--mv-contents'>
            <div className='flex justify-between'>
              <div className=''>
                <h1 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
                  TAKATO OISHI<br />
                  PORTFOLIO SITE
                </h1>
                <p className="text-lg md:text-xl text-gray-600">Frontend / AWS Engineer</p>
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

      <div id="profile" className='max-w-[100vw] md:max-w-[1200] mx-auto'>
      {/* Profile Section */}
      <section className="mx-4 md:mx-6 my-16 md:my-24 p-8 md:p-20 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl">
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