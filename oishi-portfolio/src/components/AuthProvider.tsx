'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Amplify } from 'aws-amplify';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

type AuthContextType = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: any | null;
  checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  isAuthenticated: false,
  user: null,
  checkAuth: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isConfigured, setIsConfigured] = useState(false);

  // Amplify設定を取得して初期化
  useEffect(() => {
    const initializeAmplify = async () => {
      try {
        const response = await fetch('/api/auth/config');
        if (!response.ok) {
          throw new Error('Failed to fetch config');
        }
        
        const config = await response.json();
        Amplify.configure(config);
        setIsConfigured(true);
      } catch (error) {
        console.error('Failed to initialize Amplify:', error);
        setIsLoading(false);
      }
    };

    initializeAmplify();
  }, []);

  // 認証状態をチェック
  const checkAuth = async () => {
    if (!isConfigured) return;
    
    try {
      setIsLoading(true);
      const session = await fetchAuthSession();
      
      if (session.tokens) {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 設定完了後に認証チェック
  useEffect(() => {
    if (isConfigured) {
      checkAuth();
    }
  }, [isConfigured]);

  return (
    <AuthContext.Provider value={{ isLoading, isAuthenticated, user, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}