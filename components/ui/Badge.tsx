import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, radii } from '@/constants/theme';

interface BadgeProps {
  label: string;
  tone?: 'gold' | 'terracotta' | 'dark';
}

const TONES = {
  gold: { bg: colors.goldLight, text: colors.charcoal },
  terracotta: { bg: colors.terracotta, text: colors.white },
  dark: { bg: colors.charcoal, text: colors.textOnDark },
};

export function Badge({ label, tone = 'gold' }: BadgeProps) {
  const t = TONES[tone];
  return (
    <View style={[styles.wrap, { backgroundColor: t.bg }]}>
      <Text style={[styles.text, { color: t.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
});
