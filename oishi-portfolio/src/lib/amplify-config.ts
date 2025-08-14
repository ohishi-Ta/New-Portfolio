// src/lib/amplify-config.ts

import { Amplify } from 'aws-amplify';

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID!,
      signUpVerificationMethod: 'code' as const,
      loginWith: {
        username: true,
        email: false
      }
    }
  }
};

// シングルトンパターンで一度だけ初期化
let isConfigured = false;

export function configureAmplify() {
  if (!isConfigured) {
    Amplify.configure(amplifyConfig);
    isConfigured = true;
  }
}

export default amplifyConfig;