import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { radii } from '@/constants/theme';
import { buildMapsEmbedSrc } from '@/utils/contact';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';

export function MapEmbed() {
  return (
    <View style={styles.wrap}>
      {Platform.OS === 'web' ? (
        // @ts-ignore élément DOM natif sur web uniquement
        <iframe
          src={buildMapsEmbedSrc()}
          style={{ width: '100%', height: '100%', border: 0 }}
          loading="lazy"
          title="Localisation Les Délices d'Afrique sur Google Maps"
        />
      ) : (
        <PlaceholderImage label="Carte Google Maps" icon="map" ratio={1.6} rounded={false} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 340,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
});
