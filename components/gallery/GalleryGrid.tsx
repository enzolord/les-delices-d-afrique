import React, { useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import { colors, fonts, radii, spacing } from '@/constants/theme';
import { useResponsive } from '@/utils/useResponsive';
import { GalleryItem, galleryTags, GalleryTag } from '@/data/gallery';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { galleryImageUri } from '@/utils/images';

interface GalleryGridProps {
  items: GalleryItem[];
  showFilters?: boolean;
  limit?: number;
}

export function GalleryGrid({ items, showFilters, limit }: GalleryGridProps) {
  const { isTablet, isDesktop } = useResponsive();
  const [active, setActive] = useState<GalleryTag | 'tous'>('tous');

  const filtered = useMemo(() => {
    const base = active === 'tous' ? items : items.filter((i) => i.tag === active);
    return limit ? base.slice(0, limit) : base;
  }, [items, active, limit]);

  const columns = isDesktop ? 3 : isTablet ? 2 : 2;

  return (
    <View>
      {showFilters && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {galleryTags.map((tag) => {
            const isActive = active === tag.id;
            return (
              <Pressable
                key={tag.id}
                onPress={() => setActive(tag.id)}
                style={[styles.pill, isActive && styles.pillActive]}
              >
                <Text style={[styles.pillText, isActive && styles.pillTextActive]}>{tag.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      )}
      <View style={styles.grid}>
        {filtered.map((item) => (
          <View key={item.id} style={{ width: `${100 / columns}%`, padding: 6 }}>
            <PlaceholderImage label={item.label} icon="camera" ratio={1} uri={galleryImageUri(item.id)} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterRow: { marginBottom: spacing.md },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  pillActive: { backgroundColor: colors.charcoal, borderColor: colors.charcoal },
  pillText: { fontFamily: fonts.bodySemiBold, fontSize: 13, color: colors.textPrimary },
  pillTextActive: { color: colors.gold },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
});
