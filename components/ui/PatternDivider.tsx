import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { colors } from '@/constants/theme';

interface PatternDividerProps {
  tone?: 'gold' | 'dark';
  height?: number;
}

/**
 * Motif signature de la marque : un chevron tissé fin et répété,
 * clin d'œil discret aux textiles africains sans reprendre un motif
 * culturel précis. Utilisé avec parcimonie entre les sections clés.
 */
export function PatternDivider({ tone = 'gold', height = 18 }: PatternDividerProps) {
  const stroke = tone === 'gold' ? colors.gold : colors.charcoal;
  const points = Array.from({ length: 14 })
    .map((_, i) => `${i * 20},${i % 2 === 0 ? height : 0}`)
    .join(' ');

  return (
    <View style={styles.wrap} pointerEvents="none">
      <Svg width="100%" height={height} viewBox={`0 0 260 ${height}`} preserveAspectRatio="xMidYMid meet">
        <Polyline points={points} fill="none" stroke={stroke} strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 130,
    alignSelf: 'center',
    opacity: 0.85,
    marginVertical: 4,
    overflow: 'hidden',
  },
});
