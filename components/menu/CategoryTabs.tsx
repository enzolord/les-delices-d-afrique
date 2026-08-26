import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { colors, fonts, radii, spacing } from '@/constants/theme';
import { MenuCategoryId, categories } from '@/data/menu';

interface CategoryTabsProps {
  active: MenuCategoryId | 'tous';
  onChange: (id: MenuCategoryId | 'tous') => void;
}

export function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <View style={styles.wrap}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        <Tab label="Tous" isActive={active === 'tous'} onPress={() => onChange('tous')} />
        {categories.map((cat) => (
          <Tab
            key={cat.id}
            label={cat.shortLabel}
            isActive={active === cat.id}
            onPress={() => onChange(cat.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function Tab({ label, isActive, onPress }: { label: string; isActive: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.pill, isActive && styles.pillActive]}>
      <Text style={[styles.pillText, isActive && styles.pillTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.cream,
    // @ts-ignore sticky under header on web
    position: 'sticky' as any,
    top: 65,
    zIndex: 20,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  row: { paddingHorizontal: 2, gap: 8 },
  pill: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pillActive: { backgroundColor: colors.charcoal, borderColor: colors.charcoal },
  pillText: { fontFamily: fonts.bodySemiBold, fontSize: 13.5, color: colors.textPrimary },
  pillTextActive: { color: colors.gold },
});
