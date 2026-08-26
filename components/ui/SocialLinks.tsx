import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radii } from '@/constants/theme';
import { restaurant } from '@/data/restaurant';

type Tone = 'light' | 'dark';

interface SocialLinksProps {
  /** 'dark' : icônes claires sur fond sombre (footer). 'light' : icônes sombres sur fond clair (page contact). */
  tone?: Tone;
  size?: number;
}

function openUrl(url: string) {
  if (typeof window !== 'undefined') window.open(url, '_blank');
}

/**
 * N'affiche que les réseaux dont l'URL a été renseignée dans
 * `data/restaurant.ts → social`. Tant que le client n'a pas fourni ses
 * comptes réels (voir FICHE_TECHNIQUE.md §11), rien ne s'affiche plutôt que
 * des liens cassés ou inventés.
 */
export function SocialLinks({ tone = 'light', size = 18 }: SocialLinksProps) {
  const social: Record<string, string> = restaurant.social;
  const { facebook, instagram, tiktok, googleBusiness } = social;

  const items: { key: string; url: string; render: (color: string) => React.ReactNode }[] = [
    {
      key: 'facebook',
      url: facebook,
      render: (color: string) => <Feather name="facebook" size={size} color={color} />,
    },
    {
      key: 'instagram',
      url: instagram,
      render: (color: string) => <Feather name="instagram" size={size} color={color} />,
    },
    {
      key: 'tiktok',
      url: tiktok,
      render: (color: string) => <FontAwesome5 name="tiktok" size={size - 2} color={color} />,
    },
    {
      key: 'googleBusiness',
      url: googleBusiness,
      render: (color: string) => <MaterialCommunityIcons name="google" size={size} color={color} />,
    },
  ].filter((item) => item.url && item.url.trim().length > 0);

  if (items.length === 0) return null;

  const isDark = tone === 'dark';
  const iconColor = isDark ? colors.gold : colors.charcoal;

  return (
    <View style={styles.row}>
      {items.map((item) => (
        <Pressable
          key={item.key}
          onPress={() => openUrl(item.url)}
          accessibilityRole="link"
          accessibilityLabel={item.key}
          style={({ pressed }) => [
            styles.iconWrap,
            { backgroundColor: isDark ? colors.charcoalSoft : colors.ivory },
            pressed && { opacity: 0.7 },
          ]}
        >
          {item.render(iconColor)}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10 },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});