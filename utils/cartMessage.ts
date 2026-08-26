import { CartItem, ReceptionMode } from '@/context/CartContext';
import { formatPriceFCFA } from '@/data/menu';

export interface CheckoutInfo {
  name: string;
  phone: string;
  receptionMode: ReceptionMode;
  address?: string;
  note?: string;
}

const RECEPTION_LABEL: Record<ReceptionMode, string> = {
  'sur-place': 'Sur place',
  emporter: 'À emporter',
  livraison: 'Livraison',
};

/**
 * Construit le message WhatsApp final envoyé pour une commande panier.
 * Le lieu de livraison apparaît directement dans le message dès que le
 * mode de réception "Livraison" est choisi.
 */
export function buildOrderMessage(items: CartItem[], totalPrice: number, checkout: CheckoutInfo) {
  const lines = items.map((item) => {
    const base = `• ${item.quantity}x ${item.name} — ${formatPriceFCFA(item.price * item.quantity)}`;
    return item.note ? `${base}\n   (précision : ${item.note})` : base;
  });

  const parts = [
    `Bonjour Les Délices d'Afrique 👋, je souhaite passer la commande suivante :`,
    '',
    ...lines,
    '',
    `Total : ${formatPriceFCFA(totalPrice)}`,
    '',
    `Mode de réception : ${RECEPTION_LABEL[checkout.receptionMode]}`,
  ];

  if (checkout.receptionMode === 'livraison' && checkout.address) {
    parts.push(`Adresse de livraison : ${checkout.address}`);
  }

  parts.push(`Nom : ${checkout.name}`, `Téléphone : ${checkout.phone}`);

  if (checkout.note) {
    parts.push('', `Précisions : ${checkout.note}`);
  }

  parts.push('', 'Merci de me confirmer la disponibilité et le délai.');

  return parts.join('\n');
}
