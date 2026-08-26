import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fonts, radii } from '@/constants/theme';
import { useCart } from '@/context/CartContext';

export function CartButton() {
  const { totalItems, open } = useCart();

  return (
    <Pressable
      onPress={open}
      accessibilityRole="button"
      accessibilityLabel={`Ouvrir le panier${totalItems > 0 ? `, ${totalItems} article(s)` : ''}`}
      style={({ pressed }) => [styles.wrap, pressed && { opacity: 0.75 }]}
    >
      <Feather name="shopping-bag" size={21} color={colors.charcoal} />
      {totalItems > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalItems > 9 ? '9+' : totalItems}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 42,
    height: 42,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ivory,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 19,
    height: 19,
    borderRadius: 10,
    paddingHorizontal: 4,
    backgroundColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.cream,
  },
  badgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10.5,
    color: colors.white,
  },
});
