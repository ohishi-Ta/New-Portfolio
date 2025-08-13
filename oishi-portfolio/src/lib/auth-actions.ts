'use server';

import { redirect } from 'next/navigation';
import { 
  serverSignIn, 
  serverSignUp, 
  serverConfirmSignUp,
  serverSignOut 
} from '@/utils/amplify-server';

// ログイン処理
export async function loginAction(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const redirectTo = formData.get('redirectTo') as string || '/';
  
  // バリデーション
  if (!username || !password) {
    return { 
      success: false, 
      error: 'ユーザー名とパスワードを入力してください' 
    };
  }
  
  // ログイン実行
  const result = await serverSignIn({
    username,
    password
  });
  
  if (result.success) {
    // 成功時はリダイレクト
    redirect(redirectTo);
  }
  
  return result;
}

// 新規登録処理
export async function signUpAction(formData: FormData) {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  // バリデーション
  if (!username || !email || !password) {
    return { 
      success: false, 
      error: '全ての項目を入力してください' 
    };
  }
  
  // メールアドレスの形式チェック
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { 
      success: false, 
      error: '正しいメールアドレスを入力してください' 
    };
  }
  
  // パスワードの形式チェック
  if (password.length < 8) {
    return { 
      success: false, 
      error: 'パスワードは8文字以上にしてください' 
    };
  }
  
  if (!/[a-z]/.test(password)) {
    return { 
      success: false, 
      error: 'パスワードには小文字を含めてください' 
    };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { 
      success: false, 
      error: 'パスワードには大文字を含めてください' 
    };
  }
  
  if (!/[0-9]/.test(password)) {
    return { 
      success: false, 
      error: 'パスワードには数字を含めてください' 
    };
  }
  
  // サインアップ実行
  const result = await serverSignUp({
    username,
    password,
    options: {
      userAttributes: {
        email
      }
    }
  });
  
  return result;
}

// 確認コード検証処理
export async function confirmSignUpAction(formData: FormData) {
  const username = formData.get('username') as string;
  const confirmationCode = formData.get('confirmationCode') as string;
  
  // バリデーション
  if (!username || !confirmationCode) {
    return { 
      success: false, 
      error: 'ユーザー名と確認コードを入力してください' 
    };
  }
  
  // 確認コード検証
  const result = await serverConfirmSignUp({
    username,
    confirmationCode
  });
  
  if (result.success) {
    // 成功時はログイン画面へ
    redirect('/login?confirmed=true');
  }
  
  return result;
}

// ログアウト処理
export async function logoutAction() {
  const result = await serverSignOut();
  
  if (result.success) {
    redirect('/login');
  }
  
  return result;
}