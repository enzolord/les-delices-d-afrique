import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fonts, radii, shadow, spacing } from '@/constants/theme';
import { useResponsive } from '@/utils/useResponsive';
import { restaurant } from '@/data/restaurant';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

const ICONS: Record<string, keyof typeof Feather.glyphMap> = {
  sofa: 'home',
  'chef-hat': 'award',
  'heart-handshake': 'smile',
};

export function WhyChooseUs() {
  const { isTablet } = useResponsive();

  return (
    <Section tone="cream">
      <SectionHeading
        eyebrow="Pourquoi nous choisir"
        title="Trois raisons de venir chez nous"
        subtitle="Ce qui distingue Les Délices d'Afrique, au quotidien."
      />
      <View style={[styles.grid, isTablet && styles.gridDesktop]}>
        {restaurant.whyChooseUs.map((item) => (
          <View key={item.id} style={[styles.card, isTablet && styles.cardDesktop]}>
            <View style={styles.iconWrap}>
              <Feather name={ICONS[item.icon] ?? 'star'} size={22} color={colors.gold} />
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </View>
        ))}
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  grid: { gap: spacing.md },
  gridDesktop: { flexDirection: 'row' },
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  cardDesktop: { flex: 1 },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.ivory,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontFamily: fonts.display,
    fontSize: 19,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  cardDesc: {
    fontFamily: fonts.body,
    fontSize: 14.5,
    lineHeight: 22,
    color: colors.textMuted,
  },
});
