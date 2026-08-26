import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { categories, getItemsByCategory, MenuCategoryId, menuItems } from '@/data/menu';
import { PageShell } from '@/components/layout/PageShell';
import { PageHead } from '@/components/seo/PageHead';
import { routesSeo } from '@/data/seo';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { PatternDivider } from '@/components/ui/PatternDivider';
import { CategoryTabs } from '@/components/menu/CategoryTabs';
import { MenuSection } from '@/components/menu/MenuSection';

export default function MenuScreen() {
  const [active, setActive] = useState<MenuCategoryId | 'tous'>('tous');

  const visibleCategories = useMemo(
    () => (active === 'tous' ? categories : categories.filter((c) => c.id === active)),
    [active]
  );

  return (
    <PageShell>
      <PageHead seo={routesSeo.menu} />

      <View style={styles.banner}>
        <Container style={styles.bannerInner}>
          <Text style={styles.bannerEyebrow}>NOTRE MENU</Text>
          <Text style={styles.bannerTitle}>Une cuisine généreuse, à chaque prix</Text>
          <PatternDivider />
          <Text style={styles.bannerSubtitle}>
            {menuItems.length} plats et boissons, du riz sénégalais au kossam maison.
          </Text>
        </Container>
      </View>

      <CategoryTabs active={active} onChange={setActive} />

      <Section tone="cream">
        {visibleCategories.map((cat) => (
          <MenuSection key={cat.id} category={cat} items={getItemsByCategory(cat.id)} />
        ))}
      </Section>
    </PageShell>
  );
}

const styles = StyleSheet.create({
  banner: { backgroundColor: colors.charcoal, paddingVertical: spacing.xl },
  bannerInner: { alignItems: 'center' },
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
    maxWidth: 520,
  },
  bannerSubtitle: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textOnDarkMuted,
    marginTop: 6,
  },
});
