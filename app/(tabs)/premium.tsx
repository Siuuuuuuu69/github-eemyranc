import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Crown, Check, ArrowLeft, Zap, Filter, Bell, MessageCircle } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { Button } from '@/components/ui/Button';

export default function PremiumScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { preferences, updatePreferences } = useUserPreferences();

  const premiumFeatures = [
    {
      icon: <Filter size={24} color={colors.primary} />,
      title: 'Filtres avancés dans les vols',
      description: 'Classe de voyage, compagnies préférées, aéroports spécifiques'
    },
    {
      icon: <Bell size={24} color={colors.primary} />,
      title: 'Alertes visa en temps réel',
      description: 'Notifications automatiques des changements de conditions'
    },
    {
      icon: <MessageCircle size={24} color={colors.primary} />,
      title: 'Chat IA personnalisé',
      description: 'Assistant virtuel pour répondre à toutes vos questions voyage'
    },
    {
      icon: <Zap size={24} color={colors.primary} />,
      title: 'Recommandations intelligentes',
      description: 'Suggestions personnalisées basées sur vos préférences'
    }
  ];

  const comingSoonFeatures = [
    'Comparaison d\'hôtels',
    'Planificateur d\'itinéraire',
    'Météo détaillée',
    'Cartes hors ligne',
    'Traducteur intégré'
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
    heroSection: {
      alignItems: 'center',
      marginBottom: 32,
    },
    crownIcon: {
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
    featuresCard: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      padding: 24,
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 20,
      textAlign: 'center',
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 20,
    },
    featureIcon: {
      marginRight: 16,
      marginTop: 2,
    },
    featureContent: {
      flex: 1,
    },
    featureTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    featureDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    comingSoonCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      borderWidth: 2,
      borderColor: colors.accent,
      borderStyle: 'dashed',
    },
    comingSoonTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.accent,
      marginBottom: 16,
      textAlign: 'center',
    },
    comingSoonItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    comingSoonText: {
      fontSize: 14,
      color: colors.text,
      marginLeft: 8,
    },
    pricingCard: {
      backgroundColor: colors.primary,
      borderRadius: 20,
      padding: 24,
      marginBottom: 24,
      alignItems: 'center',
    },
    priceText: {
      fontSize: 48,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 8,
    },
    priceSubtext: {
      fontSize: 16,
      color: '#FFFFFF',
      opacity: 0.8,
      marginBottom: 20,
    },
    currentPlanBadge: {
      backgroundColor: colors.success,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      marginBottom: 16,
    },
    currentPlanText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
    ctaButton: {
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 32,
      minWidth: 200,
    },
    ctaButtonText: {
      color: colors.primary,
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
    },
    footer: {
      alignItems: 'center',
      marginTop: 24,
    },
    footerText: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
  });

  const handleSubscribe = () => {
    // For V1, just show that it's coming soon
    alert('Abonnement bientôt disponible!\n\nLa fonctionnalité de paiement sera activée dans une prochaine version.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.backButton}>
            <ArrowLeft size={20} color={colors.primary} />
            <Text style={styles.backText} onPress={() => router.push('/(tabs)/profile')}>
              Retour au profil
            </Text>
          </View>
        </View>

        <View style={styles.heroSection}>
          <View style={styles.crownIcon}>
            <Crown size={64} color={colors.primary} />
          </View>
          <Text style={styles.title}>Passez au mode expert</Text>
          <Text style={styles.subtitle}>
            Débloquez toutes les fonctionnalités pour{'\n'}
            une expérience de voyage optimale
          </Text>
        </View>

        {preferences.isPremium && (
          <View style={styles.currentPlanBadge}>
            <Text style={styles.currentPlanText}>Plan Premium Actif</Text>
          </View>
        )}

        <View style={styles.featuresCard}>
          <Text style={styles.sectionTitle}>Fonctionnalités Premium</Text>
          {premiumFeatures.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                {feature.icon}
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.comingSoonCard}>
          <Text style={styles.comingSoonTitle}>Bientôt disponible</Text>
          {comingSoonFeatures.map((feature, index) => (
            <View key={index} style={styles.comingSoonItem}>
              <Check size={16} color={colors.accent} />
              <Text style={styles.comingSoonText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.pricingCard}>
          <Text style={styles.priceText}>9,99€</Text>
          <Text style={styles.priceSubtext}>par mois</Text>
          <View style={styles.ctaButton}>
            <Text style={styles.ctaButtonText} onPress={handleSubscribe}>
              S'abonner bientôt
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Le système de paiement sera activé prochainement.{'\n'}
            Toutes les fonctionnalités Premium seront alors disponibles.
          </Text>
        </View>

        <View style={{ marginTop: 32 }}>
          <Button
            title="Retour au profil"
            onPress={() => router.push('/(tabs)/profile')}
            variant="outline"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}