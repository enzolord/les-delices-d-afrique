import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, fonts, spacing } from '@/constants/theme';
import { services } from '@/data/services';

/**
 * Pré-rend une page statique dédiée pour chaque service au moment du build
 * (`/services/sur-place.html`, `/services/livraison.html`, etc.) — sans
 * cela, seul un gabarit générique `/services/[id].html` serait généré, qui
 * nécessite une règle de réécriture d'URL côté hébergeur pour fonctionner
 * en accès direct. Avec `generateStaticParams`, chaque URL est une vraie
 * page HTML, indexable individuellement, sur n'importe quel hébergement
 * statique basique.
 */
export function generateStaticParams() {
  return services.map((s) => ({ id: s.id }));
}
import { PageShell } from '@/components/layout/PageShell';
import { PageHead } from '@/components/seo/PageHead';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { PatternDivider } from '@/components/ui/PatternDivider';
import { Button } from '@/components/ui/Button';
import { ServiceRequestForm } from '@/components/services/ServiceRequestForm';

export default function ServiceRequestScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <PageShell>
        <Section tone="white">
          <View style={styles.notFound}>
            <Text style={styles.notFoundTitle}>Service introuvable</Text>
            <Button
              label="Voir tous nos services"
              variant="primary"
              icon="arrow-left"
              iconPosition="left"
              onPress={() => router.push('/services')}
            />
          </View>
        </Section>
      </PageShell>
    );
  }

  const seo = {
    path: `/services/${service.id}`,
    title: `${service.title} — Demande | Les Délices d'Afrique`,
    description: `Faites votre demande pour "${service.title}" auprès du restaurant Les Délices d'Afrique à Akwa, Douala. Réponse rapide par WhatsApp.`,
    keywords: [service.title, 'Douala', 'Akwa', 'traiteur', 'restaurant'],
  };

  return (
    <PageShell>
      <PageHead seo={seo} />

      <View style={styles.banner}>
        <Container style={styles.bannerInner}>
          <Button
            label="Retour aux services"
            variant="ghost"
            icon="arrow-left"
            iconPosition="left"
            style={styles.backBtn}
            onPress={() => router.push('/services')}
          />
          <Text style={styles.bannerEyebrow}>DEMANDE DE SERVICE</Text>
          <Text style={styles.bannerTitle}>{service.title}</Text>
          <PatternDivider />
          <Text style={styles.bannerSubtitle}>{service.description}</Text>
        </Container>
      </View>

      <Section tone="cream">
        <View style={styles.formCard}>
          <View style={styles.formHeader}>
            <Feather name="edit-3" size={18} color={colors.gold} />
            <Text style={styles.formTitle}>Complétez votre demande</Text>
          </View>
          <ServiceRequestForm service={service} />
        </View>
      </Section>
    </PageShell>
  );
}

const styles = StyleSheet.create({
  banner: { backgroundColor: colors.charcoal, paddingVertical: spacing.xl },
  bannerInner: { alignItems: 'center' },
  backBtn: { alignSelf: 'flex-start', marginBottom: spacing.sm },
  bannerEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    letterSpacing: 2.2,
    color: colors.gold,
    marginBottom: 8,
  },
  bannerTitle: {
    fontFamily: fonts.display,
    fontSize: 28,
    color: colors.textOnDark,
    textAlign: 'center',
  },
  bannerSubtitle: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textOnDarkMuted,
    marginTop: 8,
    textAlign: 'center',
    maxWidth: 480,
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    maxWidth: 560,
    width: '100%',
    alignSelf: 'center',
  },
  formHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.md },
  formTitle: { fontFamily: fonts.display, fontSize: 19, color: colors.textPrimary },
  notFound: { alignItems: 'center', gap: spacing.md, paddingVertical: spacing.xl },
  notFoundTitle: { fontFamily: fonts.display, fontSize: 22, color: colors.textPrimary },
});
