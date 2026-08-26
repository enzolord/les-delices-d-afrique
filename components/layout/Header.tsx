import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, fonts, spacing, radii } from '@/constants/theme';
import { useResponsive } from '@/utils/useResponsive';
import { restaurant } from '@/data/restaurant';
import { buildTelLink } from '@/utils/contact';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { CartButton } from '@/components/cart/CartButton';

const NAV_LINKS: { href: '/' | '/le-restaurant' | '/menu' | '/services' | '/galerie' | '/contact'; label: string }[] = [
  { href: '/', label: 'Accueil' },
  { href: '/le-restaurant', label: 'Le restaurant' },
  { href: '/menu', label: 'Notre menu' },
  { href: '/services', label: 'Nos services' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const { isDesktop } = useResponsive();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.header}>
      <Container style={styles.row}>
        <Link href="/" style={styles.logoLink} accessibilityLabel="Les Délices d'Afrique — Accueil">
          <View style={styles.logoRow}>
            <View style={styles.logoMark}>
              <Text style={styles.logoMarkText}>LDA</Text>
            </View>
            <View>
              <Text style={styles.logoTitle}>{restaurant.name}</Text>
              <Text style={styles.logoSubtitle}>{restaurant.description}</Text>
            </View>
          </View>
        </Link>

        {isDesktop ? (
          <View style={styles.navRow}>
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} style={styles.navLinkWrap}>
                  <Text style={[styles.navLink, active && styles.navLinkActive]}>{link.label}</Text>
                  {active && <View style={styles.navUnderline} />}
                </Link>
              );
            })}
          </View>
        ) : null}

        <View style={styles.actions}>
          <CartButton />
          {isDesktop ? (
            <Button
              label="Appeler"
              variant="dark"
              icon="phone-call"
              onPress={() => {
                if (typeof window !== 'undefined') window.location.href = buildTelLink();
              }}
            />
          ) : (
            <Pressable
              accessibilityLabel="Ouvrir le menu"
              onPress={() => setMenuOpen(true)}
              style={styles.burger}
            >
              <Feather name="menu" size={24} color={colors.charcoal} />
            </Pressable>
          )}
        </View>
      </Container>

      <Modal visible={menuOpen} animationType="fade" transparent onRequestClose={() => setMenuOpen(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.logoTitle}>{restaurant.name}</Text>
              <Pressable onPress={() => setMenuOpen(false)} accessibilityLabel="Fermer le menu" hitSlop={10}>
                <Feather name="x" size={26} color={colors.charcoal} />
              </Pressable>
            </View>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} asChild>
                <Pressable
                  onPress={() => setMenuOpen(false)}
                  style={({ pressed }) => [styles.modalLinkRow, pressed && { opacity: 0.6 }]}
                >
                  <Text style={[styles.modalLink, pathname === link.href && { color: colors.gold }]}>
                    {link.label}
                  </Text>
                  <Feather name="arrow-up-right" size={18} color={colors.textMuted} />
                </Pressable>
              </Link>
            ))}
            <View style={{ marginTop: spacing.lg }}>
              <Button
                label={`Appeler · ${restaurant.phoneDisplay}`}
                variant="primary"
                icon="phone-call"
                fullWidth
                onPress={() => {
                  setMenuOpen(false);
                  if (typeof window !== 'undefined') window.location.href = buildTelLink();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.cream,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    // @ts-ignore web sticky header
    position: 'sticky' as any,
    top: 0,
    zIndex: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  logoLink: { textDecorationLine: 'none' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoMark: {
    width: 40,
    height: 40,
    borderRadius: radii.sm,
    backgroundColor: colors.charcoal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoMarkText: {
    fontFamily: fonts.display,
    color: colors.gold,
    fontSize: 15,
  },
  logoTitle: {
    fontFamily: fonts.display,
    fontSize: 17,
    color: colors.textPrimary,
  },
  logoSubtitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: colors.textMuted,
    letterSpacing: 0.4,
  },
  navRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  navLinkWrap: { alignItems: 'center' },
  navLink: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 14.5,
    color: colors.textPrimary,
  },
  navLinkActive: { color: colors.goldDeep },
  navUnderline: {
    marginTop: 4,
    width: 16,
    height: 2,
    borderRadius: 2,
    backgroundColor: colors.gold,
  },
  actions: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  burger: {
    width: 42,
    height: 42,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ivory,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-start',
  },
  modalSheet: {
    backgroundColor: colors.cream,
    paddingTop: 60,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.xs,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  modalLinkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalLink: {
    fontFamily: fonts.display,
    fontSize: 20,
    color: colors.textPrimary,
  },
});
