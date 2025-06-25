import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, ArrowRight } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { Button } from '@/components/ui/Button';
import { Picker } from '@/components/ui/Picker';
import { countries } from '@/data/countries';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { preferences, updatePreferences } = useUserPreferences();
  const [destination, setDestination] = useState('');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: 20,
      flex: 1,
      justifyContent: 'center',
    },
    header: {
      alignItems: 'center',
      marginBottom: 48,
    },
    icon: {
      marginBottom: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 18,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      padding: 24,
      marginBottom: 32,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 4,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 20,
      textAlign: 'center',
    },
    button: {
      marginTop: 8,
    },
    footer: {
      alignItems: 'center',
      marginTop: 24,
    },
    footerText: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });

  const handleCheckConditions = () => {
    if (destination) {
      router.push({
        pathname: '/(tabs)/conditions',
        params: { 
          nationality: preferences.nationality,
          destination: destination
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.icon}>
            <MapPin size={48} color={colors.primary} />
          </View>
          <Text style={styles.title}>SIUUUU</Text>
          <Text style={styles.subtitle}>
            Votre assistant de voyage intelligent{'\n'}
            Vérifiez les conditions d'entrée facilement
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Planifiez votre voyage</Text>
          <Picker
            label="Ma nationalité"
            value={preferences.nationality}
            options={countries}
            onValueChange={(nationality) => updatePreferences({ nationality })}
          />
          <Picker
            label="Destination"
            value={destination}
            options={countries}
            onValueChange={setDestination}
            placeholder="Où souhaitez-vous aller ?"
          />
          <Button
            title="Puis-je y aller ?"
            onPress={handleCheckConditions}
            disabled={!destination}
            size="large"
            style={styles.button}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Sélectionnez votre nationalité et votre destination{'\n'}
            pour vérifier les conditions d'entrée
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}