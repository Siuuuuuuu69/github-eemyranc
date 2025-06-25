import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SquareCheck as CheckSquare, Square, Plus, ArrowLeft, Trash2 } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  isCustom: boolean;
}

export default function ChecklistScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newItemText, setNewItemText] = useState('');
  const [loading, setLoading] = useState(true);

  const defaultItems: Omit<ChecklistItem, 'id'>[] = [
    { text: 'Vérifier la validité du passeport', completed: false, isCustom: false },
    { text: 'Faire une demande de visa si nécessaire', completed: false, isCustom: false },
    { text: 'Souscrire une assurance voyage', completed: false, isCustom: false },
    { text: 'Réserver les vols', completed: false, isCustom: false },
    { text: 'Réserver l\'hébergement', completed: false, isCustom: false },
    { text: 'Échanger de la monnaie locale', completed: false, isCustom: false },
    { text: 'Préparer les documents de voyage', completed: false, isCustom: false },
    { text: 'Faire ses bagages', completed: false, isCustom: false },
    { text: 'Confirmer les réservations', completed: false, isCustom: false },
    { text: 'Informer la banque du voyage', completed: false, isCustom: false },
  ];

  useEffect(() => {
    loadChecklist();
  }, []);

  const loadChecklist = async () => {
    try {
      const saved = await AsyncStorage.getItem('checklist');
      if (saved) {
        setItems(JSON.parse(saved));
      } else {
        const initialItems = defaultItems.map(item => ({
          ...item,
          id: Math.random().toString(36).substr(2, 9)
        }));
        setItems(initialItems);
        await AsyncStorage.setItem('checklist', JSON.stringify(initialItems));
      }
    } catch (error) {
      console.error('Error loading checklist:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveChecklist = async (newItems: ChecklistItem[]) => {
    try {
      await AsyncStorage.setItem('checklist', JSON.stringify(newItems));
    } catch (error) {
      console.error('Error saving checklist:', error);
    }
  };

  const toggleItem = (id: string) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(newItems);
    saveChecklist(newItems);
  };

  const addCustomItem = () => {
    if (newItemText.trim()) {
      const newItem: ChecklistItem = {
        id: Math.random().toString(36).substr(2, 9),
        text: newItemText.trim(),
        completed: false,
        isCustom: true
      };
      const newItems = [...items, newItem];
      setItems(newItems);
      saveChecklist(newItems);
      setNewItemText('');
    }
  };

  const deleteItem = (id: string) => {
    Alert.alert(
      'Supprimer l\'élément',
      'Êtes-vous sûr de vouloir supprimer cet élément ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            const newItems = items.filter(item => item.id !== id);
            setItems(newItems);
            saveChecklist(newItems);
          }
        }
      ]
    );
  };

  const completedCount = items.filter(item => item.completed).length;
  const progressPercentage = items.length > 0 ? (completedCount / items.length) * 100 : 0;

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
    },
    progressCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
    },
    progressText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 12,
    },
    progressBar: {
      height: 8,
      backgroundColor: colors.border,
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: colors.success,
      borderRadius: 4,
    },
    progressStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    progressStat: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    addItemCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
    },
    addItemTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
    },
    addItemRow: {
      flexDirection: 'row',
      gap: 12,
    },
    addItemInput: {
      flex: 1,
    },
    checklistItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 8,
    },
    completedItem: {
      opacity: 0.6,
    },
    itemCheckbox: {
      marginRight: 12,
    },
    itemText: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
    },
    completedText: {
      textDecorationLine: 'line-through',
      color: colors.textSecondary,
    },
    deleteButton: {
      padding: 8,
      marginLeft: 8,
    },
    customItemBadge: {
      backgroundColor: colors.accent,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      marginLeft: 8,
    },
    customItemText: {
      fontSize: 10,
      color: '#FFFFFF',
      fontWeight: '600',
    },
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.content, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: colors.text }}>Chargement...</Text>
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
            <Text style={styles.backText}>Retour au profil</Text>
          </View>
          <Text style={styles.title}>Checklist Voyage</Text>
          <Text style={styles.subtitle}>
            Préparez votre départ en toute sérénité
          </Text>
        </View>

        <View style={styles.progressCard}>
          <Text style={styles.progressText}>
            Progression: {Math.round(progressPercentage)}%
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
          </View>
          <View style={styles.progressStats}>
            <Text style={styles.progressStat}>
              {completedCount} complétées
            </Text>
            <Text style={styles.progressStat}>
              {items.length - completedCount} restantes
            </Text>
          </View>
        </View>

        <View style={styles.addItemCard}>
          <Text style={styles.addItemTitle}>Ajouter une tâche personnalisée</Text>
          <View style={styles.addItemRow}>
            <Input
              label=""
              value={newItemText}
              onChangeText={setNewItemText}
              placeholder="Nouvelle tâche..."
              style={styles.addItemInput}
            />
            <Button
              title="Ajouter"
              onPress={addCustomItem}
              disabled={!newItemText.trim()}
              size="medium"
            />
          </View>
        </View>

        <View>
          {items.map((item) => (
            <View
              key={item.id}
              style={[styles.checklistItem, item.completed && styles.completedItem]}
            >
              <View style={styles.itemCheckbox}>
                {item.completed ? (
                  <CheckSquare
                    size={24}
                    color={colors.success}
                    onPress={() => toggleItem(item.id)}
                  />
                ) : (
                  <Square
                    size={24}
                    color={colors.textSecondary}
                    onPress={() => toggleItem(item.id)}
                  />
                )}
              </View>
              <Text style={[styles.itemText, item.completed && styles.completedText]}>
                {item.text}
              </Text>
              {item.isCustom && (
                <View style={styles.customItemBadge}>
                  <Text style={styles.customItemText}>CUSTOM</Text>
                </View>
              )}
              {item.isCustom && (
                <View style={styles.deleteButton}>
                  <Trash2
                    size={20}
                    color={colors.error}
                    onPress={() => deleteItem(item.id)}
                  />
                </View>
              )}
            </View>
          ))}
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