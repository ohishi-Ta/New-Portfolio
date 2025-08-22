// src/components/AvatarIframe.tsx (新規作成)
'use client';

import { useState } from 'react';

export default function AvatarIframe() {
 const [isLoaded, setIsLoaded] = useState(false);

 const handleLoad = () => {
   // 読み込み完了から1秒後に表示
   setTimeout(() => {
     setIsLoaded(true);
   }, 1980);
 };

 return (
   <div className="relative w-[900px] h-[600px] hidden lg:block">
     {/* ローディング表示 */}
     {!isLoaded && (
       <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg">
         <div className="text-center">
           <div className="inline-block w-12 h-12 border-3 border-gray-200 border-t-gray-500 rounded-full animate-spin"></div>
           <p className="mt-4 text-gray-600 text-sm">読み込み中...</p>
         </div>
       </div>
     )}
     
     {/* iframe */}
     <iframe 
       src="https://ai-tuber-kit.vercel.app/"
       loading="lazy"
       sandbox="allow-scripts allow-same-origin allow-popups"
       width={900}
       height={600}
       onLoad={handleLoad}
       className={`transition-opacity duration-500 ${
         isLoaded ? 'opacity-100' : 'opacity-0'
       }`}
     />
   </div>
 );
}