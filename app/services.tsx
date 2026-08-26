import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { useResponsive } from '@/utils/useResponsive';
import { services } from '@/data/services';
import { PageShell } from '@/components/layout/PageShell';
import { PageHead } from '@/components/seo/PageHead';
import { routesSeo } from '@/data/seo';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { PatternDivider } from '@/components/ui/PatternDivider';
import { ServiceCard } from '@/components/services/ServiceCard';

export default function ServicesScreen() {
  const { isDesktop } = useResponsive();

  return (
    <PageShell>
      <PageHead seo={routesSeo.services} />

      <View style={styles.banner}>
        <Container style={styles.bannerInner}>
          <Text style={styles.bannerEyebrow}>NOS SERVICES</Text>
          <Text style={styles.bannerTitle}>
            Sur place, livré chez vous, ou pour vos grands événements
          </Text>
          <PatternDivider />
          <Text style={styles.bannerSubtitle}>
            Livraison à Douala, repas sur place à Akwa, et service traiteur pour mariages,
            anniversaires et baptêmes.
          </Text>
        </Container>
      </View>

      <Section tone="cream">
        <View style={[styles.grid, isDesktop && styles.gridDesktop]}>
          {services.map((s) => (
            <View key={s.id} style={isDesktop ? styles.cardWrapDesktop : styles.cardWrapMobile}>
              <ServiceCard service={s} expanded />
            </View>
          ))}
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
    maxWidth: 560,
  },
  bannerSubtitle: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textOnDarkMuted,
    marginTop: 6,
    textAlign: 'center',
    maxWidth: 480,
  },
  grid: { gap: spacing.md },
  gridDesktop: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -spacing.xs },
  cardWrapDesktop: { width: '33.33%', paddingHorizontal: spacing.xs, marginBottom: spacing.md },
  cardWrapMobile: { width: '100%' },
});
