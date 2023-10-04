import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  secondary?: boolean;
};

export const Button = ({ title, onPress, secondary = false }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,
        secondary ? styles.buttonSecondary : styles.buttonPrimary,
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.buttonText,
          secondary ? styles.buttonTextSecondary : styles.buttonTextPrimary,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 16,
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#F8659F',
    borderColor: '#fff',
    borderWidth: 1,
    flex: 1,
  },
  buttonSecondary: {
    borderColor: '#F8659F',
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  buttonTextPrimary: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextSecondary: {
    color: '#F8659F',
  },
});
