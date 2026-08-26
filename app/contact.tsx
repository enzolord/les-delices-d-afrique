import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fonts, radii, spacing } from '@/constants/theme';
import { useResponsive } from '@/utils/useResponsive';
import { restaurant } from '@/data/restaurant';
import { PageShell } from '@/components/layout/PageShell';
import { PageHead } from '@/components/seo/PageHead';
import { routesSeo } from '@/data/seo';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { PatternDivider } from '@/components/ui/PatternDivider';
import { ContactActions } from '@/components/contact/ContactActions';
import { ContactForm } from '@/components/contact/ContactForm';
import { MapEmbed } from '@/components/contact/MapEmbed';
import { SocialLinks } from '@/components/ui/SocialLinks';

export default function ContactScreen() {
  const { isDesktop } = useResponsive();
  const hasSocialLinks = Object.values<string>(restaurant.social).some((url) => url.trim().length > 0);

  return (
    <PageShell>
      <PageHead seo={routesSeo.contact} />

      <View style={styles.banner}>
        <Container style={styles.bannerInner}>
          <Text style={styles.bannerEyebrow}>CONTACT</Text>
          <Text style={styles.bannerTitle}>On se réjouit de vous accueillir</Text>
          <PatternDivider />
          <Text style={styles.bannerSubtitle}>
            {restaurant.district}, {restaurant.city} · {restaurant.hours.range}, {restaurant.hours.days}
          </Text>
        </Container>
      </View>

      <Section tone="cream">
        <ContactActions />
        {hasSocialLinks && (
          <View style={styles.socialSection}>
            <Text style={styles.socialLabel}>Suivez-nous</Text>
            <SocialLinks tone="light" size={19} />
          </View>
        )}
      </Section>

      <Section tone="white">
        <View style={[styles.row, isDesktop && styles.rowDesktop]}>
          <View style={[styles.col, isDesktop && { flex: 1 }]}>
            <Text style={styles.blockTitle}>Écrivez-nous</Text>
            <ContactForm />
          </View>
          <View style={[styles.col, isDesktop && { flex: 1 }]}>
            <Text style={styles.blockTitle}>Nous trouver</Text>
            <MapEmbed />
            <View style={styles.hoursBox}>
              <View style={styles.hoursRow}>
                <Feather name="clock" size={16} color={colors.gold} />
                <Text style={styles.hoursText}>
                  {restaurant.hours.days} · {restaurant.hours.range}
                </Text>
              </View>
              <View style={styles.hoursRow}>
                <Feather name="map-pin" size={16} color={colors.gold} />
                <Text style={styles.hoursText}>{restaurant.addressLine}</Text>
              </View>
            </View>
          </View>
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
    fontSize: 28,
    color: colors.textOnDark,
    textAlign: 'center',
  },
  bannerSubtitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13.5,
    color: colors.textOnDarkMuted,
    marginTop: 6,
  },
  row: { gap: spacing.lg },
  rowDesktop: { flexDirection: 'row' },
  col: {},
  socialSection: {
    marginTop: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
  },
  socialLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 12.5,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.textMuted,
  },
  blockTitle: {
    fontFamily: fonts.display,
    fontSize: 20,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  hoursBox: {
    marginTop: spacing.sm,
    backgroundColor: colors.ivory,
    borderRadius: radii.md,
    padding: spacing.sm + 2,
    gap: 6,
  },
  hoursRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  hoursText: { fontFamily: fonts.bodyMedium, fontSize: 13.5, color: colors.textPrimary },
});