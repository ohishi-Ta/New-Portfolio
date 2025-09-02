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
      text: (
        <>
          「ワインアロマと酵母の遺伝子発現」に関する研究をしていました。
          <br />
          研究室では室長を務めていました。
        </>
      )
    },
    {
      period: '2018年4月 ~ 2019年12月',
      title: '敷島製パン株式会社',
      position: '生産職（一般職）',
      text: (
        <>
          生産職としてコンビニなどのPB商品や菓子パンなどを製造していました。 <br />
          開発職や研究職に行きたいと考えていたため、パンシェルジュや社内アイデア公募などにも応募しました。
        </>
      )
    },
    {
      period: '2020年1月 ~ 2020年7月',
      title: '東京デザインプレックス研究所',
      position: 'Webデザインコース',
      text: (
        <>
          PhotoshopとIllustratorを使用したWebデザインやHTML/CSSを使用したコーディングを勉強しました。
        </>
      )
    },
    {
      period: '2020年8月 ~ 2020年12月',
      title: '株式会社ボタン',
      position: '一般職',
      text: (
        <>
          コロナ禍で転職活動が難しい中、3人という少人数の会社でしたが、Photoshopを使用したWebデザインのサポートを担当させていただきました。<br />
          ただ、案件数が少なくほぼ自学の時間だったので、より実務経験を積みたいと思い転職しました。
        </>
      )
    },
    {
      period: '2021年1月 ~ 2024年8月',
      title: '株式会社WAVE',
      position: 'フロントエンドエンジニア・チーフ',
      text: (
        <>
          HTMLやCSS,JavaScript・jQueryを使用したWebコーディングから、MovableTypeやWordPressなどを使用したCMS構築を幅広く担当しました。<br />
          チーフ職として部下2名と東京のIT制作室（6名）のリーダーを務め、案件の割り振りや進捗状況の確認などの管理業務も行いました。<br />
          インフラ外注との協業やAWS資格の勉強、DNS切り替え作業などを通じて、フロントエンドだけでなく幅広いWeb技術の知識を身につけたいと考え、転職を決意しました。
          また、HTML・CSSに加えて、ReactやNext.js、Astroなどのモダンフロントエンド技術にも挑戦したいという思いもありました。
        </>
      )
    },
    {
      period: '2024年9月 ~ 2025年3月',
      title: '株式会社コンセント',
      position: 'フロントエンドエンジニア',
      text: (
        <>
          これまでのWebサイト制作経験を活かしつつ、ReactやNext.js、Astroなどのモダン技術にも触れることができ、インフラ構成も任せていただけるということで入社しました。<br />
          しかし、エンジニアの人数やアクセシビリティ重視の方針などの要因により、前職と類似した業務が多く、当初期待していたことが実現できない状況でした。<br />
          その中でも、AWSやLinux資格の取得、Astroを使用したプロジェクト推進、CMSに関するLTなど、自己成長と組織への貢献を両立できる活動を積極的に行いました。<br />
          また、プロトタイプ作成への取り組みなど、興味深い社内勉強会にも参加していました。<br />
          AWSやLinux資格の学習を進める中で、中途半端な取り組みではなく本格的にクラウド技術に関わりたいと考え、AWS中心の企業への転職を決意しました。
        </>
      )
    },
    {
      period: '2025年4月 ~ 現在',
      title: '株式会社協栄情報',
      position: 'クラウドエンジニア',
      text: (
        <>
          現在は、これまでの開発経験を活かしてAWSを使用した自社受注案件や自社製品の開発を担当しています。<br />
          フロントエンドからバックエンド、インフラ構築まで一貫して対応し、フルスタック開発を実践しています。<br />
          知識のインプットとアウトプットも重視しており、ブログ記事の執筆、compassでの勉強会への参加、AWSパートナーセミナーへの参加などを積極的に行っています。<br />
          記事のテーマは、日頃使用するサービスで試してみたい設定や、エンジニアのSNSでの情報収集をもとに、Notionでアイデアを蓄積して選定しています。<br />
          クラウド未経験での厳しい道のりとSES形態であることを承知の上で入社しましたが、これまで自社開発を経験してきた身として、やはりチーム・組織での協働を重視したいという思いが強いです。<br />
          SESでの他社派遣の不確定性と、自社受注でもメンバーが頻繁に変わる環境であるため、安定したチーム体制での自社開発・自社受注を行っている会社への転職を希望しています。
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