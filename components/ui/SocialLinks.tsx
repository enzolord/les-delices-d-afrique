import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Svg, Path } from '@/components/ui/svg';
import { colors, radii } from '@/constants/theme';
import { restaurant } from '@/data/restaurant';

type Tone = 'light' | 'dark';

interface SocialLinksProps {
  /** 'dark' : icônes claires sur fond sombre (footer). 'light' : icônes sombres sur fond clair (page contact). */
  tone?: Tone;
  size?: number;
}

/*
 * Icônes TikTok / Google en SVG inline : évite d'embarquer les packs
 * FontAwesome5 + MaterialCommunityIcons (≈ 1,5 Mo de polices + glyphmaps)
 * pour seulement deux pictogrammes.
 */
function TikTokIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"
      />
    </Svg>
  );
}

function GoogleIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"
      />
    </Svg>
  );
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
      render: (color: string) => <TikTokIcon size={size - 2} color={color} />,
    },
    {
      key: 'googleBusiness',
      url: googleBusiness,
      render: (color: string) => <GoogleIcon size={size} color={color} />,
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