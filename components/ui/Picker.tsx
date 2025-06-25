import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, StyleSheet } from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

interface PickerOption {
  code: string;
  symbol?: string;
  name?: string;
  currency?: string;
}

interface PickerProps {
  label: string;
  value: string;
  options: string[] | PickerOption[];
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function Picker({ label, value, options, onValueChange, placeholder }: PickerProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const { colors } = useTheme();

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
    triggerText: {
      fontSize: 16,
      color: colors.text,
      flex: 1,
      textTransform: 'capitalize',
    },
    placeholderText: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    modal: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: colors.background,
      borderRadius: 16,
      maxHeight: '80%',
      width: '90%',
      maxWidth: 400,
    },
    modalHeader: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      textAlign: 'center',
    },
    optionsList: {
      maxHeight: 400,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    optionText: {
      fontSize: 16,
      color: colors.text,
      flex: 1,
      textTransform: 'capitalize',
    },
    optionDetails: {
      fontSize: 14,
      color: colors.textSecondary,
      marginLeft: 8,
    },
    selectedOption: {
      backgroundColor: colors.surface,
    },
  });

  const getDisplayValue = () => {
    if (!value) return placeholder || 'Sélectionner...';
    
    if (typeof options[0] === 'object') {
      const option = (options as PickerOption[]).find(opt => opt.code === value);
      if (option) {
        if (option.symbol) {
          return `${option.code} - ${option.symbol}`;
        }
        return option.name || option.code;
      }
    }
    
    return value;
  };

  const renderOption = (option: string | PickerOption, index: number) => {
    const isString = typeof option === 'string';
    const optionValue = isString ? option : option.code;
    const isSelected = value === optionValue;

    let displayText = '';
    let details = '';

    if (isString) {
      displayText = option;
    } else {
      if (option.symbol) {
        // Currency option
        displayText = `${option.code} - ${option.symbol}`;
        details = option.name || '';
      } else if (option.name) {
        // Country option
        displayText = option.name;
        details = option.currency ? `(${option.currency})` : '';
      } else {
        displayText = option.code;
      }
    }

    return (
      <TouchableOpacity
        key={index}
        style={[styles.option, isSelected && styles.selectedOption]}
        onPress={() => {
          onValueChange(optionValue);
          setIsVisible(false);
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={[styles.optionText, { textTransform: isString ? 'capitalize' : 'none' }]}>
            {displayText}
          </Text>
          {details && <Text style={styles.optionDetails}>{details}</Text>}
        </View>
        {isSelected && <Check size={20} color={colors.primary} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.trigger} onPress={() => setIsVisible(true)}>
        <Text style={value ? styles.triggerText : styles.placeholderText}>
          {getDisplayValue()}
        </Text>
        <ChevronDown size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <Modal visible={isVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.modal} onPress={() => setIsVisible(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
            </View>
            <ScrollView style={styles.optionsList}>
              {options.map((option, index) => renderOption(option, index))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}