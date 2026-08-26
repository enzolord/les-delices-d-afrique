import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, fonts, radii, spacing } from '@/constants/theme';
import { useCart, ReceptionMode } from '@/context/CartContext';
import { formatPriceFCFA } from '@/data/menu';
import { buildWhatsAppLink } from '@/utils/contact';
import { buildOrderMessage } from '@/utils/cartMessage';
import { Button } from '@/components/ui/Button';
import { CartLineItem } from './CartLineItem';

const RECEPTION_OPTIONS: { id: ReceptionMode; label: string; icon: keyof typeof Feather.glyphMap }[] = [
  { id: 'sur-place', label: 'Sur place', icon: 'coffee' },
  { id: 'emporter', label: 'À emporter', icon: 'shopping-bag' },
  { id: 'livraison', label: 'Livraison', icon: 'truck' },
];

export function CartModal() {
  const { items, totalItems, totalPrice, isOpen, close, clear } = useCart();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [receptionMode, setReceptionMode] = useState<ReceptionMode>('sur-place');
  const [touched, setTouched] = useState(false);

  const needsAddress = receptionMode === 'livraison';
  const isValid =
    items.length > 0 &&
    name.trim().length > 1 &&
    phone.trim().length > 5 &&
    (!needsAddress || address.trim().length > 3);

  const handleSend = () => {
    setTouched(true);
    if (!isValid) return;
    const message = buildOrderMessage(items, totalPrice, {
      name,
      phone,
      receptionMode,
      address: needsAddress ? address : undefined,
      note: note.trim() || undefined,
    });
    if (typeof window !== 'undefined') {
      window.open(buildWhatsAppLink(message), '_blank');
    }
    clear();
    setName('');
    setPhone('');
    setAddress('');
    setNote('');
    setReceptionMode('sur-place');
    setTouched(false);
    close();
  };

  return (
    <Modal visible={isOpen} animationType="slide" transparent onRequestClose={close}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Votre panier {totalItems > 0 ? `(${totalItems})` : ''}</Text>
            <Pressable onPress={close} accessibilityLabel="Fermer le panier" hitSlop={10}>
              <Feather name="x" size={24} color={colors.charcoal} />
            </Pressable>
          </View>

          {items.length === 0 ? (
            <View style={styles.emptyWrap}>
              <Feather name="shopping-bag" size={32} color={colors.border} />
              <Text style={styles.emptyText}>Votre panier est vide.</Text>
              <Button
                label="Voir le menu"
                variant="primary"
                icon="arrow-right"
                onPress={() => {
                  close();
                  router.push('/menu');
                }}
              />
            </View>
          ) : (
            <>
              {/* Zone défilable : uniquement le contenu, PAS le bouton d'envoi
                  (voir footer plus bas) — sinon, avec plusieurs plats et tous
                  les champs du formulaire, le bouton finit hors champ tant
                  qu'on n'a pas fait défiler jusqu'en bas. */}
              <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {items.map((item) => (
                  <CartLineItem key={item.id} item={item} />
                ))}

                <Text style={styles.totalRow}>Total : {formatPriceFCFA(totalPrice)}</Text>

                <Text style={styles.sectionTitle}>Mode de réception</Text>
                <View style={styles.receptionRow}>
                  {RECEPTION_OPTIONS.map((opt) => {
                    const active = receptionMode === opt.id;
                    return (
                      <Pressable
                        key={opt.id}
                        onPress={() => setReceptionMode(opt.id)}
                        style={[styles.receptionPill, active && styles.receptionPillActive]}
                      >
                        <Feather name={opt.icon} size={14} color={active ? colors.charcoal : colors.textMuted} />
                        <Text style={[styles.receptionLabel, active && styles.receptionLabelActive]}>
                          {opt.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                {needsAddress && (
                  <View style={styles.field}>
                    <Text style={styles.label}>Adresse de livraison *</Text>
                    <TextInput
                      value={address}
                      onChangeText={setAddress}
                      placeholder="Quartier, repère, rue... (ex : Akwa, non loin de la pharmacie X)"
                      placeholderTextColor={colors.textMuted}
                      style={styles.input}
                      multiline
                    />
                    {touched && needsAddress && address.trim().length <= 3 && (
                      <Text style={styles.error}>Merci d'indiquer une adresse de livraison.</Text>
                    )}
                  </View>
                )}

                <View style={styles.field}>
                  <Text style={styles.label}>Votre nom *</Text>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Ex : Aïcha Mballa"
                    placeholderTextColor={colors.textMuted}
                    style={styles.input}
                  />
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>Téléphone *</Text>
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Ex : 6XX XXX XXX"
                    placeholderTextColor={colors.textMuted}
                    keyboardType="phone-pad"
                    style={styles.input}
                  />
                </View>

                <View style={[styles.field, { marginBottom: spacing.md }]}>
                  <Text style={styles.label}>Précisions (optionnel)</Text>
                  <TextInput
                    value={note}
                    onChangeText={setNote}
                    placeholder="Allergies, heure souhaitée..."
                    placeholderTextColor={colors.textMuted}
                    style={[styles.input, styles.inputMultiline]}
                    multiline
                  />
                </View>
              </ScrollView>

              {/* Pied fixe, toujours visible : bouton d'envoi + éventuelle
                  erreur de validation, quel que soit le défilement au-dessus.
                  paddingBottom inclut la zone de sécurité (encoche/barre de
                  gestes) pour ne jamais coller le bouton au bord de l'écran. */}
              <View style={[styles.footer, { paddingBottom: spacing.md + insets.bottom }]}>
                {touched && !isValid && (
                  <Text style={styles.error}>Merci de compléter les champs obligatoires (*).</Text>
                )}
                <Button
                  label="Envoyer la commande sur WhatsApp"
                  variant="whatsapp"
                  size="lg"
                  icon="message-circle"
                  fullWidth
                  onPress={handleSend}
                />
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.cream,
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    height: '78%',
    maxHeight: '78%',
    marginBottom: spacing.xxxl,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    // @ts-ignore web: center + cap width for a nicer desktop look
    maxWidth: 480,
    // @ts-ignore
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: { fontFamily: fonts.display, fontSize: 20, color: colors.textPrimary },
  scroll: { flex: 1 },
  emptyWrap: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xl },
  emptyText: { fontFamily: fonts.bodyMedium, fontSize: 14.5, color: colors.textMuted },
  totalRow: {
    fontFamily: fonts.bodyBold,
    fontSize: 17,
    color: colors.textPrimary,
    textAlign: 'right',
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  receptionRow: { flexDirection: 'row', gap: 8, marginBottom: spacing.md },
  receptionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  receptionPillActive: { backgroundColor: colors.gold, borderColor: colors.gold },
  receptionLabel: { fontFamily: fonts.bodySemiBold, fontSize: 12.5, color: colors.textMuted },
  receptionLabelActive: { color: colors.charcoal },
  field: { marginBottom: spacing.sm },
  label: { fontFamily: fonts.bodySemiBold, fontSize: 12.5, color: colors.textPrimary, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textPrimary,
    backgroundColor: colors.white,
  },
  inputMultiline: { minHeight: 70, textAlignVertical: 'top' },
  error: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.terracotta, marginBottom: spacing.sm },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.cream,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
});