import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, fonts, radii, spacing } from '@/constants/theme';
import { buildWhatsAppLink } from '@/utils/contact';
import { Button } from '@/components/ui/Button';

/**
 * Formulaire de contact simplifié : compose un message WhatsApp
 * pré-rempli plutôt que d'envoyer à un backend. Évite d'avoir besoin
 * d'un serveur mail pour la V1 tout en restant orienté conversion —
 * le message arrive directement dans la messagerie de l'équipe.
 */
export function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState(false);

  const isValid = name.trim().length > 1 && message.trim().length > 3;

  const handleSend = () => {
    setTouched(true);
    if (!isValid) return;
    const fullMessage = `Bonjour, je m'appelle ${name}${
      phone ? ` (tél : ${phone})` : ''
    }.\n\n${message}`;
    if (typeof window !== 'undefined') {
      window.open(buildWhatsAppLink(fullMessage), '_blank');
    }
  };

  return (
    <View style={styles.wrap}>
      <Field label="Votre nom" value={name} onChangeText={setName} placeholder="Ex : Aïcha Mballa" />
      <Field
        label="Téléphone (optionnel)"
        value={phone}
        onChangeText={setPhone}
        placeholder="Ex : 6XX XXX XXX"
        keyboardType="phone-pad"
      />
      <Field
        label="Votre message"
        value={message}
        onChangeText={setMessage}
        placeholder="Réservation, question sur un plat, devis traiteur..."
        multiline
      />
      {touched && !isValid && (
        <Text style={styles.error}>Merci de renseigner votre nom et un message.</Text>
      )}
      <Button label="Envoyer sur WhatsApp" variant="whatsapp" icon="send" onPress={handleSend} fullWidth />
      <Text style={styles.hint}>
        Votre message s'ouvrira directement dans WhatsApp, prêt à être envoyé à notre équipe.
      </Text>
    </View>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'phone-pad';
}

function Field({ label, value, onChangeText, placeholder, multiline, keyboardType }: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        multiline={multiline}
        keyboardType={keyboardType}
        style={[styles.input, multiline && styles.inputMultiline]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.sm },
  field: { gap: 6 },
  label: { fontFamily: fonts.bodySemiBold, fontSize: 13, color: colors.textPrimary },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: fonts.body,
    fontSize: 14.5,
    color: colors.textPrimary,
    backgroundColor: colors.white,
  },
  inputMultiline: { minHeight: 110, textAlignVertical: 'top' },
  error: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.terracotta },
  hint: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
  },
});
