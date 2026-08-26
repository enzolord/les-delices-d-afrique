import React from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { spacing } from '@/constants/theme';
import { galleryItems } from '@/data/gallery';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { Button } from '@/components/ui/Button';

export function GalleryPreview() {
  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="Galerie"
        title="Un aperçu avant votre visite"
        subtitle="Plats, salle et ambiance : découvrez le cadre avant de vous déplacer."
      />
      <GalleryGrid items={galleryItems} limit={6} />
      <View style={styles.ctaWrap}>
        <Button
          label="Voir toute la galerie"
          variant="secondary"
          icon="arrow-right"
          onPress={() => router.push('/galerie')}
        />
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  ctaWrap: { marginTop: spacing.lg, alignItems: 'center' },
});
