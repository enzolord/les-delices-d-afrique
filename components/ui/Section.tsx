import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, spacing } from '@/constants/theme';
import { Container } from './Container';
import { useResponsive } from '@/utils/useResponsive';

type Tone = 'cream' | 'white' | 'dark' | 'ivory';

interface SectionProps {
  children: React.ReactNode;
  tone?: Tone;
  style?: StyleProp<ViewStyle>;
  noPadding?: boolean;
  id?: string;
}

const TONE_BG: Record<Tone, string> = {
  cream: colors.cream,
  white: colors.white,
  dark: colors.charcoal,
  ivory: colors.ivory,
};

export function Section({ children, tone = 'white', style, noPadding }: SectionProps) {
  const { isTablet } = useResponsive();
  return (
    <View style={[{ backgroundColor: TONE_BG[tone] }, style]}>
      <Container
        style={
          noPadding
            ? undefined
            : {
                paddingTop: isTablet ? spacing.xxl : spacing.xl,
                paddingBottom: isTablet ? spacing.xxl : spacing.xl,
              }
        }
      >
        {children}
      </Container>
    </View>
  );
}

export const sectionToneColors = TONE_BG;
