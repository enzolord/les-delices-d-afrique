import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { restaurant } from '@/data/restaurant';
import { PageShell } from '@/components/layout/PageShell';
import { PageHead } from '@/components/seo/PageHead';
import { routesSeo } from '@/data/seo';
import { Section } from '@/components/ui/Section';

export default function MentionsLegalesScreen() {
  return (
    <PageShell>
      <PageHead seo={routesSeo.legal} />
      <Section tone="white">
        <Text style={styles.title}>Mentions légales</Text>
        <Text style={styles.updated}>Dernière mise à jour : à compléter</Text>

        <Text style={styles.h2}>Éditeur du site</Text>
        <Text style={styles.p}>
          Le présent site est édité par {restaurant.name}, restaurant situé à {restaurant.addressLine}.
        </Text>
        <Text style={styles.placeholder}>
          ⚠️ À compléter par le client : raison sociale exacte, forme juridique, numéro de registre
          de commerce (RCCM), numéro de contribuable (NIU), adresse complète du siège.
        </Text>

        <Text style={styles.h2}>Directeur de la publication</Text>
        <Text style={styles.placeholder}>⚠️ À compléter par le client : nom du responsable légal.</Text>

        <Text style={styles.h2}>Hébergement</Text>
        <Text style={styles.placeholder}>
          ⚠️ À compléter une fois l'hébergeur du site choisi (nom, adresse, contact).
        </Text>

        <Text style={styles.h2}>Conception & développement</Text>
        <Text style={styles.p}>Site conçu et développé par KN WEB & TECHNOLOGY.</Text>

        <Text style={styles.h2}>Contact</Text>
        <Text style={styles.p}>{restaurant.email}</Text>
        <Text style={styles.p}>{restaurant.phoneDisplay}</Text>

        <Text style={styles.h2}>Propriété intellectuelle</Text>
        <Text style={styles.p}>
          L'ensemble des contenus présents sur ce site (textes, photographies, logo, charte
          graphique) est la propriété de {restaurant.name}, sauf mention contraire, et ne peut être
          reproduit sans autorisation préalable.
        </Text>
      </Section>
    </PageShell>
  );
}

const styles = StyleSheet.create({
  title: { fontFamily: fonts.display, fontSize: 30, color: colors.textPrimary, marginBottom: 4 },
  updated: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textMuted, marginBottom: spacing.lg },
  h2: {
    fontFamily: fonts.display,
    fontSize: 18,
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: 6,
  },
  p: { fontFamily: fonts.body, fontSize: 14.5, lineHeight: 23, color: colors.textMuted },
  placeholder: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13.5,
    lineHeight: 21,
    color: colors.terracotta,
    marginTop: 2,
  },
});
