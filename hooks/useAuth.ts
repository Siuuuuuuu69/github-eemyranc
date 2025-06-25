import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false,
        });
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          loading: false,
        });
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
      setAuthState({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulation d'une authentification
      // En production, vous feriez un appel API ici
      if (email && password.length >= 6) {
        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(user));
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name?: string): Promise<boolean> => {
    try {
      // Simulation d'une inscription
      // En production, vous feriez un appel API ici
      if (email && password.length >= 6) {
        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: name || email.split('@')[0],
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(user));
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setAuthState({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const bypass = async () => {
    // Fonction de bypass pour les tests
    const user: User = {
      id: 'test-user',
      email: 'test@example.com',
      name: 'Utilisateur Test',
    };
    
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setAuthState({
      user,
      isAuthenticated: true,
      loading: false,
    });
  };

  return {
    ...authState,
    login,
    register,
    logout,
    bypass,
  };
}