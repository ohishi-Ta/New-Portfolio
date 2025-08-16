// src/app/login/page.tsx
'use client'

import { useState, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'aws-amplify/auth'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  
  // リダイレクト元のパスを取得
  const from = searchParams.get('from') || '/'

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { isSignedIn } = await signIn({ username, password })
      
      if (isSignedIn) {
        localStorage.setItem('username', username)
        router.push(from)
        router.refresh()
      }
    } catch (err: any) {
      if (err.name === 'UserNotFoundException') {
        setError('ユーザーが見つかりません')
      } else if (err.name === 'NotAuthorizedException') {
        setError('ユーザー名またはパスワードが正しくありません')
      } else if (err.name === 'UserNotConfirmedException') {
        setError('メールアドレスの確認が完了していません')
      } else {
        setError(err.message || 'ログインに失敗しました')
      }
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* ロゴ・タイトル */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 font-figtree">
              PORTFOLIO SITE
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              アカウントにログイン
            </p>
          </div>

          {/* エラーメッセージ */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* ログインフォーム */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                ユーザー名
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="ユーザー名を入力"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                パスワード
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="パスワードを入力"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-blue-700"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  ログイン中...
                </span>
              ) : (
                'ログイン'
              )}
            </button>
          </form>

          {/* 区切り線 */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">または</span>
            </div>
          </div>

          {/* サインアップリンク */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              アカウントをお持ちでない方は
              <Link 
                href="/signup"
                className="ml-1 font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                新規登録
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}