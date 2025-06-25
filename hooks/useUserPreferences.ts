import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserPreferences {
  email?: string;
  language: string;
  currency: string;
  nationality: string;
  passportExpiry?: string;
  isPremium: boolean;
}

const defaultPreferences: UserPreferences = {
  language: 'france',
  currency: 'EUR',
  nationality: 'france',
  isPremium: false,
};

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const saved = await AsyncStorage.getItem('userPreferences');
      if (saved) {
        setPreferences({ ...defaultPreferences, ...JSON.parse(saved) });
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    const newPreferences = { ...preferences, ...updates };
    setPreferences(newPreferences);
    try {
      await AsyncStorage.setItem('userPreferences', JSON.stringify(newPreferences));
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  return { preferences, updatePreferences, loading };
}