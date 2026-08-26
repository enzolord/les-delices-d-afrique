import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fonts, radii, spacing } from '@/constants/theme';
import { CartItem, useCart } from '@/context/CartContext';
import { formatPriceFCFA } from '@/data/menu';

export function CartLineItem({ item }: { item: CartItem }) {
  const { incrementItem, decrementItem, removeItem, updateNote } = useCart();

  return (
    <View style={styles.wrap}>
      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.unitPrice}>{formatPriceFCFA(item.price)} / unité</Text>
        </View>
        <Pressable
          onPress={() => removeItem(item.id)}
          hitSlop={8}
          accessibilityLabel={`Retirer ${item.name} du panier`}
        >
          <Feather name="trash-2" size={17} color={colors.textMuted} />
        </Pressable>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.stepper}>
          <Pressable
            onPress={() => decrementItem(item.id)}
            style={styles.stepperBtn}
            accessibilityLabel="Diminuer la quantité"
          >
            <Feather name="minus" size={15} color={colors.charcoal} />
          </Pressable>
          <Text style={styles.stepperValue}>{item.quantity}</Text>
          <Pressable
            onPress={() => incrementItem(item.id)}
            style={styles.stepperBtn}
            accessibilityLabel="Augmenter la quantité"
          >
            <Feather name="plus" size={15} color={colors.charcoal} />
          </Pressable>
        </View>
        <Text style={styles.lineTotal}>{formatPriceFCFA(item.price * item.quantity)}</Text>
      </View>

      <TextInput
        value={item.note ?? ''}
        onChangeText={(v) => updateNote(item.id, v)}
        placeholder={item.noteHint ? `Au choix : ${item.noteHint}` : 'Précision (optionnel)'}
        placeholderTextColor={colors.textMuted}
        style={styles.noteInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: spacing.sm,
    gap: 8,
  },
  topRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  name: { fontFamily: fonts.bodySemiBold, fontSize: 14.5, color: colors.textPrimary },
  unitPrice: { fontFamily: fonts.body, fontSize: 12, color: colors.textMuted, marginTop: 2 },
  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ivory,
    borderRadius: radii.pill,
    gap: 2,
  },
  stepperBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperValue: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.textPrimary,
    minWidth: 22,
    textAlign: 'center',
  },
  lineTotal: { fontFamily: fonts.bodyBold, fontSize: 14.5, color: colors.textPrimary },
  noteInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    paddingHorizontal: 10,
    paddingVertical: 7,
    fontFamily: fonts.body,
    fontSize: 12.5,
    color: colors.textPrimary,
    backgroundColor: colors.white,
  },
});
