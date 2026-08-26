import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { galleryItems } from '@/data/gallery';
import { PageShell } from '@/components/layout/PageShell';
import { PageHead } from '@/components/seo/PageHead';
import { routesSeo } from '@/data/seo';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { PatternDivider } from '@/components/ui/PatternDivider';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';

export default function GalerieScreen() {
  return (
    <PageShell>
      <PageHead seo={routesSeo.gallery} />

      <View style={styles.banner}>
        <Container style={styles.bannerInner}>
          <Text style={styles.bannerEyebrow}>GALERIE</Text>
          <Text style={styles.bannerTitle}>L'ambiance Les Délices d'Afrique en images</Text>
          <PatternDivider />
        </Container>
      </View>

      <Section tone="white">
        <GalleryGrid items={galleryItems} showFilters />
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
    maxWidth: 480,
  },
});
