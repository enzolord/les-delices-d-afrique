import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { colors, fonts, spacing } from '@/constants/theme';
import { useResponsive } from '@/utils/useResponsive';
import { restaurant } from '@/data/restaurant';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { restaurantImageUri } from '@/utils/images';

export function AboutPreview() {
  const { isDesktop } = useResponsive();

  return (
    <Section tone="white">
      <View style={[styles.row, isDesktop && styles.rowDesktop]}>
        <View style={[styles.visual, isDesktop && { flex: 1 }]}>
          <PlaceholderImage label="Intérieur du restaurant" icon="home" ratio={isDesktop ? 1.1 : 1.4} uri={restaurantImageUri('interieur')} />
        </View>
        <View style={[styles.copy, isDesktop && { flex: 1, paddingLeft: spacing.xl }]}>
          <Text style={styles.eyebrow}>LE RESTAURANT</Text>
          <Text style={styles.title}>{restaurant.about.title}</Text>
          <Text style={styles.paragraph}>{restaurant.about.paragraphs[0]}</Text>
          <View style={styles.valuesRow}>
            {restaurant.about.values.map((v) => (
              <View key={v} style={styles.valueChip}>
                <Text style={styles.valueText}>{v}</Text>
              </View>
            ))}
          </View>
          <View style={{ marginTop: spacing.md, alignSelf: isDesktop ? 'flex-start' : 'stretch' }}>
            <Button
              label="Découvrir le restaurant"
              variant="secondary"
              icon="arrow-right"
              onPress={() => router.push('/le-restaurant')}
              fullWidth={!isDesktop}
            />
          </View>
        </View>
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  row: { gap: spacing.lg },
  rowDesktop: { flexDirection: 'row', alignItems: 'center' },
  visual: {},
  copy: {},
  eyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    letterSpacing: 2.2,
    color: colors.gold,
    marginBottom: spacing.xs,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 28,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  paragraph: {
    fontFamily: fonts.body,
    fontSize: 15.5,
    lineHeight: 25,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  valuesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  valueChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  valueText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12.5,
    color: colors.textPrimary,
  },
});
