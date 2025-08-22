// src/translations/ja.ts

export const JA = {
  ja: {
    // サインイン画面
    'Username': 'ユーザー名',
    'Password': 'パスワード',
    'Email Address *': 'メールアドレス',
    'Enter your phone_number': '電話番号を入力してください',
    'Enter your Username': 'ユーザー名を入力してください',
    'Enter your Password': 'パスワードを入力してください',
    'Confirm Password': 'パスワードを確認',
    'Please confirm your Password': 'パスワードを再入力してください',
    'Reset Password': 'パスワードのリセット',
    'Sign In': 'サインイン',
    'Sign in': 'サインイン',
    'Sign Up': 'サインアップ',
    'Forgot your password?': 'パスワードをお忘れの方',
    'Reset password': 'パスワードをリセット',
    'No account?': 'アカウントを持っていない方',
    'Create account': 'アカウントを作成',
    'Create Account': 'アカウントを作成',
    'Have an account?': 'アカウントお持ちの方',
    'Confirm Sign up': 'サインアップの確認',
    'Back to Sign In': 'サインインに戻る',
    'Send code': 'コードを送信',
    'Sign in to your account': 'アカウントにサインイン',
    
    // ソーシャルログイン
    'Sign In with Amazon': 'Amazonでサインイン',
    'Sign In with Apple': 'Apple でサインイン',
    'Sign In with Facebook': 'Facebookでサインイン',
    'Sign In with Google': 'Googleでサインイン',
    'Sign Up with Amazon': 'Amazonでアカウントを作成',
    'Sign Up with Apple': 'Appleでアカウントを作成',
    'Sign Up with Facebook': 'Facebookでアカウントを作成',
    'Sign Up with Google': 'Googleでアカウントを作成',
    
    // 確認コード関連
    'Enter your confirmation code': '確認コードを入力してください',
    'Enter your new password': '新しいパスワードを入力してください',
    'Enter your password': 'パスワードを入力してください',
    'Confirm': '確認',
    'Confirmation Code': '確認コード',
    'Resend Code': 'コードを再送',
    'We Emailed You': 'メールを送信しました',
    'Enter your code': '認証コード',
    
    // バリデーションメッセージ
    'Password cannot be empty': 'パスワードは必須入力です',
    'Please Sign In / Sign Up': 'サインインまたは新規登録をしてください',
    'Username cannot be empty': 'ユーザー名は必須入力です',
    'Password must have at least 8 characters': 'パスワードは8文字以上にしてください',
    'Your passwords must match': 'パスワードがマッチしません',
    
    // エラーメッセージ
    'User does not exist': 'ユーザーが存在しません',
    'User does not exist.': 'ユーザーが存在しません',
    'Username/client id combination not found.': 'ユーザー名が見つかりません',
    'Incorrect username or password.': 'ユーザー名またはパスワードが違います',
    'User is not confirmed.': 'ユーザーは検証されていません',
    'User already exists': 'ユーザーは既に存在します',
    'Invalid verification code provided, please try again.': '指定された確認コードが無効です。もう一度お試しください',
    'Invalid password format': 'パスワードのフォーマットが不正です',
    'Invalid phone number format': '不正な電話番号フォーマットです。電話番号は次のフォーマットで入力してください: +12345678900',
    'An account with the given email already exists.': 'そのメールアドレスは既に存在します',
    'Password attempts exceeded': 'パスワード試行回数が超過しました',
    'Attempt limit exceeded, please try after some time.': '試行制限を超過しました。しばらくしてからもう一度お試しください',
    'CUSTOM_AUTH is not enabled for the client.': 'パスワードは必須です',
    
    // パスワードポリシー関連
    'Password did not conform with policy: Password not long enough': 'パスワードは8文字以上を入力してください (8文字以上の大文字小文字を含む英数字)',
    'Password does not conform to policy: Password not long enough': 'パスワードは8文字以上を入力してください (8文字以上の大文字小文字を含む英数字)',
    'Password does not conform to policy: Password must have uppercase characters': 'パスワードには大文字を含めてください (8文字以上の大文字小文字を含む英数字)',
    'Password does not conform to policy: Password must have lowercase characters': 'パスワードには小文字を含めてください (8文字以上の大文字小文字を含む英数字)',
    'Password does not conform to policy: Password must have numeric characters': 'パスワードには数字を含めてください (8文字以上の大文字小文字を含む英数字)',
    
    // バリデーションエラー（複数）
    "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6": 'パスワードは8文字以上、大文字小文字を含む英数字を指定してください',
    "2 validation errors detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6; Value at 'password' failed to satisfy constraint: Member must satisfy regular expression pattern: ^[\S]+.*[\S]+$": 'パスワードは8文字以上、大文字小文字を含む英数字を指定してください',
    
    // 追加のメッセージ（必要に応じて）
    'Code mismatch and fail enable SMS MFA': '確認コードが一致しません',
    'SMS not enabled for the user pool.': 'SMSが有効になっていません',
    'Cannot reset password for the user as there is no registered/verified email or phone_number': 'メールアドレスまたは電話番号が登録されていないため、パスワードをリセットできません',
    'User is disabled': 'ユーザーは無効化されています',
    'User is already confirmed.': 'ユーザーは既に確認済みです',
    'Confirmation code cannot be empty': '確認コードは必須です',
    'Network error': 'ネットワークエラーが発生しました',
    
    // カスタムメッセージ（あなたのサイト用）
    'UserNotFoundException': 'ユーザーが見つかりません',
    'NotAuthorizedException': 'ユーザー名またはパスワードが正しくありません',
    'UserNotConfirmedException': 'メールアドレスの確認が完了していません',
  },
};