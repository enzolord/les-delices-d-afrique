import React from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { spacing } from '@/constants/theme';
import { useResponsive } from '@/utils/useResponsive';
import { services } from '@/data/services';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/services/ServiceCard';
import { Button } from '@/components/ui/Button';

export function ServicesPreview() {
  const { isTablet } = useResponsive();
  const preview = services.slice(0, 3);

  return (
    <Section tone="cream">
      <SectionHeading
        eyebrow="Nos services"
        title="Sur place, livré chez vous, ou pour vos événements"
        subtitle="Repas sur place, livraison à domicile, et service traiteur pour mariages, anniversaires et baptêmes."
      />
      <View style={[styles.grid, isTablet && styles.gridDesktop]}>
        {preview.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </View>
      <View style={styles.ctaWrap}>
        <Button
          label="Voir tous nos services"
          variant="dark"
          icon="arrow-right"
          onPress={() => router.push('/services')}
        />
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  grid: { gap: spacing.md },
  gridDesktop: { flexDirection: 'row' },
  ctaWrap: { marginTop: spacing.lg, alignItems: 'center' },
});
