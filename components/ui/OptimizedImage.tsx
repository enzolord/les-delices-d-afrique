import React from 'react';
import { Image, Platform, StyleSheet } from 'react-native';
import { imageManifest } from '@/utils/imageManifest';

interface OptimizedImageProps {
  uri: string;
  alt?: string;
  /** true = image visible dès l'ouverture (ex. Hero) : chargée en priorité, sans lazy-loading. */
  priority?: boolean;
  onError?: () => void;
}

/** true si la photo existe réellement dans public/images (manifeste généré au build). */
export function imageExists(uri?: string): uri is string {
  return Boolean(uri && imageManifest[uri]);
}

/**
 * Photo plein cadre (remplit son parent en `cover`).
 * -------------------------------------------------------------------------
 * WEB : vraie balise <img> présente dans le HTML statique, avec
 *   - loading="lazy" : seules les photos visibles à l'écran sont téléchargées
 *     (la page Menu en demandait ~40 d'un coup) ;
 *   - decoding="async" : le décodage ne bloque pas l'affichage ;
 *   - width/height : pas de saut de mise en page (CLS) ;
 *   - fetchpriority="high" pour la photo principale (LCP).
 *   Le composant `Image` de react-native-web, lui, n'affiche rien tant que
 *   tout le JavaScript n'est pas chargé — d'où la lenteur perçue.
 * NATIF : composant Image de React Native, inchangé.
 */
export function OptimizedImage({ uri, alt, priority, onError }: OptimizedImageProps) {
  if (Platform.OS === 'web') {
    const size = imageManifest[uri];
    return React.createElement('img', {
      src: uri,
      alt: alt ?? '',
      width: size?.[0],
      height: size?.[1],
      loading: priority ? 'eager' : 'lazy',
      decoding: priority ? 'sync' : 'async',
      fetchPriority: priority ? 'high' : 'auto',
      onError,
      style: webStyle,
    });
  }

  return (
    <Image
      source={{ uri }}
      style={StyleSheet.absoluteFill as any}
      resizeMode="cover"
      onError={onError}
      accessibilityLabel={alt}
    />
  );
}

const webStyle = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
} as const;
