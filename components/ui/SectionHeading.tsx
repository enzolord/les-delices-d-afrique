import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, spacing, type } from '@/constants/theme';
import { useResponsive } from '@/utils/useResponsive';
import { PatternDivider } from './PatternDivider';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  withDivider?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  tone = 'light',
  withDivider,
}: SectionHeadingProps) {
  const { isTablet } = useResponsive();
  const isDark = tone === 'dark';
  const titleColor = isDark ? colors.textOnDark : colors.textPrimary;
  const subColor = isDark ? colors.textOnDarkMuted : colors.textMuted;

  return (
    <View style={[styles.wrap, { alignItems: align === 'center' ? 'center' : 'flex-start' }]}>
      {eyebrow ? (
        <Text
          style={[
            type.eyebrow,
            styles.eyebrow,
            { color: colors.gold, textAlign: align },
          ]}
        >
          {eyebrow.toUpperCase()}
        </Text>
      ) : null}
      <Text
        style={[
          isTablet ? type.h2 : type.h2Mobile,
          styles.title,
          { color: titleColor, textAlign: align },
        ]}
      >
        {title}
      </Text>
      {withDivider && <PatternDivider />}
      {subtitle ? (
        <Text
          style={[
            type.bodyLg,
            styles.subtitle,
            { color: subColor, textAlign: align, maxWidth: align === 'center' ? 640 : undefined },
          ]}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.lg,
    width: '100%',
  },
  eyebrow: {
    fontFamily: fonts.bodyBold,
    marginBottom: spacing.xs,
  },
  title: {
    fontFamily: fonts.display,
  },
  subtitle: {
    fontFamily: fonts.body,
    marginTop: spacing.sm,
  },
});
