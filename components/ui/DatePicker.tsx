import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

interface DatePickerProps {
  label: string;
  value?: string;
  onDateChange: (date: string) => void;
  placeholder?: string;
}

export function DatePicker({ label, value, onDateChange, placeholder }: DatePickerProps) {
  const { colors } = useTheme();

  const handleDatePress = () => {
    if (Platform.OS === 'web') {
      // For web, create a hidden input element
      const input = document.createElement('input');
      input.type = 'date';
      input.style.position = 'absolute';
      input.style.left = '-9999px';
      input.value = value || '';
      
      input.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        if (target.value) {
          onDateChange(target.value);
        }
        document.body.removeChild(input);
      });
      
      document.body.appendChild(input);
      input.click();
    } else {
      // For native platforms, you would use DateTimePickerModal or similar
      // For now, we'll use a simple alert to simulate date selection
      const today = new Date();
      const futureDate = new Date(today.getTime() + (365 * 24 * 60 * 60 * 1000));
      const dateString = futureDate.toISOString().split('T')[0];
      onDateChange(dateString);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return placeholder || 'Sélectionner une date';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    trigger: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      minHeight: 48,
    },
    text: {
      fontSize: 16,
      color: value ? colors.text : colors.textSecondary,
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.trigger} onPress={handleDatePress}>
        <Text style={styles.text}>{formatDate(value || '')}</Text>
        <Calendar size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}