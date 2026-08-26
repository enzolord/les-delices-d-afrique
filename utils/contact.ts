import { Linking, Platform } from 'react-native';
import { restaurant } from '@/data/restaurant';

/** Nettoie un numéro pour usage dans une URL (garde le +) */
function sanitizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, '');
}

export function buildTelLink(phone: string = restaurant.phoneDisplay) {
  return `tel:${sanitizePhone(phone)}`;
}

export function buildWhatsAppLink(message?: string, phone: string = restaurant.whatsappNumber) {
  const base = `https://wa.me/${sanitizePhone(phone).replace('+', '')}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function buildMapsLink(query: string = restaurant.mapsQuery) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function buildMapsDirectionsLink(query: string = restaurant.mapsQuery) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

/** URL d'iframe pour l'intégration web de Google Maps (Contact page) */
export function buildMapsEmbedSrc(query: string = restaurant.mapsQuery) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export async function openCall(phone?: string) {
  const url = buildTelLink(phone);
  const supported = await Linking.canOpenURL(url);
  if (supported || Platform.OS === 'web') {
    Linking.openURL(url).catch(() => {});
  }
}

export async function openWhatsApp(message?: string, phone?: string) {
  const url = buildWhatsAppLink(message, phone);
  Linking.openURL(url).catch(() => {});
}

export async function openDirections(query?: string) {
  const url = buildMapsDirectionsLink(query);
  Linking.openURL(url).catch(() => {});
}

/** Message WhatsApp pré-rempli pour une demande de menu / réservation */
export function whatsappOrderMessage(dishName?: string) {
  if (dishName) {
    return `Bonjour Les Délices d'Afrique 👋, je souhaite commander : ${dishName}. Pouvez-vous me confirmer la disponibilité et le délai ?`;
  }
  return `Bonjour Les Délices d'Afrique 👋, je souhaite passer une commande / réserver une table.`;
}

export function whatsappTraiteurMessage(serviceName?: string) {
  return `Bonjour, je souhaite un devis traiteur pour : ${serviceName ?? 'un événement'}. Pouvez-vous me renseigner sur vos formules ?`;
}
