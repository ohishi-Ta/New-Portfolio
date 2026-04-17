// src/components/CareerTimeline.tsx
type CareerItem = {
  period: string;
  title: string;
  company?: string;
  position?: string;
  text?: React.ReactNode;
};

const CareerTimeline = () => {
  const careerData: CareerItem[] = [
    {
      period: '2018年3月',
      title: '東京農業大学 卒業',
      position: '生物産業学部 食品香粧学科',

    },
    {
      period: '2018年4月 ~ 2020年',
      title: '大手食品会社',
    },
    {
      period: '2021年1月 ~ 2024年8月',
      title: '広告制作会社（Webサイト制作）- 複数社',
      position: 'フロントエンドエンジニア',
      text: (
        <>
          HTMLやCSS,JavaScript・jQueryを使用したWebサイトコーディングから、MovableTypeやWordPressなどを使用したCMS構築を幅広く担当しました。<br />
          AWSやLinuxの資格取得、Astroを使用したWebサイトの制作なども経験しました。</>
      )
    },
    {
      period: '2025年4月 ~ 現在',
      title: 'ユーザー系SIer',
      position: 'アプリケーション開発エンジニア',
      text: (
        <>
          現在は、フロントエンドからバックエンド、インフラ構築（主にAWS,さくらのクラウド）まで対応し、フルスタック的に開発をしています。<br />
          AWSを使用したサーバーレスアプリ開発や公共プロジェクトなどへ参画しました。
          知識のインプットとアウトプットも重視しており、ブログ記事の執筆、compassでの勉強会への参加、AWSパートナーセミナーへの参加などを積極的に行っています。<br />
        </>
      )
    }
  ];

  return (
    <div>
      <h3 className="text-lg md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">経歴</h3>
      
      <div className="relative">
        
        <div className="space-y-6 md:space-y-8">
          {careerData.map((item, index) => (
            <div key={index} className="home--career-item">
                
              {/* コンテンツ */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-sm border border-gray-200/50">
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs md:text-sm rounded-full">
                    {item.period}
                  </span>
                </div>
                
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h4>
                
                {item.position && (
                  <p className="text-gray-700 text-sm md:text-base">
                    {item.position}
                  </p>
                )}
                
                {item.text && (
                  <p className="text-gray-700 text-sm md:text-base mt-5">
                    {item.text}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerTimeline;