import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Shield, Clock, Import as Passport, ExternalLink, Plane, Plus, ArrowLeft } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { Button } from '@/components/ui/Button';
import visaData from '@/data/visa_data.json';

interface VisaInfo {
  nationalite: string;
  destination: string;
  visa_requis: boolean;
  duree_max: number;
  validite_passeport_mois: number;
  lien_visa: string;
}

export default function ConditionsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { colors } = useTheme();
  const { preferences } = useUserPreferences();
  const [visaInfo, setVisaInfo] = useState<VisaInfo | null>(null);

  const nationality = (params.nationality as string) || preferences.nationality;
  const destination = params.destination as string;

  useEffect(() => {
    if (nationality && destination) {
      const info = visaData.find(
        (item) => 
          item.nationalite.toLowerCase() === nationality.toLowerCase() && 
          item.destination.toLowerCase() === destination.toLowerCase()
      );
      setVisaInfo(info || null);
    }
  }, [nationality, destination]);

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
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    infoIcon: {
      marginRight: 12,
    },
    infoText: {
      flex: 1,
    },
    infoLabel: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    infoValue: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    successValue: {
      color: colors.success,
    },
    errorValue: {
      color: colors.error,
    },
    warningValue: {
      color: colors.warning,
    },
    visaCard: {
      backgroundColor: colors.error,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    visaText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 12,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 16,
    },
    button: {
      flex: 1,
    },
    noDataCard: {
      backgroundColor: colors.warning,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    noDataText: {
      color: '#FFFFFF',
      fontSize: 16,
      textAlign: 'center',
    },
  });

  const handleAddToChecklist = () => {
    Alert.alert(
      'Ajouté à la checklist',
      'Les informations de visa ont été ajoutées à votre checklist de voyage.',
      [{ text: 'OK' }]
    );
  };

  const handleOpenVisaLink = () => {
    if (visaInfo?.lien_visa) {
      // In a real app, you would use Linking.openURL or expo-web-browser
      Alert.alert(
        'Lien visa',
        `Redirection vers: ${visaInfo.lien_visa}`,
        [{ text: 'OK' }]
      );
    }
  };

  if (!nationality || !destination) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Informations manquantes</Text>
          <Button
            title="Retour à l'accueil"
            onPress={() => router.push('/(tabs)/')}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.backButton}>
            <ArrowLeft size={20} color={colors.primary} />
            <Text style={styles.backText}>Retour</Text>
          </View>
          <Text style={styles.title}>Conditions d'entrée</Text>
          <Text style={styles.subtitle}>
            De {nationality} vers {destination}
          </Text>
        </View>

        {!visaInfo ? (
          <View style={styles.noDataCard}>
            <Text style={styles.noDataText}>
              Informations non disponibles pour cette combinaison pays.{'\n'}
              Veuillez consulter l'ambassade ou le consulat.
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.card}>
              <View style={styles.infoRow}>
                <Shield 
                  size={24} 
                  color={visaInfo.visa_requis ? colors.error : colors.success} 
                  style={styles.infoIcon}
                />
                <View style={styles.infoText}>
                  <Text style={styles.infoLabel}>Visa requis</Text>
                  <Text style={[
                    styles.infoValue,
                    visaInfo.visa_requis ? styles.errorValue : styles.successValue
                  ]}>
                    {visaInfo.visa_requis ? 'Oui' : 'Non'}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Clock size={24} color={colors.primary} style={styles.infoIcon} />
                <View style={styles.infoText}>
                  <Text style={styles.infoLabel}>Durée maximum de séjour</Text>
                  <Text style={styles.infoValue}>
                    {visaInfo.duree_max} jours
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Passport size={24} color={colors.warning} style={styles.infoIcon} />
                <View style={styles.infoText}>
                  <Text style={styles.infoLabel}>Validité passeport requise</Text>
                  <Text style={[styles.infoValue, styles.warningValue]}>
                    {visaInfo.validite_passeport_mois} mois minimum
                  </Text>
                </View>
              </View>
            </View>

            {visaInfo.visa_requis && visaInfo.lien_visa && (
              <View style={styles.visaCard}>
                <Text style={styles.visaText}>
                  Un visa est requis pour ce voyage
                </Text>
                <Button
                  title="Demander un visa (iVisa)"
                  onPress={handleOpenVisaLink}
                  variant="outline"
                  style={{ borderColor: '#FFFFFF' }}
                  textStyle={{ color: '#FFFFFF' }}
                />
              </View>
            )}

            <View style={styles.buttonRow}>
              <Button
                title="Comparer les vols"
                onPress={() => router.push({
                  pathname: '/(tabs)/flights',
                  params: { destination }
                })}
                variant="primary"
                style={styles.button}
              />
              <Button
                title="Ajouter à ma checklist"
                onPress={handleAddToChecklist}
                variant="secondary"
                style={styles.button}
              />
            </View>
          </>
        )}

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