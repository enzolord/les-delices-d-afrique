import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, fonts, spacing } from '@/constants/theme';
import { useResponsive } from '@/utils/useResponsive';
import { restaurant } from '@/data/restaurant';
import { buildMapsLink, buildTelLink, buildWhatsAppLink, whatsappOrderMessage } from '@/utils/contact';
import { Container } from '@/components/ui/Container';
import { PatternDivider } from '@/components/ui/PatternDivider';
import { SocialLinks } from '@/components/ui/SocialLinks';

function openUrl(url: string) {
  if (typeof window !== 'undefined') window.open(url, '_blank');
}

export function Footer() {
  const { isTablet } = useResponsive();
  const year = new Date().getFullYear();

  return (
    <View style={styles.wrap}>
      <Container style={{ paddingTop: spacing.xl, paddingBottom: spacing.lg }}>
        <View style={[styles.grid, isTablet && styles.gridDesktop]}>
          <View style={[styles.col, isTablet && { flex: 1.3 }]}>
            <Text style={styles.brand}>{restaurant.name}</Text>
            <Text style={styles.tagline}>{restaurant.tagline}</Text>
            <PatternDivider tone="gold" />
            <Text style={styles.small}>
              Cuisine camerounaise haut standing à prix abordable, au cœur d'{restaurant.district}, {restaurant.city}.
            </Text>
          </View>

          <View style={styles.col}>
            <Text style={styles.colTitle}>Navigation</Text>
            {[
              { href: '/le-restaurant' as const, label: 'Le restaurant' },
              { href: '/menu' as const, label: 'Notre menu' },
              { href: '/services' as const, label: 'Nos services' },
              { href: '/galerie' as const, label: 'Galerie' },
              { href: '/contact' as const, label: 'Contact' },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={styles.link}>
                <Text style={styles.linkText}>{l.label}</Text>
              </Link>
            ))}
          </View>

          <View style={styles.col}>
            <Text style={styles.colTitle}>Horaires</Text>
            <Text style={styles.small}>{restaurant.hours.days}</Text>
            <Text style={[styles.small, styles.emph]}>{restaurant.hours.range}</Text>
            <Text style={styles.small}>{restaurant.hours.note}</Text>

            <Text style={[styles.colTitle, { marginTop: spacing.md }]}>Nous trouver</Text>
            <Text style={styles.small}>{restaurant.addressLine}</Text>
          </View>

          <View style={styles.col}>
            <Text style={styles.colTitle}>Contact rapide</Text>
            <Pressable style={styles.contactRow} onPress={() => openUrl(buildTelLink())}>
              <Feather name="phone-call" size={15} color={colors.gold} />
              <Text style={styles.linkText}>{restaurant.phoneDisplay}</Text>
            </Pressable>
            <Pressable
              style={styles.contactRow}
              onPress={() => openUrl(buildWhatsAppLink(whatsappOrderMessage()))}
            >
              <Feather name="message-circle" size={15} color={colors.gold} />
              <Text style={styles.linkText}>WhatsApp</Text>
            </Pressable>
            <Pressable style={styles.contactRow} onPress={() => openUrl(buildMapsLink())}>
              <Feather name="map-pin" size={15} color={colors.gold} />
              <Text style={styles.linkText}>Itinéraire Google Maps</Text>
            </Pressable>
            <View style={styles.socialWrap}>
              <SocialLinks tone="dark" size={16} />
            </View>
          </View>
        </View>

        <View style={styles.bottomBar}>
          <Text style={styles.copy}>
            © {year} {restaurant.name} — Tous droits réservés.
          </Text>
          <View style={styles.legalLinks}>
            <Link href="/mentions-legales" style={styles.link}>
              <Text style={styles.legalText}>Mentions légales</Text>
            </Link>
            <Text style={styles.legalDot}>·</Text>
            <Link href="/politique-confidentialite" style={styles.link}>
              <Text style={styles.legalText}>Politique de confidentialité</Text>
            </Link>
          </View>
        </View>
        <Text style={styles.credit}>Réalisé par KN WEB & TECHNOLOGY</Text>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: colors.charcoal },
  grid: { gap: spacing.lg },
  gridDesktop: { flexDirection: 'row', justifyContent: 'space-between' },
  col: { gap: 8, minWidth: 150, marginBottom: spacing.md },
  brand: { fontFamily: fonts.display, fontSize: 20, color: colors.textOnDark },
  tagline: { fontFamily: fonts.displayItalic, fontSize: 13.5, color: colors.goldLight, marginTop: 2 },
  colTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 12.5,
    color: colors.gold,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  small: { fontFamily: fonts.body, fontSize: 13.5, color: colors.textOnDarkMuted, lineHeight: 20 },
  emph: { fontFamily: fonts.bodyBold, color: colors.textOnDark },
  link: { textDecorationLine: 'none' },
  linkText: { fontFamily: fonts.bodyMedium, fontSize: 13.5, color: colors.textOnDarkMuted },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 3 },
  socialWrap: { marginTop: 8 },
  bottomBar: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderDark,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  copy: { fontFamily: fonts.body, fontSize: 12, color: colors.textOnDarkMuted },
  legalLinks: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legalText: { fontFamily: fonts.body, fontSize: 12, color: colors.textOnDarkMuted },
  legalDot: { color: colors.textOnDarkMuted },
  credit: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.borderDark,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});