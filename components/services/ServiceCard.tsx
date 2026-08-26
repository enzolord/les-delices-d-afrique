import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, fonts, radii, shadow, spacing } from '@/constants/theme';
import { Service } from '@/data/services';
import { serviceImageUri } from '@/utils/images';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { Button } from '@/components/ui/Button';

const ICONS: Record<Service['icon'], keyof typeof Feather.glyphMap> = {
  utensils: 'coffee',
  bike: 'truck',
  gem: 'star',
  'party-popper': 'gift',
  church: 'heart',
};

interface ServiceCardProps {
  service: Service;
  expanded?: boolean;
}

export function ServiceCard({ service, expanded }: ServiceCardProps) {
  return (
    <View style={styles.card}>
      <PlaceholderImage
        label={`Photo — ${service.title}`}
        icon="image"
        ratio={1.6}
        uri={serviceImageUri(service.id)}
      />
      <View style={styles.body}>
        <View style={styles.iconWrap}>
          <Feather name={ICONS[service.icon]} size={18} color={colors.gold} />
        </View>
        <Text style={styles.title}>{service.title}</Text>
        <Text style={styles.desc}>{expanded ? service.description : service.shortDescription}</Text>
        <View style={{ marginTop: spacing.sm }}>
          <Button
            label={service.ctaLabel}
            variant="whatsapp"
            icon="arrow-right"
            onPress={() => router.push(`/services/${service.id}`)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    flex: 1,
    minWidth: 260,
    ...shadow.card,
  },
  body: { padding: spacing.md, gap: 4 },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: radii.sm,
    backgroundColor: colors.ivory,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 18,
    color: colors.textPrimary,
  },
  desc: {
    fontFamily: fonts.body,
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.textMuted,
    marginBottom: 4,
  },
});
