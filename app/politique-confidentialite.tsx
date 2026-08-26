import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { restaurant } from '@/data/restaurant';
import { PageShell } from '@/components/layout/PageShell';
import { PageHead } from '@/components/seo/PageHead';
import { routesSeo } from '@/data/seo';
import { Section } from '@/components/ui/Section';

export default function PolitiqueConfidentialiteScreen() {
  return (
    <PageShell>
      <PageHead seo={routesSeo.privacy} />
      <Section tone="white">
        <Text style={styles.title}>Politique de confidentialité</Text>
        <Text style={styles.updated}>Dernière mise à jour : à compléter</Text>

        <Text style={styles.h2}>Données collectées</Text>
        <Text style={styles.p}>
          Le site {restaurant.name} ne collecte pas de données personnelles via un formulaire relié
          à une base de données : le formulaire de contact ouvre directement une conversation
          WhatsApp, sans stockage côté serveur. Les seules informations transmises (nom, téléphone,
          message) sont celles que vous choisissez d'envoyer via WhatsApp.
        </Text>

        <Text style={styles.h2}>Cookies & mesure d'audience</Text>
        <Text style={styles.p}>
          Le site peut utiliser des outils de mesure d'audience (ex. Google Analytics) pour
          comprendre la fréquentation et améliorer l'expérience utilisateur.
        </Text>
        <Text style={styles.placeholder}>
          ⚠️ À compléter par le client : liste précise des outils de suivi/cookies effectivement
          installés une fois le site déployé, et mise en place d'un bandeau de consentement si
          nécessaire.
        </Text>

        <Text style={styles.h2}>Vos droits</Text>
        <Text style={styles.p}>
          Vous pouvez à tout moment demander la suppression d'un message envoyé via WhatsApp en nous
          contactant directement.
        </Text>

        <Text style={styles.h2}>Contact</Text>
        <Text style={styles.p}>Pour toute question relative à cette politique : {restaurant.email}</Text>
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
