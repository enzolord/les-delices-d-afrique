import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fonts, radii, shadow, spacing } from '@/constants/theme';
import { useResponsive } from '@/utils/useResponsive';
import { restaurant } from '@/data/restaurant';
import {
  buildMapsDirectionsLink,
  buildTelLink,
  buildWhatsAppLink,
  whatsappOrderMessage,
} from '@/utils/contact';

interface ActionDef {
  key: string;
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle: string;
  tone: 'gold' | 'whatsapp' | 'dark' | 'outline';
  onPress: () => void;
}

function openUrl(url: string, isTel?: boolean) {
  if (typeof window === 'undefined') return;
  if (isTel) window.location.href = url;
  else window.open(url, '_blank');
}

export function ContactActions() {
  const { isTablet } = useResponsive();

  const actions: ActionDef[] = [
    {
      key: 'call',
      icon: 'phone-call',
      title: 'Appeler',
      subtitle: restaurant.phoneDisplay,
      tone: 'gold',
      onPress: () => openUrl(buildTelLink(), true),
    },
    {
      key: 'whatsapp',
      icon: 'message-circle',
      title: 'WhatsApp',
      subtitle: 'Réponse rapide',
      tone: 'whatsapp',
      onPress: () => openUrl(buildWhatsAppLink(whatsappOrderMessage())),
    },
    {
      key: 'directions',
      icon: 'navigation',
      title: 'Itinéraire',
      subtitle: `${restaurant.district}, ${restaurant.city}`,
      tone: 'dark',
      onPress: () => openUrl(buildMapsDirectionsLink()),
    },
    {
      key: 'email',
      icon: 'mail',
      title: 'Email',
      subtitle: restaurant.email,
      tone: 'outline',
      onPress: () => openUrl(`mailto:${restaurant.email}`, true),
    },
  ];

  return (
    <View style={[styles.grid, isTablet && styles.gridDesktop]}>
      {actions.map((a) => (
        <Pressable
          key={a.key}
          onPress={a.onPress}
          style={({ pressed }) => [
            styles.card,
            TONE_STYLES[a.tone].card,
            isTablet && { flex: 1 },
            pressed && { opacity: 0.85 },
          ]}
        >
          <View style={[styles.iconWrap, TONE_STYLES[a.tone].iconWrap]}>
            <Feather name={a.icon} size={20} color={TONE_STYLES[a.tone].iconColor} />
          </View>
          <Text style={[styles.title, TONE_STYLES[a.tone].title]}>{a.title}</Text>
          <Text style={[styles.subtitle, TONE_STYLES[a.tone].subtitle]} numberOfLines={1}>
            {a.subtitle}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const TONE_STYLES: Record<
  ActionDef['tone'],
  { card: any; iconWrap: any; iconColor: string; title: any; subtitle: any }
> = {
  gold: {
    card: { backgroundColor: colors.gold },
    iconWrap: { backgroundColor: 'rgba(24,20,16,0.14)' },
    iconColor: colors.charcoal,
    title: { color: colors.charcoal },
    subtitle: { color: 'rgba(24,20,16,0.7)' },
  },
  whatsapp: {
    card: { backgroundColor: colors.success },
    iconWrap: { backgroundColor: 'rgba(255,255,255,0.2)' },
    iconColor: colors.white,
    title: { color: colors.white },
    subtitle: { color: 'rgba(255,255,255,0.85)' },
  },
  dark: {
    card: { backgroundColor: colors.charcoal },
    iconWrap: { backgroundColor: 'rgba(255,255,255,0.1)' },
    iconColor: colors.gold,
    title: { color: colors.textOnDark },
    subtitle: { color: colors.textOnDarkMuted },
  },
  outline: {
    card: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border },
    iconWrap: { backgroundColor: colors.ivory },
    iconColor: colors.goldDeep,
    title: { color: colors.textPrimary },
    subtitle: { color: colors.textMuted },
  },
};

const styles = StyleSheet.create({
  grid: { gap: spacing.sm },
  gridDesktop: { flexDirection: 'row' },
  card: {
    borderRadius: radii.lg,
    padding: spacing.md,
    minWidth: 150,
    ...shadow.card,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  title: { fontFamily: fonts.display, fontSize: 17 },
  subtitle: { fontFamily: fonts.bodyMedium, fontSize: 12.5, marginTop: 2 },
});
