// src/components/ScrollBackgroundController.tsx (修正版)
'use client';

import { useEffect } from 'react';

const ScrollBackgroundController = () => {
  useEffect(() => {
    // bar-activeが一度だけ実行されたかを追跡するフラグ
    let barActiveTriggered = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // scroll-bg-hook の処理
          if (entry.target.id === 'scroll-bg-hook') {
            const scrollBarHookElement = document.getElementById('scroll-bar-hook');
            
            if (entry.isIntersecting) {
              console.log('scroll-bg-hook が見えました');
              
              // bodyに profile-bg クラスを追加
              document.body.classList.add('profile-bg');
              console.log('→ body に profile-bg クラスを追加');
              
              // scroll-bar-hook 要素に bar-active クラスを追加（一度のみ）
              if (scrollBarHookElement && !barActiveTriggered) {
                scrollBarHookElement.classList.add('bar-active');
                barActiveTriggered = true; // フラグを設定
                console.log('→ scroll-bar-hook に bar-active クラスを追加（一度のみ）');
                console.log('→ scroll-bar-hook のクラスリスト:', scrollBarHookElement.className);
              } else if (scrollBarHookElement && barActiveTriggered) {
                console.log('→ bar-active は既に実行済みのためスキップ');
              } else {
                console.log('❌ scroll-bar-hook 要素が見つかりません');
              }
            } else {
              console.log('scroll-bg-hook が見えなくなりました');
              
              // bodyから profile-bg クラスを削除
              document.body.classList.remove('profile-bg');
              console.log('→ body から profile-bg クラスを削除');
              
              // bar-activeは削除しない（一度のみなので）
              console.log('→ bar-active クラスは保持（一度のみの設定のため）');
            }
          }
        });
      },
      {
        threshold: 0.1, // 10% 見えたら発火
        rootMargin: '-10% 0px -10% 0px' // 上下10%のマージンを設ける
      }
    );

    // scroll-bg-hook 要素のみを監視対象に追加
    const bgHookElement = document.getElementById('scroll-bg-hook');
    if (bgHookElement) {
      console.log('✅ scroll-bg-hook 要素を監視開始');
      observer.observe(bgHookElement);
    } else {
      console.log('❌ scroll-bg-hook 要素が見つかりません');
    }

    // scroll-bar-hook 要素の存在確認
    const barHookElement = document.getElementById('scroll-bar-hook');
    if (barHookElement) {
      console.log('✅ scroll-bar-hook 要素を発見');
      console.log('初期クラスリスト:', barHookElement.className);
    } else {
      console.log('❌ scroll-bar-hook 要素が見つかりません');
    }

    // クリーンアップ関数
    return () => {
      observer.disconnect();
      
      // bodyから profile-bg クラスを削除
      document.body.classList.remove('profile-bg');
      
      // bar-activeは削除しない（一度のみの設定を維持）
      console.log('🧹 クリーンアップ: profile-bg削除、bar-activeは保持');
    };
  }, []);

  return null;
};

export default ScrollBackgroundController;