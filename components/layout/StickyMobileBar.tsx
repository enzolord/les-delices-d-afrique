import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fonts, spacing } from '@/constants/theme';
import { useResponsive } from '@/utils/useResponsive';
import { useCart } from '@/context/CartContext';
import {
  buildMapsDirectionsLink,
  buildTelLink,
  buildWhatsAppLink,
  whatsappOrderMessage,
} from '@/utils/contact';

function openUrl(url: string) {
  if (typeof window !== 'undefined') {
    if (url.startsWith('tel:')) {
      window.location.href = url;
    } else {
      window.open(url, '_blank');
    }
  }
}

const ACTIONS = [
  { key: 'call', label: 'Appeler', icon: 'phone-call' as const, build: () => buildTelLink() },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    icon: 'message-circle' as const,
    build: () => buildWhatsAppLink(whatsappOrderMessage()),
  },
  {
    key: 'directions',
    label: 'Itinéraire',
    icon: 'navigation' as const,
    build: () => buildMapsDirectionsLink(),
  },
];

/** Barre d'actions mobile persistante (CdC §20). Masquée en desktop, et
 * masquée aussi pendant que le panier est ouvert : sur mobile, cette barre
 * fixe se superposait au pied du panier (bouton "Envoyer la commande"),
 * le rendant invisible. */
export function StickyMobileBar() {
  const { isTablet } = useResponsive();
  const { isOpen } = useCart();
  if (isTablet || isOpen) return null;

  return (
    <View style={styles.wrap}>
      {ACTIONS.map((action, i) => (
        <Pressable
          key={action.key}
          onPress={() => openUrl(action.build())}
          style={({ pressed }) => [
            styles.item,
            i === 1 && styles.itemCenter,
            pressed && { opacity: 0.75 },
          ]}
          accessibilityRole="button"
          accessibilityLabel={action.label}
        >
          <Feather
            name={action.icon}
            size={i === 1 ? 20 : 18}
            color={i === 1 ? colors.charcoal : colors.gold}
          />
          <Text style={[styles.label, i === 1 && styles.labelCenter]}>{action.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    // @ts-ignore fixed positioning on web
    position: Platform.OS === 'web' ? ('fixed' as any) : 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: colors.charcoal,
    borderTopWidth: 1,
    borderTopColor: colors.borderDark,
    paddingBottom: Platform.OS === 'web' ? spacing.xs : spacing.md,
    paddingTop: spacing.xs,
    zIndex: 60,
    // @ts-ignore
    boxShadow: '0 -6px 24px rgba(0,0,0,0.25)',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    gap: 3,
  },
  itemCenter: {
    backgroundColor: colors.gold,
    marginHorizontal: 6,
    borderRadius: 14,
    paddingVertical: 8,
  },
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 11,
    color: colors.textOnDarkMuted,
  },
  labelCenter: {
    color: colors.charcoal,
  },
});
