import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Plane, Calendar, DollarSign, ArrowLeft, Filter, Star } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { Button } from '@/components/ui/Button';
import { DatePicker } from '@/components/ui/DatePicker';
import { Switch } from '@/components/ui/Switch';
import { Picker } from '@/components/ui/Picker';

export default function FlightsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { colors } = useTheme();
  const { preferences } = useUserPreferences();
  
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [maxBudget, setMaxBudget] = useState('1000');
  const [directFlightsOnly, setDirectFlightsOnly] = useState(false);
  const [travelClass, setTravelClass] = useState('economy');
  const [showResults, setShowResults] = useState(false);

  const destination = params.destination as string;

  const travelClasses = [
    { code: 'economy', name: 'Économique' },
    { code: 'business', name: 'Affaires' },
    { code: 'first', name: 'Première' }
  ];

  const airlines = [
    { code: 'all', name: 'Toutes les compagnies' },
    { code: 'air-france', name: 'Air France' },
    { code: 'emirates', name: 'Emirates' },
    { code: 'lufthansa', name: 'Lufthansa' }
  ];

  const mockFlights = [
    {
      id: 1,
      airline: 'Air France',
      departure: '08:30',
      arrival: '14:45',
      duration: '6h 15m',
      price: 850,
      stops: 0
    },
    {
      id: 2,
      airline: 'Emirates',
      departure: '11:20',
      arrival: '19:30',
      duration: '8h 10m',
      price: 920,
      stops: 1
    },
    {
      id: 3,
      airline: 'Lufthansa',
      departure: '15:15',
      arrival: '22:00',
      duration: '6h 45m',
      price: 780,
      stops: 0
    }
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: 20,
    },
    header: {
      marginBottom: 24,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    backText: {
      fontSize: 16,
      color: colors.primary,
      marginLeft: 8,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textTransform: 'capitalize',
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
    },
    budgetContainer: {
      marginBottom: 16,
    },
    budgetLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    budgetInput: {
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: colors.text,
    },
    premiumSection: {
      opacity: preferences.isPremium ? 1 : 0.5,
    },
    premiumOverlay: {
      backgroundColor: colors.warning,
      borderRadius: 12,
      padding: 12,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    premiumText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
      marginLeft: 8,
      flex: 1,
    },
    premiumButton: {
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
    },
    premiumButtonText: {
      color: colors.warning,
      fontSize: 12,
      fontWeight: '600',
    },
    flightCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    flightHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    airline: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    price: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.primary,
    },
    flightDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    timeContainer: {
      alignItems: 'center',
    },
    time: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    duration: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 4,
    },
    stops: {
      fontSize: 12,
      color: colors.textSecondary,
    },
  });

  const handleSearch = () => {
    if (!departureDate) {
      Alert.alert('Erreur', 'Veuillez sélectionner une date de départ');
      return;
    }
    setShowResults(true);
  };

  const renderFlightResults = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Résultats de recherche</Text>
      {mockFlights.map((flight) => (
        <View key={flight.id} style={styles.flightCard}>
          <View style={styles.flightHeader}>
            <Text style={styles.airline}>{flight.airline}</Text>
            <Text style={styles.price}>{flight.price}€</Text>
          </View>
          <View style={styles.flightDetails}>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{flight.departure}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Plane size={16} color={colors.textSecondary} />
              <Text style={styles.duration}>{flight.duration}</Text>
              <Text style={styles.stops}>
                {flight.stops === 0 ? 'Direct' : `${flight.stops} escale`}
              </Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{flight.arrival}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.backButton}>
            <ArrowLeft size={20} color={colors.primary} />
            <Text style={styles.backText}>Retour</Text>
          </View>
          <Text style={styles.title}>Comparateur de vols</Text>
          <Text style={styles.subtitle}>
            Destination: {destination}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Dates de voyage</Text>
          
          <DatePicker
            label="Date de départ"
            value={departureDate}
            onDateChange={setDepartureDate}
            placeholder="Sélectionner la date de départ"
          />

          <DatePicker
            label="Date de retour (optionnel)"
            value={returnDate}
            onDateChange={setReturnDate}
            placeholder="Sélectionner la date de retour"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Préférences de vol</Text>
          
          <View style={styles.budgetContainer}>
            <Text style={styles.budgetLabel}>Budget maximum (€)</Text>
            <Text style={styles.budgetInput}>{maxBudget}€</Text>
          </View>

          <Switch
            label="Vols directs uniquement"
            value={directFlightsOnly}
            onValueChange={setDirectFlightsOnly}
          />
        </View>

        {!preferences.isPremium && (
          <View style={styles.premiumOverlay}>
            <Star size={20} color="#FFFFFF" />
            <Text style={styles.premiumText}>
              Filtres avancés disponibles avec Premium
            </Text>
            <View style={styles.premiumButton}>
              <Text style={styles.premiumButtonText}>Passer Pro</Text>
            </View>
          </View>
        )}

        <View style={[styles.card, styles.premiumSection]}>
          <Text style={styles.sectionTitle}>Filtres avancés (Premium)</Text>
          
          <Picker
            label="Classe de voyage"
            value={travelClass}
            options={travelClasses}
            onValueChange={setTravelClass}
          />

          <Picker
            label="Compagnies préférées"
            value="all"
            options={airlines}
            onValueChange={() => {}}
          />
        </View>

        <View style={styles.card}>
          <Button
            title="Rechercher des vols"
            onPress={handleSearch}
            size="large"
          />
        </View>

        {showResults && renderFlightResults()}

        <View style={{ marginTop: 24 }}>
          <Button
            title="Retour à l'accueil"
            onPress={() => router.push('/(tabs)/')}
            variant="outline"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}