import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { useResponsive } from '@/utils/useResponsive';
import { MenuCategory, MenuItem } from '@/data/menu';
import { MenuItemCard } from './MenuItemCard';

interface MenuSectionProps {
  category: MenuCategory;
  items: MenuItem[];
}

export function MenuSection({ category, items }: MenuSectionProps) {
  const { isTablet, isDesktop } = useResponsive();
  const columns = isDesktop ? 3 : isTablet ? 2 : 1;

  if (items.length === 0) return null;

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{category.label}</Text>
      <Text style={styles.description}>{category.description}</Text>
      <View style={styles.grid}>
        {items.map((item) => (
          <View key={item.id} style={{ width: `${100 / columns}%`, padding: 6 }}>
            <MenuItemCard item={item} compact />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.xl },
  title: {
    fontFamily: fonts.display,
    fontSize: 24,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  description: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    maxWidth: 560,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
});
