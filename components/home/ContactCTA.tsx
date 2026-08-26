import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { colors, fonts, spacing } from '@/constants/theme';
import { useResponsive } from '@/utils/useResponsive';
import { restaurant } from '@/data/restaurant';
import { buildTelLink, buildWhatsAppLink, whatsappOrderMessage } from '@/utils/contact';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { PatternDivider } from '@/components/ui/PatternDivider';

export function ContactCTA() {
  const { isTablet } = useResponsive();

  return (
    <Section tone="cream">
      <View style={styles.wrap}>
        <Text style={styles.title}>Envie de découvrir {restaurant.name} ?</Text>
        <PatternDivider />
        <Text style={styles.subtitle}>
          Réservez une table, commandez à emporter ou demandez un devis traiteur — notre équipe vous
          répond rapidement.
        </Text>
        <View style={[styles.ctaRow, !isTablet && styles.ctaRowMobile]}>
          <Button
            label="Appeler maintenant"
            variant="primary"
            size="lg"
            icon="phone-call"
            fullWidth={!isTablet}
            onPress={() => {
              if (typeof window !== 'undefined') window.location.href = buildTelLink();
            }}
          />
          <Button
            label="Écrire sur WhatsApp"
            variant="whatsapp"
            size="lg"
            icon="message-circle"
            fullWidth={!isTablet}
            onPress={() => {
              if (typeof window !== 'undefined')
                window.open(buildWhatsAppLink(whatsappOrderMessage()), '_blank');
            }}
          />
          <Button
            label="Voir le contact"
            variant="secondary"
            size="lg"
            fullWidth={!isTablet}
            onPress={() => router.push('/contact')}
          />
        </View>
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  title: {
    fontFamily: fonts.display,
    fontSize: 28,
    color: colors.textPrimary,
    textAlign: 'center',
    maxWidth: 520,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 15.5,
    lineHeight: 24,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 460,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  ctaRow: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap', justifyContent: 'center' },
  ctaRowMobile: { flexDirection: 'column', width: '100%' },
});
