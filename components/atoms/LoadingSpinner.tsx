import { Typography } from '@/components/atoms/Typography';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

/**
 * LoadingSpinner Atom
 * 
 * A reusable loading indicator with optional text.
 * Provides consistent loading states across the app.
 */

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  centered?: boolean;
}

export default function LoadingSpinner({
  size = 'large',
  color = '#3B82F6',
  text,
  centered = true,
}: LoadingSpinnerProps) {
  const Container = centered ? View : React.Fragment;
  const containerStyle = centered ? styles.centered : undefined;

  return (
    <Container style={containerStyle}>
      <ActivityIndicator size={size} color={color} />
      {text && (
        <Typography 
          variant="body" 
          weight="medium" 
          color="#6B7280"
          style={styles.text}
        >
          {text}
        </Typography>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
  },
  text: {
    marginTop: 12,
    textAlign: 'center',
  },
});
