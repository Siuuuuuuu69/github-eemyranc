import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SquareCheck as CheckSquare, Crown, LogOut, User, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Picker } from '@/components/ui/Picker';
import { Switch } from '@/components/ui/Switch';
import { DatePicker } from '@/components/ui/DatePicker';
import { countries } from '@/data/countries';
import { currencies } from '@/data/currencies';

export default function ProfileScreen() {
  const router = useRouter();
  const { colors, isDark, toggleTheme } = useTheme();
  const { preferences, updatePreferences, loading: preferencesLoading } = useUserPreferences();
  const { user, isAuthenticated, loading: authLoading, login, register, logout, bypass } = useAuth();

  // Auth form states
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

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
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    authCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 24,
      marginBottom: 24,
    },
    authTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 8,
    },
    authSubtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 24,
    },
    passwordContainer: {
      position: 'relative',
    },
    passwordToggle: {
      position: 'absolute',
      right: 16,
      top: 40,
      zIndex: 1,
    },
    authError: {
      color: colors.error,
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 16,
    },
    authSwitch: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16,
    },
    authSwitchText: {
      color: colors.textSecondary,
      fontSize: 14,
    },
    authSwitchLink: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: '600',
      marginLeft: 4,
    },
    bypassContainer: {
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    bypassText: {
      fontSize: 12,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 8,
    },
    userInfo: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      flexDirection: 'row',
      alignItems: 'center',
    },
    userIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    userDetails: {
      flex: 1,
    },
    userName: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 16,
    },
    button: {
      flex: 1,
    },
    logoutButton: {
      marginTop: 16,
    },
  });

  const handleAuth = async () => {
    setAuthError('');
    
    if (!email || !password) {
      setAuthError('Veuillez remplir tous les champs');
      return;
    }

    if (password.length < 6) {
      setAuthError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    const success = isLoginMode 
      ? await login(email, password)
      : await register(email, password, name);

    if (!success) {
      setAuthError(isLoginMode 
        ? 'Email ou mot de passe incorrect'
        : 'Erreur lors de la création du compte'
      );
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnecter', style: 'destructive', onPress: logout }
      ]
    );
  };

  if (authLoading || preferencesLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.content, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: colors.text }}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Bienvenue</Text>
            <Text style={styles.subtitle}>
              {isLoginMode ? 'Connectez-vous pour continuer' : 'Créez votre compte'}
            </Text>
          </View>
          <View style={styles.authCard}>
            <Text style={styles.authTitle}>
              {isLoginMode ? 'Connexion' : 'Inscription'}
            </Text>
            <Text style={styles.authSubtitle}>
              {isLoginMode 
                ? 'Accédez à votre compte SIUUUU'
                : 'Rejoignez la communauté SIUUUU'
              }
            </Text>
            {!isLoginMode && (
              <Input
                label="Nom (optionnel)"
                value={name}
                onChangeText={setName}
                placeholder="Votre nom"
                autoCapitalize="words"
              />
            )}
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="votre@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.passwordContainer}>
              <Input
                label="Mot de passe"
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry={!showPassword}
              />
              <View style={styles.passwordToggle}>
                {showPassword ? (
                  <EyeOff 
                    size={20} 
                    color={colors.textSecondary} 
                    onPress={() => setShowPassword(false)}
                  />
                ) : (
                  <Eye 
                    size={20} 
                    color={colors.textSecondary} 
                    onPress={() => setShowPassword(true)}
                  />
                )}
              </View>
            </View>
            {authError && <Text style={styles.authError}>{authError}</Text>}
            <Button
              title={isLoginMode ? 'Se connecter' : 'Créer le compte'}
              onPress={handleAuth}
              size="large"
            />
            <View style={styles.authSwitch}>
              <Text style={styles.authSwitchText}>
                {isLoginMode ? 'Pas encore de compte ?' : 'Déjà un compte ?'}
              </Text>
              <Text 
                style={styles.authSwitchLink}
                onPress={() => {
                  setIsLoginMode(!isLoginMode);
                  setAuthError('');
                }}
              >
                {isLoginMode ? 'S\'inscrire' : 'Se connecter'}
              </Text>
            </View>
            <View style={styles.bypassContainer}>
              <Text style={styles.bypassText}>Mode développement</Text>
              <Button
                title="Bypass (Test)"
                onPress={bypass}
                variant="outline"
                size="small"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profil</Text>
          <Text style={styles.subtitle}>Gérez vos préférences de voyage</Text>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.userIcon}>
            <User size={24} color="#FFFFFF" />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user?.name || 'Utilisateur'}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
          <LogOut 
            size={20} 
            color={colors.textSecondary} 
            onPress={handleLogout}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations personnelles</Text>
          <View style={styles.card}>
            <Input
              label="Email (facultatif)"
              value={preferences.email || ''}
              onChangeText={(email) => updatePreferences({ email })}
              placeholder="votre@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Picker
              label="Nationalité"
              value={preferences.nationality}
              options={countries}
              onValueChange={(nationality) => updatePreferences({ nationality })}
            />
            <DatePicker
              label="Date d'expiration du passeport"
              value={preferences.passportExpiry}
              onDateChange={(passportExpiry) => updatePreferences({ passportExpiry })}
              placeholder="Sélectionner la date d'expiration"
            />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences</Text>
          <View style={styles.card}>
            <Picker
              label="Langue de l'application"
              value={preferences.language}
              options={countries}
              onValueChange={(language) => updatePreferences({ language })}
            />
            <Picker
              label="Devise préférée"
              value={preferences.currency}
              options={currencies}
              onValueChange={(currency) => updatePreferences({ currency })}
            />
            <Switch
              label={`Mode ${isDark ? 'clair' : 'sombre'}`}
              value={isDark}
              onValueChange={toggleTheme}
            />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.buttonRow}>
            <Button
              title="Ma checklist"
              onPress={() => router.push('/(tabs)/checklist')}
              variant="secondary"
              style={styles.button}
            />
            <Button
              title="Premium"
              onPress={() => router.push('/(tabs)/premium')}
              variant="outline"
              style={styles.button}
            />
          </View>
        </View>
        <View style={styles.section}>
          <Button
            title="Continuer vers l'accueil"
            onPress={() => router.push('/(tabs)/')}
            size="large"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}