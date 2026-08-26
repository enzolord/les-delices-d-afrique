import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fonts, radii, spacing } from '@/constants/theme';
import { useResponsive } from '@/utils/useResponsive';
import { restaurant } from '@/data/restaurant';
import { buildMapsDirectionsLink, buildMapsEmbedSrc } from '@/utils/contact';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';

export function HoursLocation() {
  const { isDesktop } = useResponsive();

  return (
    <Section tone="dark">
      <SectionHeading
        eyebrow="Horaires & localisation"
        title="Ouvert tous les jours, jusqu'à minuit"
        tone="dark"
      />
      <View style={[styles.row, isDesktop && styles.rowDesktop]}>
        <View style={[styles.card, isDesktop && { flex: 1 }]}>
          <View style={styles.hoursHeader}>
            <Feather name="clock" size={20} color={colors.gold} />
            <Text style={styles.hoursTitle}>Horaires d'ouverture</Text>
          </View>
          <View style={styles.hoursRow}>
            <Text style={styles.hoursDay}>{restaurant.hours.days}</Text>
            <Text style={styles.hoursTime}>{restaurant.hours.range}</Text>
          </View>
          <Text style={styles.hoursNote}>{restaurant.hours.note}</Text>

          <View style={styles.divider} />

          <View style={styles.hoursHeader}>
            <Feather name="map-pin" size={20} color={colors.gold} />
            <Text style={styles.hoursTitle}>Adresse</Text>
          </View>
          <Text style={styles.address}>{restaurant.addressLine}</Text>
          <Text style={styles.addressNote}>{restaurant.addressDetail}</Text>

          <View style={{ marginTop: spacing.md }}>
            <Button
              label="Itinéraire Google Maps"
              variant="primary"
              icon="navigation"
              onPress={() => {
                if (typeof window !== 'undefined') window.open(buildMapsDirectionsLink(), '_blank');
              }}
            />
          </View>
        </View>

        <View style={[styles.mapWrap, isDesktop && { flex: 1 }]}>
          {Platform.OS === 'web' ? (
            // @ts-ignore — élément web natif, ignoré côté iOS/Android
            <iframe
              src={buildMapsEmbedSrc()}
              style={{ width: '100%', height: '100%', border: 0, borderRadius: 18 }}
              loading="lazy"
              title="Localisation Les Délices d'Afrique sur Google Maps"
            />
          ) : (
            <PlaceholderImage label="Carte Google Maps" icon="map" ratio={1.2} />
          )}
        </View>
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  row: { gap: spacing.md },
  rowDesktop: { flexDirection: 'row', alignItems: 'stretch' },
  card: {
    backgroundColor: colors.charcoalSoft,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderDark,
  },
  hoursHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  hoursTitle: { fontFamily: fonts.display, fontSize: 18, color: colors.textOnDark },
  hoursRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  hoursDay: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.textOnDarkMuted },
  hoursTime: { fontFamily: fonts.bodyBold, fontSize: 16, color: colors.gold },
  hoursNote: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textOnDarkMuted, marginTop: 4 },
  divider: { height: 1, backgroundColor: colors.borderDark, marginVertical: spacing.md },
  address: { fontFamily: fonts.bodyMedium, fontSize: 14.5, color: colors.textOnDark },
  addressNote: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textOnDarkMuted, marginTop: 2 },
  mapWrap: {
    minHeight: 260,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
});
