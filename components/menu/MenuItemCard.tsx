import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, radii, shadow, spacing } from '@/constants/theme';
import { MenuItem, formatPriceFCFA } from '@/data/menu';
import { menuImageUri } from '@/utils/images';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';

interface MenuItemCardProps {
  item: MenuItem;
  compact?: boolean;
}

export function MenuItemCard({ item, compact }: MenuItemCardProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const priceLabel = item.price
    ? formatPriceFCFA(item.price)
    : item.priceOptions
    ? item.priceOptions.map((p) => formatPriceFCFA(p.price)).join(' / ')
    : undefined;

  const flashAdded = (key: string) => {
    setJustAdded(key);
    setTimeout(() => setJustAdded((cur) => (cur === key ? null : cur)), 1200);
  };

  const handleAddSingle = () => {
    if (!item.price) return;
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      noteHint: item.choiceOf?.join(' / '),
    });
    flashAdded(item.id);
  };

  const handleAddOption = (label: string, price: number) => {
    const cartId = `${item.id}::${label}`;
    addItem({ id: cartId, name: `${item.name} (${label})`, price });
    flashAdded(cartId);
  };

  return (
    <View style={[styles.card, compact && styles.cardCompact]}>
      <PlaceholderImage label={item.name} icon="camera" ratio={1.5} compact rounded uri={menuImageUri(item.id)} />
      <View style={styles.body}>
        <View style={styles.badgeRow}>
          {item.badges?.map((b) => (
            <Badge key={b} label={b} tone={b === 'Spécial week-end' ? 'terracotta' : 'gold'} />
          ))}
        </View>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        {item.description ? (
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        ) : null}
        {item.choiceOf ? (
          <Text style={styles.choice} numberOfLines={1}>
            Au choix : {item.choiceOf.join(', ')}
          </Text>
        ) : null}

        {!item.priceOptions && <Text style={styles.price}>{priceLabel}</Text>}

        {item.priceOptions ? (
          <View style={styles.optionsWrap}>
            {item.priceOptions.map((opt) => (
              <Button
                key={opt.label}
                label={
                  justAdded === `${item.id}::${opt.label}`
                    ? 'Ajouté ✓'
                    : `${opt.label} · ${formatPriceFCFA(opt.price)}`
                }
                variant="primary"
                size="md"
                icon={justAdded === `${item.id}::${opt.label}` ? 'check' : 'shopping-bag'}
                fullWidth
                onPress={() => handleAddOption(opt.label, opt.price)}
              />
            ))}
          </View>
        ) : (
          <Button
            label={justAdded === item.id ? 'Ajouté au panier ✓' : 'Ajouter au panier'}
            variant="primary"
            size="md"
            icon={justAdded === item.id ? 'check' : 'shopping-bag'}
            fullWidth
            style={styles.addButton}
            onPress={handleAddSingle}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 240,
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  cardCompact: { width: '100%' },
  body: { padding: spacing.sm + 2, gap: 4 },
  badgeRow: { flexDirection: 'row', gap: 6, marginBottom: 2, flexWrap: 'wrap' },
  name: {
    fontFamily: fonts.display,
    fontSize: 16.5,
    color: colors.textPrimary,
    lineHeight: 21,
  },
  description: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    color: colors.textMuted,
    lineHeight: 18,
  },
  choice: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11.5,
    color: colors.goldDeep,
  },
  price: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.textPrimary,
    marginTop: 4,
    marginBottom: 6,
  },
  addButton: { marginTop: 4 },
  optionsWrap: { gap: 6, marginTop: 6 },
});
