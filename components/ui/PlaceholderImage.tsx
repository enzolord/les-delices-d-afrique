import React, { useState } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fonts, radii } from '@/constants/theme';

interface PlaceholderImageProps {
  label?: string;
  icon?: keyof typeof Feather.glyphMap;
  ratio?: number; // width / height
  style?: StyleProp<ViewStyle>;
  rounded?: boolean;
  compact?: boolean;
  /** URL de la vraie photo (ex. via utils/images.ts). Si absente ou introuvable, le bloc placeholder s'affiche à la place. */
  uri?: string;
}

/**
 * Bloc image du site.
 * -------------------------------------------------------------------------
 * Si `uri` est fourni ET que le fichier existe, la vraie photo s'affiche.
 * Sinon (aucune `uri`, ou fichier pas encore déposé dans public/images/...),
 * un bloc visuel temporaire s'affiche à la place — jamais de photo cassée
 * ni de fausse photo générique. Voir utils/images.ts pour la convention de
 * nommage des fichiers attendus.
 */
export function PlaceholderImage({
  label,
  icon = 'image',
  ratio = 4 / 3,
  style,
  rounded = true,
  compact,
  uri,
}: PlaceholderImageProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(uri) && !failed;

  return (
    <View
      style={[
        styles.wrap,
        { aspectRatio: ratio, borderRadius: rounded ? radii.md : 0 },
        style,
      ]}
    >
      {showImage ? (
        <Image
          source={{ uri }}
          style={StyleSheet.absoluteFill as any}
          resizeMode="cover"
          onError={() => setFailed(true)}
          accessibilityLabel={label}
        />
      ) : (
        <View style={styles.inner}>
          <Feather name={icon} size={compact ? 18 : 26} color={colors.goldLight} />
          {label ? (
            <Text style={[styles.label, compact && styles.labelCompact]} numberOfLines={2}>
              {label}
            </Text>
          ) : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    backgroundColor: colors.charcoalSoft,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    gap: 6,
  },
  label: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.textOnDarkMuted,
    textAlign: 'center',
  },
  labelCompact: {
    fontSize: 10.5,
  },
});
