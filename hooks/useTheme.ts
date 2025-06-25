import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Theme {
  isDark: boolean;
  colors: {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    text: string;
    textSecondary: string;
    border: string;
    disabled: string;
  };
}

const lightTheme: Theme = {
  isDark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#F8FAFC',
    primary: '#2563EB',
    secondary: '#0891B2',
    accent: '#059669',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    disabled: '#9CA3AF',
  },
};

const darkTheme: Theme = {
  isDark: true,
  colors: {
    background: '#111827',
    surface: '#1F2937',
    primary: '#3B82F6',
    secondary: '#06B6D4',
    accent: '#10B981',
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#F87171',
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    border: '#374151',
    disabled: '#6B7280',
  },
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme === 'dark') {
        setTheme(darkTheme);
      } else {
        setTheme(lightTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme.isDark ? lightTheme : darkTheme;
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme.isDark ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return { ...theme, toggleTheme };
}