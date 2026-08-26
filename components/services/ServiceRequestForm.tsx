import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, fonts, radii, spacing } from '@/constants/theme';
import { Service } from '@/data/services';
import { buildWhatsAppLink } from '@/utils/contact';
import { Button } from '@/components/ui/Button';

interface ServiceRequestFormProps {
  service: Service;
}

const EVENT_SERVICE_IDS = ['mariages', 'anniversaires', 'baptemes', 'sur-place'];

/**
 * Formulaire de demande envoyé par WhatsApp — pas de backend nécessaire.
 * Les champs affichés s'adaptent au service concerné :
 *  - "livraison"                          → adresse de livraison (obligatoire)
 *  - mariages / anniversaires / baptêmes / sur-place → date souhaitée + nombre de personnes
 */
export function ServiceRequestForm({ service }: ServiceRequestFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState(false);

  const isDelivery = service.id === 'livraison';
  const isEventLike = EVENT_SERVICE_IDS.includes(service.id);

  const isValid =
    name.trim().length > 1 &&
    phone.trim().length > 5 &&
    (!isDelivery || address.trim().length > 3);

  const handleSend = () => {
    setTouched(true);
    if (!isValid) return;

    const parts = [
      `Bonjour Les Délices d'Afrique 👋, je souhaite faire une demande pour : ${service.title}.`,
      '',
      `Nom : ${name}`,
      `Téléphone : ${phone}`,
    ];

    if (isEventLike && date.trim()) parts.push(`Date souhaitée : ${date}`);
    if (isEventLike && guests.trim()) parts.push(`Nombre de personnes : ${guests}`);
    if (isDelivery) parts.push(`Adresse de livraison : ${address}`);
    if (message.trim()) parts.push('', `Détails : ${message}`);

    parts.push('', 'Merci de me confirmer la disponibilité.');

    if (typeof window !== 'undefined') {
      window.open(buildWhatsAppLink(parts.join('\n')), '_blank');
    }
  };

  return (
    <View style={styles.wrap}>
      <Field label="Votre nom *" value={name} onChangeText={setName} placeholder="Ex : Aïcha Mballa" />
      <Field
        label="Téléphone *"
        value={phone}
        onChangeText={setPhone}
        placeholder="Ex : 6XX XXX XXX"
        keyboardType="phone-pad"
      />

      {isEventLike && (
        <>
          <Field
            label="Date souhaitée (optionnel)"
            value={date}
            onChangeText={setDate}
            placeholder="Ex : 12/10/2026"
          />
          <Field
            label="Nombre de personnes (optionnel)"
            value={guests}
            onChangeText={setGuests}
            placeholder="Ex : 50 invités"
            keyboardType="number-pad"
          />
        </>
      )}

      {isDelivery && (
        <Field
          label="Adresse de livraison *"
          value={address}
          onChangeText={setAddress}
          placeholder="Quartier, repère, rue... (ex : Akwa, non loin de la pharmacie X)"
          multiline
        />
      )}

      <Field
        label="Détails de votre demande"
        value={message}
        onChangeText={setMessage}
        placeholder="Précisez vos besoins, vos préférences, votre budget..."
        multiline
      />

      {touched && !isValid && (
        <Text style={styles.error}>
          Merci de renseigner votre nom, votre téléphone{isDelivery ? ' et l\u2019adresse de livraison' : ''}.
        </Text>
      )}

      <Button
        label="Envoyer la demande sur WhatsApp"
        variant="whatsapp"
        size="lg"
        icon="send"
        onPress={handleSend}
        fullWidth
      />
      <Text style={styles.hint}>
        Votre demande s'ouvrira directement dans WhatsApp, prête à être envoyée à notre équipe.
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
  keyboardType?: 'default' | 'phone-pad' | 'number-pad';
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
  inputMultiline: { minHeight: 90, textAlignVertical: 'top' },
  error: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.terracotta },
  hint: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
  },
});
