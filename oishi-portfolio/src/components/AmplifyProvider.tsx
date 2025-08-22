// src/components/AmplifyProvider.tsx
'use client'

import { Amplify } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { I18n } from 'aws-amplify/utils'
import { JA } from '../translations/ja'

export default function AmplifyProvider({ children }: { children: React.ReactNode }) {
  const [isConfigured, setIsConfigured] = useState(false)

  useEffect(() => {
    const configureAmplify = async () => {
      try {
        // API routeから設定を取得
        const response = await fetch('/api/config')
        const config = await response.json()
        
        // Amplifyの設定
        Amplify.configure(config, { ssr: true })

        // 日本語化の設定
        I18n.putVocabularies(JA)
        I18n.setLanguage('ja')

        setIsConfigured(true)
      } catch (error) {
        console.error('Failed to configure Amplify:', error)
      }
    }

    configureAmplify()
  }, [])

  // 設定が完了するまでローディング表示
  if (!isConfigured) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>読み込み中...</div>
      </div>
    )
  }

  return <>{children}</>
}