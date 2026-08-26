import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, radii, spacing } from '@/constants/theme';
import { useResponsive } from '@/utils/useResponsive';
import { restaurant } from '@/data/restaurant';
import { PageShell } from '@/components/layout/PageShell';
import { PageHead } from '@/components/seo/PageHead';
import { routesSeo } from '@/data/seo';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { PatternDivider } from '@/components/ui/PatternDivider';
import { restaurantImageUri } from '@/utils/images';
import { Feather } from '@expo/vector-icons';

const ICONS: Record<string, keyof typeof Feather.glyphMap> = {
  sofa: 'home',
  'chef-hat': 'award',
  'heart-handshake': 'smile',
};

export default function RestaurantScreen() {
  const { isDesktop } = useResponsive();

  return (
    <PageShell>
      <PageHead seo={routesSeo.restaurant} />

      {/* Bandeau d'introduction */}
      <View style={styles.banner}>
        <Container style={styles.bannerInner}>
          <Text style={styles.bannerEyebrow}>LE RESTAURANT</Text>
          <Text style={styles.bannerTitle}>{restaurant.about.title}</Text>
          <PatternDivider />
        </Container>
      </View>

      <Section tone="white">
        <View style={[styles.storyRow, isDesktop && styles.storyRowDesktop]}>
          <View style={[styles.storyCopy, isDesktop && { flex: 1.1, paddingRight: spacing.xl }]}>
            {restaurant.about.paragraphs.map((p, i) => (
              <Text key={i} style={styles.paragraph}>
                {p}
              </Text>
            ))}
            <View style={styles.valuesRow}>
              {restaurant.about.values.map((v) => (
                <View key={v} style={styles.valueChip}>
                  <Text style={styles.valueText}>{v}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={[styles.storyVisual, isDesktop && { flex: 1 }]}>
            <PlaceholderImage label="Le chef en cuisine" icon="award" ratio={isDesktop ? 0.9 : 1.3} uri={restaurantImageUri('chef')} />
          </View>
        </View>
      </Section>

      <Section tone="cream">
        <SectionHeading
          eyebrow="Notre engagement"
          title="Ce qui guide chaque service"
          subtitle="Trois piliers qui définissent l'expérience Les Délices d'Afrique."
        />
        <View style={[styles.grid, isDesktop && styles.gridDesktop]}>
          {restaurant.whyChooseUs.map((item) => (
            <View key={item.id} style={[styles.card, isDesktop && { flex: 1 }]}>
              <View style={styles.iconWrap}>
                <Feather name={ICONS[item.icon] ?? 'star'} size={22} color={colors.gold} />
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
            </View>
          ))}
        </View>
      </Section>

      <Section tone="white">
        <View style={[styles.galleryTeaser, isDesktop && styles.galleryTeaserDesktop]}>
          <PlaceholderImage label="Salle du restaurant" icon="home" ratio={isDesktop ? 1.4 : 1.3} style={isDesktop ? { flex: 1 } : undefined} uri={restaurantImageUri('salle')} />
          <PlaceholderImage label="Ambiance & convivialité" icon="users" ratio={isDesktop ? 1.4 : 1.3} style={isDesktop ? { flex: 1 } : undefined} uri={restaurantImageUri('ambiance')} />
        </View>
      </Section>
    </PageShell>
  );
}

const styles = StyleSheet.create({
  banner: { backgroundColor: colors.charcoal, paddingVertical: spacing.xl },
  bannerInner: { alignItems: 'center' },
  bannerEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    letterSpacing: 2.2,
    color: colors.gold,
    marginBottom: 8,
  },
  bannerTitle: {
    fontFamily: fonts.display,
    fontSize: 30,
    color: colors.textOnDark,
    textAlign: 'center',
  },
  storyRow: { gap: spacing.lg },
  storyRowDesktop: { flexDirection: 'row', alignItems: 'center' },
  storyCopy: {},
  paragraph: {
    fontFamily: fonts.body,
    fontSize: 15.5,
    lineHeight: 26,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  valuesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: spacing.sm },
  valueChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  valueText: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.textPrimary },
  storyVisual: { marginTop: spacing.md },
  grid: { gap: spacing.md },
  gridDesktop: { flexDirection: 'row' },
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.ivory,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  cardTitle: { fontFamily: fonts.display, fontSize: 19, color: colors.textPrimary, marginBottom: 6 },
  cardDesc: { fontFamily: fonts.body, fontSize: 14.5, lineHeight: 22, color: colors.textMuted },
  galleryTeaser: { gap: spacing.md },
  galleryTeaserDesktop: { flexDirection: 'row' },
});
