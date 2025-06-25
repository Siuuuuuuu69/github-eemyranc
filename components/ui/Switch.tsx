import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface SwitchProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export function Switch({ label, value, onValueChange, disabled = false }: SwitchProps) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
    },
    label: {
      fontSize: 16,
      color: colors.text,
      flex: 1,
    },
    switchContainer: {
      width: 50,
      height: 30,
      borderRadius: 15,
      backgroundColor: value ? colors.primary : colors.border,
      justifyContent: 'center',
      paddingHorizontal: 2,
    },
    switchThumb: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: '#FFFFFF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      alignSelf: value ? 'flex-end' : 'flex-start',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity 
        style={styles.switchContainer} 
        onPress={() => !disabled && onValueChange(!value)}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <View style={styles.switchThumb} />
      </TouchableOpacity>
    </View>
  );
}