'use client';

import { signIn, signUp, confirmSignUp, signOut } from 'aws-amplify/auth';
import type { SignInInput, SignUpInput } from 'aws-amplify/auth';

// ログイン
export async function clientSignIn(username: string, password: string) {
  try {
    const result = await signIn({
      username,
      password,
    });
    return { success: true, data: result };
  } catch (error: any) {
    console.error('Sign in error:', error);
    return { 
      success: false, 
      error: error?.message || 'ログインに失敗しました' 
    };
  }
}

// サインアップ
export async function clientSignUp(username: string, email: string, password: string) {
  try {
    const result = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          email,
        },
      },
    });
    return { success: true, data: result };
  } catch (error: any) {
    console.error('Sign up error:', error);
    return { 
      success: false, 
      error: error?.message || '登録に失敗しました' 
    };
  }
}

// 確認コード検証
export async function clientConfirmSignUp(username: string, confirmationCode: string) {
  try {
    const result = await confirmSignUp({
      username,
      confirmationCode,
    });
    return { success: true, data: result };
  } catch (error: any) {
    console.error('Confirm sign up error:', error);
    return { 
      success: false, 
      error: error?.message || '確認コードの検証に失敗しました' 
    };
  }
}

// ログアウト
export async function clientSignOut() {
  try {
    await signOut();
    return { success: true };
  } catch (error: any) {
    console.error('Sign out error:', error);
    return { 
      success: false, 
      error: error?.message || 'ログアウトに失敗しました' 
    };
  }
}