// app/api/auth/route.ts

import { NextRequest, NextResponse } from 'next/server';
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  ConfirmSignUpCommand,
  GetUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION!,
});

// ログイン処理
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    switch (action) {
      case 'login':
        return handleLogin(body);
      case 'signup':
        return handleSignUp(body);
      case 'confirm':
        return handleConfirm(body);
      default:
        return NextResponse.json({ error: '無効なアクション' }, { status: 400 });
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 });
  }
}

// セッション確認
export async function GET(req: NextRequest) {
  try {
    const accessToken = req.cookies.get('cognito_access_token')?.value;

    if (!accessToken) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const command = new GetUserCommand({
      AccessToken: accessToken,
    });

    const user = await client.send(command);
    
    return NextResponse.json({
      authenticated: true,
      username: user.Username,
      attributes: user.UserAttributes,
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

// ログアウト処理
export async function DELETE(req: NextRequest) {
  const response = NextResponse.json({ success: true });
  
  // Cookieを削除
  response.cookies.delete('cognito_id_token');
  response.cookies.delete('cognito_access_token');
  response.cookies.delete('cognito_refresh_token');
  
  return response;
}

// ログイン処理の実装
async function handleLogin(body: any) {
  const { username, password } = body;

  try {
    const command = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.COGNITO_CLIENT_ID!,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    });

    const result = await client.send(command);
    
    if (!result.AuthenticationResult) {
      return NextResponse.json(
        { error: '認証に失敗しました' },
        { status: 401 }
      );
    }

    const { IdToken, AccessToken, RefreshToken } = result.AuthenticationResult;
    const response = NextResponse.json({ success: true });

    // HttpOnly Cookieにトークンを保存
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
    };

    response.cookies.set('cognito_id_token', IdToken!, {
      ...cookieOptions,
      maxAge: 60 * 60, // 1時間
    });

    response.cookies.set('cognito_access_token', AccessToken!, {
      ...cookieOptions,
      maxAge: 60 * 60, // 1時間
    });

    if (RefreshToken) {
      response.cookies.set('cognito_refresh_token', RefreshToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 30, // 30日
      });
    }

    return response;
  } catch (error: any) {
    let errorMessage = 'ログインに失敗しました';
    
    if (error.name === 'NotAuthorizedException') {
      errorMessage = 'ユーザー名またはパスワードが正しくありません';
    } else if (error.name === 'UserNotFoundException') {
      errorMessage = 'ユーザーが見つかりません';
    } else if (error.name === 'UserNotConfirmedException') {
      errorMessage = 'メールアドレスの確認が完了していません';
    }
    
    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}

// サインアップ処理の実装
async function handleSignUp(body: any) {
  const { username, email, password } = body;

  try {
    const command = new SignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID!,
      Username: username,
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
      ],
    });

    const result = await client.send(command);
    
    return NextResponse.json({
      success: true,
      userSub: result.UserSub,
      needsConfirmation: !result.UserConfirmed,
    });
  } catch (error: any) {
    let errorMessage = '登録に失敗しました';
    
    if (error.name === 'UsernameExistsException') {
      errorMessage = 'このユーザー名は既に使用されています';
    } else if (error.name === 'InvalidPasswordException') {
      errorMessage = 'パスワードは8文字以上で、大文字・小文字・数字を含む必要があります';
    } else if (error.name === 'InvalidParameterException') {
      errorMessage = '入力内容に誤りがあります';
    }
    
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

// 確認コード検証の実装
async function handleConfirm(body: any) {
  const { username, confirmationCode } = body;

  try {
    const command = new ConfirmSignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID!,
      Username: username,
      ConfirmationCode: confirmationCode,
    });

    await client.send(command);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    let errorMessage = '確認コードの検証に失敗しました';
    
    if (error.name === 'CodeMismatchException') {
      errorMessage = '確認コードが正しくありません';
    } else if (error.name === 'ExpiredCodeException') {
      errorMessage = '確認コードの有効期限が切れています';
    }
    
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}