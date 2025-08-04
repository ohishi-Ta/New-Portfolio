// src/components/CareerTimeline.tsx
type CareerItem = {
  period: string;
  title: string;
  company?: string;
  position?: string;
};

const CareerTimeline = () => {
  const careerData: CareerItem[] = [
    {
      period: '2018年3月',
      title: '東京農業大学 卒業',
      position: '生物産業学部 食品香粧学科',
    },
    {
      period: '2018年4月 ~ 2019年12月',
      title: '敷島製パン株式会社',
      position: '生産職（一般職）',
    },
    {
      period: '2020年1月 ~ 2020年7月',
      title: '東京デザインプレックス研究所',
      position: 'WEBデザインコース',
    },
    {
      period: '2020年8月 ~ 2020年12月',
      title: '株式会社ボタン',
      position: '一般職',
    },
    {
      period: '2021年1月 ~ 2024年8月',
      title: '株式会社WAVE',
      position: 'フロントエンドエンジニア・チーフ',
    },
    {
      period: '2024年9月 ~ 2025年3月',
      title: '株式会社コンセント',
      position: 'フロントエンドエンジニア',
    },
    {
      period: '2025年4月 ~ 現在',
      title: '株式会社協栄情報',
      position: 'クラウドエンジニア',
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerTimeline;