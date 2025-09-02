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
      position: 'WEBデザインコース',
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
          コロナ禍で転職活動が難しい中、3人という少人数の会社でしたが、Photoshopを使用したWebデザインのサポートを任せていただきました。<br />
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
          HTMLやCSS,JavaScript・jQueryを使用したwebコーディングから、MovableTypeやWordpressなどを使用したCMS構築を担当しました。<br />
          また、チーフ職として部下を二人と東京のIT制作室（6人）のリーダーとなり、案件の割り振りや進歩状況の確認などの管理業務も行いました。<br />
          インフラの外注の方やAWSの資格勉強、DNS切り替えなどの作業などに関わるようになり、フロントだけでなく幅広くWebの知識を得たいと考え、転職を決意しました。
          また、フロントに関してもHTMLやCSSだけでなく、ReactやNext.js、Astroなどのモダンな技術にも触れたいと考えていました。
        </>
      )
    },
    {
      period: '2024年9月 ~ 2025年3月',
      title: '株式会社コンセント',
      position: 'フロントエンドエンジニア',
      text: (
        <>
          これまでのWebサイト制作を活かしつつ、ReactやNext.js、Astroなどのモダンな技術にも触れることができる。インフラ構成なども任せていただけるとのことで入社しました。<br />
          しかし、エンジニアの人数やアクセシビリティへ力を入れることなどの要因で株式会社WAVEと同じような業務が多く、やりたいことができない状態でした。<br />
          その中でもAWSやLinuxの資格やAstroを使用したプロジェクト推進、CMSのLTなど自分も向上でき組織にも貢献できる行動を積極的に行いました。。<br />
          また、プロトタイプを積極的に作成する取り組みなど興味深い社内勉強会へも参加していました。<br />
          AWSやLinuxの資格勉強を進める中で、やりたいことを中途半端にしたくないと考え、思い切ってAWSを中心に使用している企業に転職することを決意しました。
        </>
      )
    },
    {
      period: '2025年4月 ~ 現在',
      title: '株式会社協栄情報',
      position: 'クラウドエンジニア',
      text: (
        <>
          現在は、これまで開発経験があることからAWSを使用した自社受注案件や自社製品の開発をしています。<br />
          開発では、フロントエンドからバックエンド、インフラ構築まで一貫して対応しています。<br />
          インプットやアウトプットも大切にしており、ブログ記事の執筆やcompassでの勉強会への参加、AWSパートナーセミナーなどへの参加を積極的に行っています。<br />
          記事内容は日ごろ使用するサービスで触ってみたい・調べたい設定やエンジニアの方のSNSなどアンテナを張っておき、Notionにメモを取ってテーマを蓄えています。<br />
          未経験のため、承知の上でSES形態の会社に入社しましたが、今まで自社開発をしてきた身としてはやはりチーム/組織で仕事をしたい気持ちが強いです。<br />
          いつSESで他社に行くかわからない状態 + 自社受注でも頻繁にメンバーが変わっていく状態であるため、自社開発/自社受注をしている会社へ転職を希望しています。
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