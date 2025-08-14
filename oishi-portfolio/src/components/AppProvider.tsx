// src/components/AppProvider.tsx

'use client';

import { useEffect } from 'react';
import { configureAmplify } from '@/lib/amplify-config';

export default function AppProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Amplifyを一度だけ初期化
    configureAmplify();
  }, []);

  return <>{children}</>;
}