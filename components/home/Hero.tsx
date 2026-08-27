import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fonts, spacing, type } from '@/constants/theme';
import { useResponsive } from '@/utils/useResponsive';
import { restaurant } from '@/data/restaurant';
import { buildWhatsAppLink, whatsappOrderMessage } from '@/utils/contact';
import { restaurantImageUri } from '@/utils/images';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { PatternDivider } from '@/components/ui/PatternDivider';
import { router } from 'expo-router';

const TRUST_ITEMS: { icon: keyof typeof Feather.glyphMap; label: string }[] = [
  { icon: 'clock', label: '7j/7 · 8h – 00h' },
  { icon: 'map-pin', label: `${restaurant.district}, ${restaurant.city}` },
  { icon: 'truck', label: 'Livraison disponible' },
  { icon: 'wifi', label: 'Wifi gratuit' },
];

export function Hero() {
  const { isDesktop, isTablet } = useResponsive();
  const [bgFailed, setBgFailed] = useState(false);

  return (
    <View style={styles.wrap}>
      {/* Photo en arrière-plan plein cadre. Si le fichier n'existe pas encore
          (voir public/images/restaurant/hero.webp), on retombe simplement sur
          le fond charcoal uni — jamais d'image cassée. */}
      {!bgFailed && (
        <Image
          source={{ uri: restaurantImageUri('hero') }}
          style={StyleSheet.absoluteFill as any}
          resizeMode="cover"
          onError={() => setBgFailed(true)}
          accessibilityLabel="Photo signature du restaurant"
        />
      )}
      {/* Voile sombre pour garantir la lisibilité du texte quelle que soit la photo */}
      <View style={styles.overlay} pointerEvents="none" />

      <Container style={[styles.inner, isDesktop && styles.innerDesktop]}>
        <View style={[styles.copy, isDesktop && { maxWidth: 620 }]}>
          <View style={styles.eyebrowRow}>
            <View style={styles.eyebrowDot} />
            <Text style={styles.eyebrow}>{restaurant.positioning.toUpperCase()}</Text>
          </View>

          <Text style={[isTablet ? type.h1 : type.h1Mobile, styles.title]}>
            {restaurant.tagline}
          </Text>

          <PatternDivider tone="gold" />

          <Text style={styles.subtitle}>{restaurant.intro}</Text>

          <View style={[styles.ctaRow, !isTablet && styles.ctaRowMobile]}>
            <Button
              label="Découvrir notre menu"
              variant="primary"
              size="lg"
              icon="arrow-right"
              onPress={() => router.push('/menu')}
              fullWidth={!isTablet}
            />
            <Button
              label="Nous contacter"
              variant="secondaryBeige"
              size="lg"
              icon="phone-call"
              style={styles.secondaryBtn}
              onPress={() => {
                if (typeof window !== 'undefined') {
                  window.open(buildWhatsAppLink(whatsappOrderMessage()), '_blank');
                }
              }}
              fullWidth={!isTablet}
            />
          </View>

          <View style={[styles.trustRow, !isTablet && styles.trustRowMobile]}>
            {TRUST_ITEMS.map((item) => (
              <View key={item.label} style={styles.trustItem}>
                <Feather name={item.icon} size={14} color={colors.gold} />
                <Text style={styles.trustLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.charcoal,
    overflow: 'hidden',
    position: 'relative',
    minHeight: 560,
    justifyContent: 'center',
  },
  overlay: {
    ...(StyleSheet.absoluteFill as object),
    backgroundColor: 'rgba(20, 16, 11, 0.72)',
  },
  inner: {
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  innerDesktop: {
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xxxl,
  },
  copy: { maxWidth: 640 },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.sm },
  eyebrowDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.gold },
  eyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    letterSpacing: 2.4,
    color: colors.gold,
  },
  title: {
    fontFamily: fonts.display,
    color: colors.textOnDark,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 17,
    lineHeight: 27,
    color: colors.textOnDarkMuted,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    maxWidth: 480,
  },
  ctaRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  ctaRowMobile: { flexDirection: 'column' },
  secondaryBtn: { borderColor: colors.goldLight },
  trustRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  trustRowMobile: { gap: spacing.sm },
  trustItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  trustLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12.5,
    color: colors.textOnDarkMuted,
  },
});