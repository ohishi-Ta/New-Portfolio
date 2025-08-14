// src/app/auth/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { signIn, signUp, confirmSignUp, fetchAuthSession } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

type AuthMode = 'login' | 'signup' | 'confirm';

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 既にログイン済みかチェック
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const session = await fetchAuthSession();
      if (session?.tokens) {
        console.log('Already authenticated, redirecting to home');
        router.push('/');
      }
    } catch (error) {
      console.log('Not authenticated:', error);
    }
  };

  // ログイン処理
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      console.log('Attempting login for:', username);
      const result = await signIn({ 
        username, 
        password 
      });
      
      console.log('Login result:', result);
      
      if (result.isSignedIn) {
        console.log('Login successful, redirecting...');
        setSuccess('ログインに成功しました。リダイレクト中...');
        
        // セッションが確立されるまで少し待つ
        setTimeout(() => {
          router.push('/');
        }, 500);
      } else if (result.nextStep) {
        console.log('Additional step required:', result.nextStep);
        setError('追加の認証が必要です');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.name === 'UserNotFoundException') {
        setError('ユーザーが見つかりません');
      } else if (err.name === 'NotAuthorizedException') {
        setError('ユーザー名またはパスワードが正しくありません');
      } else if (err.name === 'UserNotConfirmedException') {
        setError('メールアドレスの確認が完了していません');
        setMode('confirm');
      } else {
        setError(`ログインに失敗しました: ${err.message || 'Unknown error'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // サインアップ処理
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      console.log('Attempting signup for:', username);
      const result = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email
          }
        }
      });

      console.log('Signup result:', result);

      if (result.nextStep?.signUpStep === 'CONFIRM_SIGN_UP') {
        setMode('confirm');
        setSuccess('確認コードをメールで送信しました');
      } else if (result.isSignUpComplete) {
        setMode('login');
        setSuccess('アカウントを作成しました。ログインしてください。');
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      if (err.name === 'UsernameExistsException') {
        setError('このユーザー名は既に使用されています');
      } else if (err.name === 'InvalidPasswordException') {
        setError('パスワードは8文字以上で、大文字・小文字・数字・記号を含む必要があります');
      } else if (err.name === 'InvalidParameterException') {
        setError(`入力内容に問題があります: ${err.message}`);
      } else {
        setError(`サインアップに失敗しました: ${err.message || 'Unknown error'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 確認コード処理
  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      console.log('Confirming signup for:', username);
      const result = await confirmSignUp({
        username,
        confirmationCode: confirmCode
      });

      console.log('Confirmation result:', result);

      if (result.isSignUpComplete) {
        setMode('login');
        setPassword('');
        setConfirmCode('');
        setSuccess('メールアドレスを確認しました。ログインしてください。');
      }
    } catch (err: any) {
      console.error('Confirmation error:', err);
      if (err.name === 'CodeMismatchException') {
        setError('確認コードが正しくありません');
      } else if (err.name === 'ExpiredCodeException') {
        setError('確認コードの有効期限が切れています');
      } else {
        setError(`確認に失敗しました: ${err.message || 'Unknown error'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* タイトル */}
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
            {mode === 'login' && 'ログイン'}
            {mode === 'signup' && 'アカウント作成'}
            {mode === 'confirm' && 'メール確認'}
          </h1>

          {/* 成功メッセージ */}
          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm mb-6">
              {success}
            </div>
          )}

          {/* エラーメッセージ */}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}

          {/* ログインフォーム */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-6">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ユーザー名を入力"
                  autoComplete="username"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="パスワードを入力"
                  autoComplete="current-password"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'ログイン中...' : 'ログイン'}
              </button>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setError('');
                    setSuccess('');
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  アカウントをお持ちでない方はこちら
                </button>
              </div>
            </form>
          )}

          {/* サインアップフォーム */}
          {mode === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label htmlFor="signup-username" className="block text-sm font-medium text-gray-700 mb-2">
                  ユーザー名
                </label>
                <input
                  id="signup-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ユーザー名を入力"
                  autoComplete="username"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  メールアドレス
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="メールアドレスを入力"
                  autoComplete="email"
                />
              </div>
              
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-2">
                  パスワード
                </label>
                <input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="8文字以上、大文字・小文字・数字・記号を含む"
                  autoComplete="new-password"
                />
                <p className="text-xs text-gray-500 mt-1">
                  ※パスワードは8文字以上で、大文字・小文字・数字・記号を含む必要があります
                </p>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '作成中...' : 'アカウント作成'}
              </button>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError('');
                    setSuccess('');
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  既にアカウントをお持ちの方はこちら
                </button>
              </div>
            </form>
          )}

          {/* 確認コードフォーム */}
          {mode === 'confirm' && (
            <form onSubmit={handleConfirm} className="space-y-6">
              <p className="text-gray-600 text-sm mb-4">
                {email || 'メールアドレス'}に確認コードを送信しました。
              </p>
              
              <div>
                <label htmlFor="confirmCode" className="block text-sm font-medium text-gray-700 mb-2">
                  確認コード
                </label>
                <input
                  id="confirmCode"
                  type="text"
                  value={confirmCode}
                  onChange={(e) => setConfirmCode(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="6桁の確認コード"
                  autoComplete="one-time-code"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '確認中...' : '確認'}
              </button>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError('');
                    setSuccess('');
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  ログイン画面に戻る
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}