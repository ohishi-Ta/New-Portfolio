import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { cookies } from 'next/headers';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth/server';
import { signIn, signUp, confirmSignUp, signOut } from 'aws-amplify/auth';
import type { 
  SignInInput, 
  SignUpInput, 
  ConfirmSignUpInput
} from 'aws-amplify/auth';

// Amplify設定を環境変数から作成
const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.COGNITO_CLIENT_ID!,
      signUpVerificationMethod: 'code' as const,
      loginWith: {
        username: true,
        email: false
      },
      userAttributes: {
        email: {
          required: true
        }
      },
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: false
      }
    }
  }
};

// サーバーランナーを作成
export const { runWithAmplifyServerContext } = createServerRunner({
  config: amplifyConfig
});

// 認証セッションを取得
export async function getAuthSession() {
  try {
    const result = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: async (contextSpec) => {
        try {
          const session = await fetchAuthSession(contextSpec);
          return session;
        } catch (error) {
          return null;
        }
      }
    });
    return result;
  } catch (error) {
    return null;
  }
}

// 現在のユーザーを取得
export async function getAuthUser() {
  try {
    const result = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: async (contextSpec) => {
        try {
          const user = await getCurrentUser(contextSpec);
          return user;
        } catch (error) {
          return null;
        }
      }
    });
    return result;
  } catch (error) {
    return null;
  }
}

// ログイン処理（クライアント側で実行）
export async function serverSignIn(params: SignInInput) {
  try {
    // signInはクライアント側のAPIなので、Server Actionsから直接呼び出す
    const signInResult = await signIn(params);
    return { success: true, data: signInResult };
  } catch (error: any) {
    return { 
      success: false, 
      error: error?.message || 'ログインに失敗しました' 
    };
  }
}

// サインアップ処理（クライアント側で実行）
export async function serverSignUp(params: SignUpInput) {
  try {
    // signUpはクライアント側のAPIなので、Server Actionsから直接呼び出す
    const signUpResult = await signUp(params);
    return { success: true, data: signUpResult };
  } catch (error: any) {
    return { 
      success: false, 
      error: error?.message || '登録に失敗しました' 
    };
  }
}

// 確認コード検証（クライアント側で実行）
export async function serverConfirmSignUp(params: ConfirmSignUpInput) {
  try {
    // confirmSignUpはクライアント側のAPIなので、Server Actionsから直接呼び出す
    const confirmResult = await confirmSignUp(params);
    return { success: true, data: confirmResult };
  } catch (error: any) {
    return { 
      success: false, 
      error: error?.message || '確認コードの検証に失敗しました' 
    };
  }
}

// ログアウト処理（クライアント側で実行）
export async function serverSignOut() {
  try {
    // signOutはクライアント側のAPIなので、Server Actionsから直接呼び出す
    await signOut();
    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: error?.message || 'ログアウトに失敗しました' 
    };
  }
}