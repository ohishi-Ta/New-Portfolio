import { NextResponse } from 'next/server';

export async function GET() {
  // 環境変数チェック
  if (!process.env.COGNITO_USER_POOL_ID || !process.env.COGNITO_CLIENT_ID) {
    return NextResponse.json(
      { error: 'Cognito configuration is missing' },
      { status: 500 }
    );
  }

  // Amplify設定を返す
  const config = {
    Auth: {
      Cognito: {
        userPoolId: process.env.COGNITO_USER_POOL_ID,
        userPoolClientId: process.env.COGNITO_CLIENT_ID,
        signUpVerificationMethod: 'code',
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

  return NextResponse.json(config);
}