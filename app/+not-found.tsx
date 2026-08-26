import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { colors, fonts, spacing } from '@/constants/theme';
import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/Button';

export default function NotFoundScreen() {
  return (
    <PageShell>
      <View style={styles.wrap}>
        <Text style={styles.code}>404</Text>
        <Text style={styles.title}>Cette page n'existe pas</Text>
        <Text style={styles.subtitle}>
          Le lien que vous avez suivi est peut-être incorrect, ou la page a été déplacée.
        </Text>
        <Link href="/" asChild>
          <Button label="Retour à l'accueil" variant="primary" icon="arrow-left" iconPosition="left" />
        </Link>
      </View>
    </PageShell>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: spacing.xxxl, paddingHorizontal: spacing.md },
  code: { fontFamily: fonts.display, fontSize: 64, color: colors.gold },
  title: { fontFamily: fonts.display, fontSize: 24, color: colors.textPrimary, marginTop: 4 },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 14.5,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: spacing.lg,
    maxWidth: 360,
  },
});
