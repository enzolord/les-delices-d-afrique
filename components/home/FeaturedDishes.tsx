import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { spacing } from '@/constants/theme';
import { featuredDishes } from '@/data/menu';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MenuItemCard } from '@/components/menu/MenuItemCard';
import { Button } from '@/components/ui/Button';

export function FeaturedDishes() {
  return (
    <Section tone="ivory">
      <SectionHeading
        eyebrow="Nos plats phares"
        title="Ce qu'on vous recommande d'essayer"
        subtitle="Une sélection de plats qui font la réputation de la maison."
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollRow}
      >
        {featuredDishes.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </ScrollView>
      <View style={styles.ctaWrap}>
        <Button
          label="Voir tout le menu"
          variant="dark"
          icon="arrow-right"
          onPress={() => router.push('/menu')}
        />
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  scrollRow: { gap: spacing.md, paddingBottom: 4, paddingRight: spacing.md },
  ctaWrap: { marginTop: spacing.lg, alignItems: 'center' },
});
